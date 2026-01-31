import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { restaurants } from './data/restaurants';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all spots (restaurants)
app.get('/api/spots', (_req: Request, res: Response) => {
  res.json(restaurants);
});

// Get spots by neighborhood
app.get('/api/spots/neighborhood/:area', (req: Request, res: Response) => {
  const area = req.params.area as string;
  const filtered = restaurants.filter(r => r.neighborhood === area);
  res.json(filtered);
});

// Get single spot by ID (Google Place ID)
app.get('/api/spots/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;
  const spot = restaurants.find(r => r.id === id);

  if (!spot) {
    res.status(404).json({ error: 'Spot not found' });
    return;
  }

  res.json(spot);
});

// Get all neighborhoods with counts
app.get('/api/neighborhoods', (_req: Request, res: Response) => {
  const neighborhoodMap = new Map<string, number>();

  restaurants.forEach(r => {
    const count = neighborhoodMap.get(r.neighborhood) || 0;
    neighborhoodMap.set(r.neighborhood, count + 1);
  });

  const neighborhoods = Array.from(neighborhoodMap.entries())
    .map(([neighborhood, count]) => ({ neighborhood, count }))
    .sort((a, b) => b.count - a.count);

  res.json(neighborhoods);
});

// Get all cuisine types with counts
app.get('/api/cuisines', (_req: Request, res: Response) => {
  const cuisineMap = new Map<string, number>();

  restaurants.forEach(r => {
    r.cuisine.forEach((c: string) => {
      const count = cuisineMap.get(c) || 0;
      cuisineMap.set(c, count + 1);
    });
  });

  const cuisines = Array.from(cuisineMap.entries())
    .map(([cuisine, count]) => ({ cuisine, count }))
    .sort((a, b) => b.count - a.count);

  res.json(cuisines);
});

// Search spots
app.get('/api/search', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').toLowerCase();

  if (!query) {
    res.json(restaurants);
    return;
  }

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.cuisine.some((c: string) => c.toLowerCase().includes(query)) ||
    r.neighborhood.toLowerCase().includes(query) ||
    r.tags.some((t: string) => t.toLowerCase().includes(query))
  );

  res.json(filtered);
});

// Get spots near a location
app.get('/api/spots/nearby', (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);
  const radius = parseFloat(req.query.radius as string || '5'); // km

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).json({ error: 'Invalid coordinates' });
    return;
  }

  // Calculate distance using Haversine formula
  const toRad = (deg: number) => deg * Math.PI / 180;

  const spotsWithDistance = restaurants.map(r => {
    const dLat = toRad(r.coordinates.lat - lat);
    const dLng = toRad(r.coordinates.lng - lng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat)) * Math.cos(toRad(r.coordinates.lat)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = 6371 * c; // Earth's radius in km

    return { ...r, distance };
  });

  const nearby = spotsWithDistance
    .filter(r => r.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  res.json(nearby);
});

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  // Catch-all route for SPA - serve index.html for non-API routes
  app.use((req: Request, res: Response, next) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

// 404 handler for API routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍸 Summerville Signpost API running on port ${PORT}`);
  console.log(`📊 Total spots: ${restaurants.length}`);
});
