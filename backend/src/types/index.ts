export interface Restaurant {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  types: string[];
  primaryType: string;
  phone: string | null;
  website: string | null;
  rating: number | null;
  userRatingCount: number | null;
  priceLevel: string | null;
  openingHours: {
    openNow?: boolean;
    periods?: Array<{
      open: { day: number; hour: number; minute: number };
      close: { day: number; hour: number; minute: number };
    }>;
    weekdayDescriptions?: string[];
    nextOpenTime?: string;
    nextCloseTime?: string;
  } | null;
  editorialSummary: string | null;
  businessStatus: string;
  photos: Array<{
    name: string;
    width: number;
    height: number;
  }>;
  neighborhood: string;
  cuisine: string[];
  memories: Memory[];
  tags: string[];
  fetchedAt: string;
}

export interface Memory {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp: number;
}

export type ViewMode = 'map' | 'list' | 'explore';

export type PriceLevel = '$' | '$$' | '$$$' | '$$$$';

export const PRICE_LEVEL_MAP: Record<string, PriceLevel> = {
  'PRICE_LEVEL_FREE': '$',
  'PRICE_LEVEL_INEXPENSIVE': '$',
  'PRICE_LEVEL_MODERATE': '$$',
  'PRICE_LEVEL_EXPENSIVE': '$$$',
  'PRICE_LEVEL_VERY_EXPENSIVE': '$$$$',
};

export const NEIGHBORHOOD_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Historic Downtown': { bg: 'bg-azalea-100', border: 'border-azalea-200', text: 'text-azalea-800' },
  'Nexton': { bg: 'bg-oak-100', border: 'border-oak-200', text: 'text-oak-800' },
  'North Main': { bg: 'bg-pine-100', border: 'border-pine-200', text: 'text-pine-800' },
  'Old Trolley': { bg: 'bg-haint-100', border: 'border-haint-200', text: 'text-haint-800' },
  'Summers Corner': { bg: 'bg-moss-100', border: 'border-moss-200', text: 'text-moss-800' },
  'Summerville Area': { bg: 'bg-porch-100', border: 'border-porch-200', text: 'text-porch-800' },
};
