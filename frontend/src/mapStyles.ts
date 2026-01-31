// Digital Veranda Map Style for Summerville Signpost
// A warm, Southern-inspired watercolor aesthetic using Mapbox tiles with CSS filters

// Mapbox watercolor-style configuration
// Uses Mapbox's standard tiles with CSS filters for watercolor effect
export const watercolorMapConfig = {
  // Light, muted style that works well with watercolor filters
  style: 'mapbox://styles/mapbox/light-v11',
  // Alternative options that also work well:
  // 'mapbox://styles/mapbox/outdoors-v12' - more natural colors
  // 'mapbox://styles/mapbox/streets-v12' - more detail
};

// CSS filters to create watercolor effect on Mapbox tiles
// These filters soften edges, mute colors, and create artistic texture
export const mapContainerStyles = {
  // Core watercolor effect:
  // - saturate(0.85): Mutes colors slightly for that washed look
  // - contrast(0.9): Softens edges and reduces harsh lines
  // - brightness(1.05): Slight brightness boost
  filter: 'saturate(0.85) contrast(0.9) brightness(1.05)',
};

// Enhanced watercolor effect - apply this to the canvas for deeper effect
export const watercolorCanvasStyles = {
  // Additional filters for the canvas element itself
  // Creates softer, more artistic rendering
  filter: 'blur(0.3px) saturate(0.9)',
};

// Map paint properties to soften vector features
export const watercolorPaintProperties = {
  // Water - make it softer, more translucent
  'water-color': '#c5d8e0',
  'water-opacity': 0.7,

  // Land - warmer, softer tone
  'land-color': '#f5f0e8',

  // Buildings - very subtle
  'building-fill-color': '#e8e0d5',
  'building-fill-opacity': 0.4,

  // Roads - softer, less prominent
  'road-color': '#f0ebe3',
  'road-opacity': 0.6,

  // Labels - muted
  'text-color': '#6b5b4f',
  'text-halo-color': '#f5f0e8',
};

// Theme config for Mapbox Standard (when not using custom style)
export const mapThemeConfig = {
  light: {
    // Muted, warm color scheme
    baseColor: '#f5f0e8',
    waterColor: '#c5d8e0',
    accentColor: '#8b7355',
  }
};

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

// Helper to apply watercolor effect to a Mapbox map instance
export function applyWatercolorEffect(map: mapboxgl.Map) {
  // Once the map is loaded, adjust layer paint properties for softer look
  map.on('style.load', () => {
    // Try to find and soften water layers
    const waterLayers = ['water', 'waterway', 'water-shadow'];
    waterLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'fill-color', watercolorPaintProperties['water-color']);
        map.setPaintProperty(layerId, 'fill-opacity', watercolorPaintProperties['water-opacity']);
      }
    });

    // Soften building layers
    const buildingLayers = ['building', 'building-3d', 'building-outline'];
    buildingLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'fill-color', watercolorPaintProperties['building-fill-color']);
        map.setPaintProperty(layerId, 'fill-opacity', watercolorPaintProperties['building-fill-opacity']);
      }
    });

    // Soften road layers
    const roadLayers = ['road', 'road-primary', 'road-secondary', 'road-street', 'road-minor'];
    roadLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'line-color', watercolorPaintProperties['road-color']);
        map.setPaintProperty(layerId, 'line-opacity', watercolorPaintProperties['road-opacity']);
      }
    });
  });
}
