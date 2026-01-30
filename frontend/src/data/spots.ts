import type { Spot } from '../types';

export const spots: Spot[] = [
  // Historic Downtown (12 spots)
  {
    id: 'masons-rooftop',
    name: "Mason's Rooftop Bar",
    address: "107 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "American / Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "3-6pm",
      deals: ["$2 off drafts", "$5 wines", "$7 cocktails", "$5 appetizers"]
    },
    coordinates: { lat: 33.0185, lng: -80.1753 },
    phone: "(843) 871-9310",
    website: "https://masonsrooftop.com",
    tags: ["rooftop", "views", "cocktails", "outdoor seating"]
  },
  {
    id: 'ice-house',
    name: "The Ice House",
    address: "107 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "American / Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "3-6pm",
      deals: ["$3 domestics", "$4 imports", "$5 house wine", "$6 cocktails"]
    },
    coordinates: { lat: 33.0184, lng: -80.1752 },
    tags: ["pub", "casual", "beer selection"]
  },
  {
    id: '843-prime',
    name: "843 Prime",
    address: "101 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "Steakhouse / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-6:30pm",
      deals: ["$2 off all drinks", "$8 bar bites", "$7 wines by the glass"]
    },
    coordinates: { lat: 33.0188, lng: -80.1755 },
    phone: "(843) 871-7110",
    tags: ["upscale", "steaks", "wine", "date night"]
  },
  {
    id: 'library-restaurant',
    name: "The Library Restaurant",
    address: "101 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "Southern / American",
    happyHour: {
      days: "Tue-Sat",
      hours: "4-6:30pm",
      deals: ["$5 cocktails", "$6 wine", "$4 beers", "$8 appetizers"]
    },
    coordinates: { lat: 33.0187, lng: -80.1756 },
    phone: "(843) 871-1222",
    tags: ["historic", "southern", "romantic", "fine dining"]
  },
  {
    id: 'montreux',
    name: "Montreux Bar & Grill",
    address: "102 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "American / Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-6:30pm",
      deals: ["$3 drafts", "$4 wells", "$5 wine", "Half-price apps"]
    },
    coordinates: { lat: 33.0183, lng: -80.1754 },
    tags: ["casual", "sports", "pub food", "lively"]
  },
  {
    id: 'evo-pizzeria',
    name: "EVO Pizzeria",
    address: "106 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "Pizza / Italian",
    happyHour: {
      days: "Daily",
      hours: "3-6pm",
      deals: ["$4 drafts", "$5 house wine", "$6 cocktails", "$8 pizzas"]
    },
    coordinates: { lat: 33.0186, lng: -80.1751 },
    phone: "(843) 821-3447",
    website: "https://evopizza.com",
    tags: ["pizza", "wood-fired", "local ingredients", "family-friendly"]
  },
  {
    id: 'blue-dahlia',
    name: "Blue Dahlia Bistro",
    address: "219 N Cedar St",
    neighborhood: "Historic Downtown",
    cuisine: "French / Bistro",
    happyHour: {
      days: "Tue-Sat",
      hours: "3-6pm",
      deals: ["$6 wine", "$7 cocktails", "$5 beers", "$10 cheese boards"]
    },
    coordinates: { lat: 33.0195, lng: -80.1745 },
    phone: "(843) 875-0331",
    tags: ["french", "bistro", "wine bar", "cozy"]
  },
  {
    id: 'salty-dog',
    name: "Salty Dog Cafe",
    address: "101 E 3rd N St",
    neighborhood: "Historic Downtown",
    cuisine: "Seafood / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$3 domestics", "$4 imports", "$5 wine", "$6 cocktails"]
    },
    coordinates: { lat: 33.0198, lng: -80.1748 },
    phone: "(843) 871-1221",
    tags: ["seafood", "casual", "outdoor seating", "dog-friendly"]
  },
  {
    id: 'mannys-pub',
    name: "Manny's Pub",
    address: "106 E 3rd N St",
    neighborhood: "Historic Downtown",
    cuisine: "Pub / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$2.50 domestics", "$3.50 imports", "$4 wells", "Half-price wings"]
    },
    coordinates: { lat: 33.0197, lng: -80.1746 },
    tags: ["dive bar", "cheap drinks", "locals", "pool"]
  },
  {
    id: 'one-hot-mamas',
    name: "One Hot Mama's",
    address: "107 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "BBQ / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "3-6pm",
      deals: ["$3 drafts", "$4 wells", "$5 wine", "$6 appetizers"]
    },
    coordinates: { lat: 33.0182, lng: -80.1750 },
    phone: "(843) 871-1220",
    tags: ["bbq", "casual", "family-friendly", "southern"]
  },
  {
    id: 'cuttys-seafood',
    name: "Cutty's Seafood & More",
    address: "109 N Cedar St",
    neighborhood: "Historic Downtown",
    cuisine: "Seafood / Soul Food",
    happyHour: {
      days: "Mon-Fri",
      hours: "3-6pm",
      deals: ["$3 domestics", "$4 wells", "$5 wine", "$7 seafood apps"]
    },
    coordinates: { lat: 33.0194, lng: -80.1744 },
    tags: ["seafood", "soul food", "casual", "local favorite"]
  },
  {
    id: 'trios-italian',
    name: "Trios Italian Cafe",
    address: "118 S Main St",
    neighborhood: "Historic Downtown",
    cuisine: "Italian",
    happyHour: {
      days: "Mon-Fri",
      hours: "3-6pm",
      deals: ["$4 drafts", "$5 wine", "$6 cocktails", "$8 bruschetta"]
    },
    coordinates: { lat: 33.0180, lng: -80.1752 },
    phone: "(843) 871-1199",
    tags: ["italian", "pasta", "wine", "cozy"]
  },
  // Main Street Area / Old Trolley (4 spots)
  {
    id: 'sweetwater-grille',
    name: "Sweetwater Grille & Bar",
    address: "1001 Old Trolley Rd",
    neighborhood: "Main Street / Old Trolley",
    cuisine: "American / Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "3:30-6:30pm",
      deals: ["$3.50 drafts", "$4.50 wells", "$5 wine", "$7 apps"]
    },
    coordinates: { lat: 32.9956, lng: -80.1556 },
    phone: "(843) 875-9666",
    tags: ["neighborhood bar", "casual", "sports", "friendly"]
  },
  {
    id: 'southern-hops',
    name: "Southern Hops & Brewing",
    address: "1001-B Old Trolley Rd",
    neighborhood: "Main Street / Old Trolley",
    cuisine: "Brewery / Pub",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$4 pints", "$5 flights", "$6 wine", "$8 pretzels"]
    },
    coordinates: { lat: 32.9955, lng: -80.1555 },
    phone: "(843) 871-2337",
    website: "https://southernhops.com",
    tags: ["brewery", "craft beer", "local", "casual"]
  },
  {
    id: 'sesame-burgers',
    name: "Sesame Burgers & Beer",
    address: "1004 Old Trolley Rd",
    neighborhood: "Main Street / Old Trolley",
    cuisine: "Burgers / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$4 drafts", "$5 wine", "$6 cocktails", "$8 burgers"]
    },
    coordinates: { lat: 32.9954, lng: -80.1554 },
    phone: "(843) 875-9669",
    website: "https://sesameburgers.com",
    tags: ["burgers", "craft beer", "casual", "family-friendly"]
  },
  {
    id: 'prohibition',
    name: "Prohibition",
    address: "1008 Old Trolley Rd",
    neighborhood: "Main Street / Old Trolley",
    cuisine: "Bar / American",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$5 cocktails", "$4 drafts", "$6 wine", "$8 bar bites"]
    },
    coordinates: { lat: 32.9953, lng: -80.1553 },
    phone: "(843) 875-9585",
    tags: ["speakeasy", "craft cocktails", "upscale", "date night"]
  },
  // Nexton (2 spots)
  {
    id: 'oak-steakhouse',
    name: "Oak Steakhouse",
    address: "1001 Nexton Pkwy",
    neighborhood: "Nexton",
    cuisine: "Steakhouse / Fine Dining",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-6:30pm",
      deals: ["$8 cocktails", "$7 wine", "$5 beers", "$12 bar bites"]
    },
    coordinates: { lat: 33.0561, lng: -80.1319 },
    phone: "(843) 990-8500",
    website: "https://oaksteakhousenexton.com",
    tags: ["steakhouse", "upscale", "wine", "business dining"]
  },
  {
    id: 'wild-wing-cafe',
    name: "Wild Wing Cafe",
    address: "1400 Nexton Pkwy",
    neighborhood: "Nexton",
    cuisine: "Wings / Sports Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$3.50 drafts", "$4 wells", "$5 wine", "$0.75 wings"]
    },
    coordinates: { lat: 33.0570, lng: -80.1325 },
    phone: "(843) 990-9464",
    website: "https://wildwingcafe.com",
    tags: ["wings", "sports bar", "casual", "tv"]
  },
  // North Main Street (2 spots)
  {
    id: 'mellow-mushroom',
    name: "Mellow Mushroom",
    address: "1400 N Main St",
    neighborhood: "North Main Street",
    cuisine: "Pizza / Bar",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-6:30pm",
      deals: ["$4 drafts", "$5 wine", "$6 cocktails", "$7 apps"]
    },
    coordinates: { lat: 33.0411, lng: -80.1625 },
    phone: "(843) 821-1905",
    website: "https://mellowmushroom.com",
    tags: ["pizza", "craft beer", "casual", "family-friendly"]
  },
  {
    id: 'azul-mexican',
    name: "Azul Mexican Kitchen",
    address: "1181 N Main St",
    neighborhood: "North Main Street",
    cuisine: "Mexican",
    happyHour: {
      days: "Mon-Fri",
      hours: "4-7pm",
      deals: ["$4 margaritas", "$3 drafts", "$5 wine", "$6 tacos"]
    },
    coordinates: { lat: 33.0380, lng: -80.1610 },
    phone: "(843) 875-0055",
    tags: ["mexican", "margaritas", "casual", "outdoor seating"]
  }
];

export const getSpotsByNeighborhood = (neighborhood: string) => {
  return spots.filter(spot => spot.neighborhood === neighborhood);
};

export const getSpotById = (id: string) => {
  return spots.find(spot => spot.id === id);
};