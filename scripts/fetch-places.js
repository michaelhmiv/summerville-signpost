#!/usr/bin/env node
/**
 * Fetch restaurants from Google Places API (New)
 * Summerville, SC area - multiple search points for better coverage
 */

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Multiple search points around Summerville for better coverage
// (API limits to 20 results per request)
const SEARCH_POINTS = [
  { name: 'Downtown', lat: 33.0185, lng: -80.1753 },
  { name: 'Nexton', lat: 33.0550, lng: -80.1300 },
  { name: 'North Main', lat: 33.0450, lng: -80.1700 },
  { name: 'Old Trolley', lat: 33.0350, lng: -80.1600 },
  { name: 'Summers Corner', lat: 33.0850, lng: -80.1500 }
];

const SEARCH_RADIUS = 5000; // 5km radius per point

async function searchPlacesAtLocation(location) {
  const url = 'https://places.googleapis.com/v1/places:searchNearby';
  
  const body = {
    locationRestriction: {
      circle: {
        center: {
          latitude: location.lat,
          longitude: location.lng
        },
        radius: SEARCH_RADIUS
      }
    },
    includedTypes: [
      'restaurant',
      'cafe', 
      'bakery',
      'bar',
      'meal_takeaway',
      'meal_delivery',
      'coffee_shop',
      'fast_food_restaurant'
    ],
    excludedTypes: ['gas_station', 'convenience_store'],
    maxResultCount: 20
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.primaryType,places.nationalPhoneNumber,places.websiteUri,places.regularOpeningHours,places.priceLevel,places.rating,places.userRatingCount,places.photos,places.editorialSummary,places.businessStatus'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Places API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

function transformPlace(place) {
  return {
    id: place.id,
    name: place.displayName?.text || place.displayName,
    address: place.formattedAddress,
    coordinates: {
      lat: place.location?.latitude,
      lng: place.location?.longitude
    },
    types: place.types || [],
    primaryType: place.primaryType,
    phone: place.nationalPhoneNumber || null,
    website: place.websiteUri || null,
    rating: place.rating || null,
    userRatingCount: place.userRatingCount || null,
    priceLevel: place.priceLevel || null,
    openingHours: place.regularOpeningHours || null,
    editorialSummary: place.editorialSummary?.text || null,
    businessStatus: place.businessStatus || 'OPERATIONAL',
    photos: place.photos?.map(p => ({
      name: p.name,
      width: p.widthPx,
      height: p.heightPx
    })) || [],
    // Fields we'll populate later
    neighborhood: null,
    cuisine: [],
    memories: [],
    tags: [],
    fetchedAt: new Date().toISOString()
  };
}

function determineNeighborhood(address) {
  const addr = (address || '').toLowerCase();
  if (addr.includes('nexton') || addr.includes('nexton pkwy')) return 'Nexton';
  if (addr.includes('n main') || addr.includes('north main')) return 'North Main';
  if (addr.includes('old trolley') || addr.includes('trolley rd')) return 'Old Trolley';
  if (addr.includes('summers corner')) return 'Summers Corner';
  if (addr.includes('s main') || addr.includes('main st') || addr.includes('downtown')) return 'Historic Downtown';
  return 'Summerville Area';
}

function deriveCuisine(types) {
  const cuisineMap = {
    'american_restaurant': 'American',
    'italian_restaurant': 'Italian',
    'mexican_restaurant': 'Mexican',
    'chinese_restaurant': 'Chinese',
    'japanese_restaurant': 'Japanese',
    'sushi_restaurant': 'Sushi',
    'thai_restaurant': 'Thai',
    'indian_restaurant': 'Indian',
    'french_restaurant': 'French',
    'greek_restaurant': 'Greek',
    'mediterranean_restaurant': 'Mediterranean',
    'seafood_restaurant': 'Seafood',
    'steak_house': 'Steakhouse',
    'barbecue_restaurant': 'BBQ',
    'burger_restaurant': 'Burgers',
    'pizza_restaurant': 'Pizza',
    'sandwich_shop': 'Sandwiches',
    'cafe': 'Cafe',
    'coffee_shop': 'Coffee',
    'bakery': 'Bakery',
    'bar': 'Bar',
    'pub': 'Pub',
    'fast_food_restaurant': 'Fast Food'
  };
  
  const cuisines = [];
  for (const type of types) {
    if (cuisineMap[type]) {
      cuisines.push(cuisineMap[type]);
    }
  }
  return cuisines.length > 0 ? cuisines : ['Restaurant'];
}

async function searchAllPlaces() {
  if (!GOOGLE_API_KEY) {
    console.error('Error: GOOGLE_API_KEY environment variable required');
    process.exit(1);
  }

  console.log('🔍 Fetching restaurants from Google Places API...\n');
  
  const allPlaces = new Map();
  
  for (const point of SEARCH_POINTS) {
    console.log(`📍 Searching ${point.name}...`);
    try {
      const data = await searchPlacesAtLocation(point);
      console.log(`   Found ${data.places?.length || 0} places`);
      
      if (data.places) {
        for (const place of data.places) {
          // Deduplicate by ID
          if (!allPlaces.has(place.id)) {
            allPlaces.set(place.id, transformPlace(place));
          }
        }
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Post-process
  const restaurants = Array.from(allPlaces.values()).map(r => ({
    ...r,
    neighborhood: determineNeighborhood(r.address),
    cuisine: deriveCuisine(r.types)
  }));

  console.log(`\n✅ Total unique places: ${restaurants.length}`);

  // Save
  const fs = require('fs');
  const dataDir = './data';
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = `${dataDir}/restaurants.json`;
  fs.writeFileSync(outputPath, JSON.stringify(restaurants, null, 2));
  console.log(`💾 Saved to ${outputPath}`);

  // Statistics
  console.log('\n📊 Neighborhood breakdown:');
  const neighborhoods = {};
  restaurants.forEach(r => {
    neighborhoods[r.neighborhood] = (neighborhoods[r.neighborhood] || 0) + 1;
  });
  Object.entries(neighborhoods)
    .sort((a, b) => b[1] - a[1])
    .forEach(([hood, count]) => {
      console.log(`   ${hood}: ${count}`);
    });

  console.log('\n🍽️ Top cuisine types:');
  const cuisines = {};
  restaurants.forEach(r => {
    r.cuisine.forEach(c => {
      cuisines[c] = (cuisines[c] || 0) + 1;
    });
  });
  Object.entries(cuisines)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([cuisine, count]) => {
      console.log(`   ${cuisine}: ${count}`);
    });

  console.log('\n📍 Sample places:');
  restaurants.slice(0, 5).forEach(r => {
    console.log(`   - ${r.name}`);
    console.log(`     ${r.neighborhood} | ${r.cuisine.join(', ')}`);
    console.log(`     ⭐ ${r.rating || 'N/A'} (${r.userRatingCount || 0} reviews)`);
  });
}

searchAllPlaces();
