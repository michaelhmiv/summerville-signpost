// Digital Veranda Map Style for Summerville Signpost
// A warm, Southern-inspired watercolor aesthetic

// Proper Mapbox watercolor style using vector tiles
// This creates a true watercolor effect with soft, pastel colors and muted tones
export const watercolorMapConfig = {
  // Use Mapbox Light style as base, then apply watercolor customizations
  style: 'mapbox://styles/mapbox/light-v11',
  // Custom watercolor paint properties that will be applied to layers
  watercolorPaint: {
    // Background - soft cream paper color
    background: {
      'background-color': '#faf8f5'
    },
    // Water - soft blue with reduced opacity
    water: {
      'fill-color': '#a8c8dc',
      'fill-opacity': 0.6
    },
    // Land - warm, muted earth tones
    land: {
      'fill-color': '#f0ebe3',
      'fill-opacity': 0.8
    },
    // Parks - soft green with watercolor wash effect
    park: {
      'fill-color': '#b8d4a8',
      'fill-opacity': 0.5
    },
    // Buildings - soft gray with reduced opacity
    building: {
      'fill-color': '#d4cfc5',
      'fill-opacity': 0.4,
      'fill-extrusion-opacity': 0.3
    },
    // Roads - muted colors with soft appearance
    road: {
      'line-color': '#c9c0b0',
      'line-opacity': 0.7,
      'line-width': {
        base: 1.5,
        stops: [[12, 0.5], [18, 2]]
      }
    },
    // Arterial roads - slightly darker
    roadArterial: {
      'line-color': '#b8afa0',
      'line-opacity': 0.75
    },
    // Highways - soft warm color
    roadHighway: {
      'line-color': '#e8d4b8',
      'line-opacity': 0.8
    },
    // Labels - soft, readable colors
    label: {
      'text-color': '#5a5548',
      'text-halo-color': '#faf8f5',
      'text-halo-width': 1.5,
      'text-opacity': 0.9
    },
    // POI labels
    poiLabel: {
      'text-color': '#7a7568',
      'text-halo-color': '#faf8f5',
      'text-halo-width': 1,
      'text-opacity': 0.85
    }
  }
};

// No CSS filters needed - Mapbox vector styling does the work
export const mapContainerStyles = {
  // Mapbox handles watercolor effect via vector tile styling
  // No CSS filters needed
};

// Alternative: Use a true watercolor tile source if available
// For now, CartoDB Voyager with heavy filters gives the best result

// Custom marker colors by neighborhood (matching tailwind config)
export const neighborhoodMarkerColors = {
  'Historic Downtown': {
    fill: '#fce7eb',
    stroke: '#f8d0da',
    text: '#881d37'
  },
  'Nexton': {
    fill: '#e8ece5',
    stroke: '#d1dac9',
    text: '#36412d'
  },
  'North Main': {
    fill: '#e6f0f3',
    stroke: '#d1e3e8',
    text: '#34535e'
  },
  'Old Trolley': {
    fill: '#f9f1e0',
    stroke: '#f2e0bd',
    text: '#874a26'
  },
  'Summers Corner': {
    fill: '#e8ebe4',
    stroke: '#d2d8ca',
    text: '#3d4434'
  },
  'Summerville Area': {
    fill: '#faf6f1',
    stroke: '#f2ebe0',
    text: '#6e5743'
  }
};

// Watercolor icon emojis
export const watercolorIcons = {
  restaurant: '🍽️',
  bar: '🍺',
  cafe: '☕',
  pizza: '🍕',
  burger: '🍔',
  sushi: '🍣',
  mexican: '🌮',
  coffee: '☕',
  bbq: '🍖',
  seafood: '🦐',
  italian: '🍝',
  default: '📍'
};

// No dynamic layer adjustments needed for raster tiles
// The CSS filters do all the work
export function applyWatercolorEffect(_map?: any) {
  // Raster tiles are filtered via CSS, no runtime adjustments needed
  // Map argument kept for API compatibility
}

// Theme config (not used with raster tiles but kept for compatibility)
export const mapThemeConfig = {};
export const watercolorCanvasStyles = {};
export const watercolorPaintProperties = {};
