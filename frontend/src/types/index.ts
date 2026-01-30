export interface Spot {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  cuisine: string;
  happyHour: {
    days: string;
    hours: string;
    deals: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  rating?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  tags: string[];
}

export type Neighborhood = 'Historic Downtown' | 'Main Street / Old Trolley' | 'Nexton' | 'North Main Street';

export const NEIGHBORHOODS: Neighborhood[] = [
  'Historic Downtown',
  'Main Street / Old Trolley', 
  'Nexton',
  'North Main Street'
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];