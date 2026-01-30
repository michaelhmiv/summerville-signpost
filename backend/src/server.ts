import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Spots data
const spots = [
  // Historic Downtown (12 spots)
  { id: 1, name: "Mason's Rooftop Bar", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Upscale rooftop with craft cocktails and small plates", latitude: 33.0185, longitude: -80.1760 },
  { id: 2, name: "The Ice House", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Historic building turned modern eatery with local brews", latitude: 33.0184, longitude: -80.1761 },
  { id: 3, name: "843 Prime", address: "101 S Main St", neighborhood: "Historic Downtown", cuisine: "Steakhouse", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Premium steaks and seafood in elegant setting", latitude: 33.0180, longitude: -80.1755 },
  { id: 4, name: "The Library Restaurant", address: "101 S Main St", neighborhood: "Historic Downtown", cuisine: "Southern", happy_hour_days: "Tue-Sat", happy_hour_time: "4-6:30pm", description: "Refined Southern cuisine in library-themed space", latitude: 33.0181, longitude: -80.1756 },
  { id: 5, name: "Montreux Bar & Grill", address: "102 S Main St", neighborhood: "Historic Downtown", cuisine: "Bar & Grill", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Casual spot with burgers, beers, and live music", latitude: 33.0179, longitude: -80.1758 },
  { id: 6, name: "EVO Pizzeria", address: "106 S Main St", neighborhood: "Historic Downtown", cuisine: "Pizza", happy_hour_days: "Daily", happy_hour_time: "3-6pm", description: "Wood-fired pizzas with local ingredients", latitude: 33.0182, longitude: -80.1757 },
  { id: 7, name: "Blue Dahlia Bistro", address: "219 N Cedar St", neighborhood: "Historic Downtown", cuisine: "French", happy_hour_days: "Tue-Sat", happy_hour_time: "3-6pm", description: "Charming French bistro with wine specials", latitude: 33.0200, longitude: -80.1745 },
  { id: 8, name: "Salty Dog Cafe", address: "101 E 3rd N St", neighborhood: "Historic Downtown", cuisine: "Seafood", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Coastal vibes with fresh seafood and cocktails", latitude: 33.0195, longitude: -80.1740 },
  { id: 9, name: "Manny's Pub", address: "106 E 3rd N St", neighborhood: "Historic Downtown", cuisine: "Pub Food", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Local pub with craft beer selection", latitude: 33.0194, longitude: -80.1742 },
  { id: 10, name: "One Hot Mama's", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "BBQ", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Award-winning BBQ with Southern sides", latitude: 33.0183, longitude: -80.1759 },
  { id: 11, name: "Cutty's Seafood & More", address: "109 N Cedar St", neighborhood: "Historic Downtown", cuisine: "Seafood", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Fresh local seafood and Lowcountry favorites", latitude: 33.0198, longitude: -80.1748 },
  { id: 12, name: "Trios Italian Cafe", address: "118 S Main St", neighborhood: "Historic Downtown", cuisine: "Italian", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Family-owned Italian with handmade pasta", latitude: 33.0186, longitude: -80.1762 },
  
  // Main Street/Old Trolley (4 spots)
  { id: 13, name: "Sweetwater Grille & Bar", address: "1001 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3:30-6:30pm", description: "Neighborhood grill with extensive drink menu", latitude: 33.0350, longitude: -80.1600 },
  { id: 14, name: "Southern Hops & Brewing", address: "1001-B Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Brewery", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Local craft brewery with rotating taps", latitude: 33.0352, longitude: -80.1598 },
  { id: 15, name: "Sesame Burgers & Beer", address: "1004 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Burgers", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Gourmet burgers with craft beer pairings", latitude: 33.0355, longitude: -80.1605 },
  { id: 16, name: "Prohibition", address: "1008 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Cocktails", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Speakeasy-style bar with craft cocktails", latitude: 33.0358, longitude: -80.1610 },
  
  // Nexton (2 spots)
  { id: 17, name: "Oak Steakhouse", address: "1001 Nexton Pkwy", neighborhood: "Nexton", cuisine: "Steakhouse", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Upscale steakhouse in modern development", latitude: 33.0550, longitude: -80.1300 },
  { id: 18, name: "Wild Wing Cafe", address: "1400 Nexton Pkwy", neighborhood: "Nexton", cuisine: "Wings", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Wings, beer, and live music venue", latitude: 33.0560, longitude: -80.1280 },
  
  // North Main (2 spots)
  { id: 19, name: "Mellow Mushroom", address: "1400 N Main St", neighborhood: "North Main", cuisine: "Pizza", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Funky pizza joint with craft beer", latitude: 33.0450, longitude: -80.1700 },
  { id: 20, name: "Azul Mexican Kitchen", address: "1181 N Main St", neighborhood: "North Main", cuisine: "Mexican", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Fresh Mexican with margarita specials", latitude: 33.0420, longitude: -80.1720 },
];

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all spots
app.get('/api/spots', (_req: Request, res: Response) => {
  res.json(spots);
});

// Get spots by neighborhood
app.get('/api/spots/neighborhood/:area', (req: Request, res: Response) => {
  const area = req.params.area as string;
  const filtered = spots.filter(spot => spot.neighborhood === area);
  res.json(filtered);
});

// Get single spot by ID
app.get('/api/spots/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const spot = spots.find(s => s.id === id);
  
  if (!spot) {
    res.status(404).json({ error: 'Spot not found' });
    return;
  }
  
  res.json(spot);
});

// Get all neighborhoods
app.get('/api/neighborhoods', (_req: Request, res: Response) => {
  const neighborhoods = spots.reduce((acc, spot) => {
    const existing = acc.find(n => n.neighborhood === spot.neighborhood);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ neighborhood: spot.neighborhood, count: 1 });
    }
    return acc;
  }, [] as { neighborhood: string; count: number }[]);
  
  res.json(neighborhoods.sort((a, b) => b.count - a.count));
});

// Get all cuisine types
app.get('/api/cuisines', (_req: Request, res: Response) => {
  const cuisines = spots.reduce((acc, spot) => {
    const existing = acc.find(c => c.cuisine === spot.cuisine);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ cuisine: spot.cuisine, count: 1 });
    }
    return acc;
  }, [] as { cuisine: string; count: number }[]);
  
  res.json(cuisines.sort((a, b) => b.count - a.count));
});

// 404 handler
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
  console.log(`📊 Total spots: ${spots.length}`);
});
