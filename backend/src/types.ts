export interface Spot {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  cuisine: string;
  happy_hour_days: string;
  happy_hour_time: string;
  description: string | null;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  price_range: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSpotInput {
  name: string;
  address: string;
  neighborhood: string;
  cuisine: string;
  happy_hour_days: string;
  happy_hour_time: string;
  description?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  price_range?: string;
}
