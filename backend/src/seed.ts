import { getDatabase } from './database';
import { CreateSpotInput } from './types';

const spots: CreateSpotInput[] = [
  // Historic Downtown (12 spots)
  { name: "Mason's Rooftop Bar", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Upscale rooftop with craft cocktails and small plates", latitude: 33.0185, longitude: -80.1760 },
  { name: "The Ice House", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Historic building turned modern eatery with local brews", latitude: 33.0184, longitude: -80.1761 },
  { name: "843 Prime", address: "101 S Main St", neighborhood: "Historic Downtown", cuisine: "Steakhouse", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Premium steaks and seafood in elegant setting", latitude: 33.0180, longitude: -80.1755 },
  { name: "The Library Restaurant", address: "101 S Main St", neighborhood: "Historic Downtown", cuisine: "Southern", happy_hour_days: "Tue-Sat", happy_hour_time: "4-6:30pm", description: "Refined Southern cuisine in library-themed space", latitude: 33.0181, longitude: -80.1756 },
  { name: "Montreux Bar & Grill", address: "102 S Main St", neighborhood: "Historic Downtown", cuisine: "Bar & Grill", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Casual spot with burgers, beers, and live music", latitude: 33.0179, longitude: -80.1758 },
  { name: "EVO Pizzeria", address: "106 S Main St", neighborhood: "Historic Downtown", cuisine: "Pizza", happy_hour_days: "Daily", happy_hour_time: "3-6pm", description: "Wood-fired pizzas with local ingredients", latitude: 33.0182, longitude: -80.1757 },
  { name: "Blue Dahlia Bistro", address: "219 N Cedar St", neighborhood: "Historic Downtown", cuisine: "French", happy_hour_days: "Tue-Sat", happy_hour_time: "3-6pm", description: "Charming French bistro with wine specials", latitude: 33.0200, longitude: -80.1745 },
  { name: "Salty Dog Cafe", address: "101 E 3rd N St", neighborhood: "Historic Downtown", cuisine: "Seafood", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Coastal vibes with fresh seafood and cocktails", latitude: 33.0195, longitude: -80.1740 },
  { name: "Manny's Pub", address: "106 E 3rd N St", neighborhood: "Historic Downtown", cuisine: "Pub Food", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Local pub with craft beer selection", latitude: 33.0194, longitude: -80.1742 },
  { name: "One Hot Mama's", address: "107 S Main St", neighborhood: "Historic Downtown", cuisine: "BBQ", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Award-winning BBQ with Southern sides", latitude: 33.0183, longitude: -80.1759 },
  { name: "Cutty's Seafood & More", address: "109 N Cedar St", neighborhood: "Historic Downtown", cuisine: "Seafood", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Fresh local seafood and Lowcountry favorites", latitude: 33.0198, longitude: -80.1748 },
  { name: "Trios Italian Cafe", address: "118 S Main St", neighborhood: "Historic Downtown", cuisine: "Italian", happy_hour_days: "Mon-Fri", happy_hour_time: "3-6pm", description: "Family-owned Italian with handmade pasta", latitude: 33.0186, longitude: -80.1762 },
  
  // Main Street/Old Trolley (4 spots)
  { name: "Sweetwater Grille & Bar", address: "1001 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "American", happy_hour_days: "Mon-Fri", happy_hour_time: "3:30-6:30pm", description: "Neighborhood grill with extensive drink menu", latitude: 33.0350, longitude: -80.1600 },
  { name: "Southern Hops & Brewing", address: "1001-B Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Brewery", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Local craft brewery with rotating taps", latitude: 33.0352, longitude: -80.1598 },
  { name: "Sesame Burgers & Beer", address: "1004 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Burgers", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Gourmet burgers with craft beer pairings", latitude: 33.0355, longitude: -80.1605 },
  { name: "Prohibition", address: "1008 Old Trolley Rd", neighborhood: "Main Street/Old Trolley", cuisine: "Cocktails", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Speakeasy-style bar with craft cocktails", latitude: 33.0358, longitude: -80.1610 },
  
  // Nexton (2 spots)
  { name: "Oak Steakhouse", address: "1001 Nexton Pkwy", neighborhood: "Nexton", cuisine: "Steakhouse", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Upscale steakhouse in modern development", latitude: 33.0550, longitude: -80.1300 },
  { name: "Wild Wing Cafe", address: "1400 Nexton Pkwy", neighborhood: "Nexton", cuisine: "Wings", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Wings, beer, and live music venue", latitude: 33.0560, longitude: -80.1280 },
  
  // North Main (2 spots)
  { name: "Mellow Mushroom", address: "1400 N Main St", neighborhood: "North Main", cuisine: "Pizza", happy_hour_days: "Mon-Fri", happy_hour_time: "4-6:30pm", description: "Funky pizza joint with craft beer", latitude: 33.0450, longitude: -80.1700 },
  { name: "Azul Mexican Kitchen", address: "1181 N Main St", neighborhood: "North Main", cuisine: "Mexican", happy_hour_days: "Mon-Fri", happy_hour_time: "4-7pm", description: "Fresh Mexican with margarita specials", latitude: 33.0420, longitude: -80.1720 },
];

export function seedDatabase() {
  const db = getDatabase();

  // Check if we already have data
  const count = db.prepare('SELECT COUNT(*) as count FROM spots').get() as { count: number };
  
  if (count.count > 0) {
    console.log('Database already seeded with', count.count, 'spots');
    return;
  }

  const insert = db.prepare(`
    INSERT INTO spots 
    (name, address, neighborhood, cuisine, happy_hour_days, happy_hour_time, description, latitude, longitude)
    VALUES 
    (@name, @address, @neighborhood, @cuisine, @happy_hour_days, @happy_hour_time, @description, @latitude, @longitude)
  `);

  const insertMany = db.transaction((spots: CreateSpotInput[]) => {
    for (const spot of spots) {
      insert.run(spot);
    }
  });

  insertMany(spots);
  console.log(`Seeded database with ${spots.length} spots`);
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}
