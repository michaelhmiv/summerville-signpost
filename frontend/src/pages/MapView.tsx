import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { restaurants } from '../data/restaurants';
import type { Restaurant, UserLocation } from '../types';
import { NEIGHBORHOOD_COLORS, PRICE_LEVEL_MAP } from '../types';
import { MapPin, Crosshair, List, X, Star, Clock, Phone } from 'lucide-react';

// Mapbox token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2h6ZzB4eXgwMjQ2MnNxcXc4Z2E5a2VjIn0.example';

// Summerville center
const SUMMERVILLE_CENTER: [number, number] = [-80.1753, 33.0185];

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showList, setShowList] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);

  // Calculate distance between two points (haversine formula)
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Get nearby restaurants sorted by distance
  const getNearbyRestaurants = useCallback((location: UserLocation): Restaurant[] => {
    return restaurants
      .map(r => ({
        ...r,
        distance: calculateDistance(location.lat, location.lng, r.coordinates.lat, r.coordinates.lng)
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 10);
  }, [calculateDistance]);

  // Get user location
  const getUserLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        setUserLocation(location);
        setIsLocating(false);
        
        // Update nearby restaurants
        const nearby = getNearbyRestaurants(location);
        setNearbyRestaurants(nearby);
        
        // Fly to user location
        if (map.current) {
          map.current.flyTo({
            center: [location.lng, location.lat],
            zoom: 14,
            duration: 1500
          });
        }
      },
      (error) => {
        console.error('Location error:', error);
        setLocationError('Unable to get your location');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [getNearbyRestaurants]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: SUMMERVILLE_CENTER,
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
        visualizePitch: false,
      }),
      'bottom-right'
    );

    // Add markers for each restaurant
    restaurants.forEach((restaurant) => {
      const colors = NEIGHBORHOOD_COLORS[restaurant.neighborhood] || NEIGHBORHOOD_COLORS['Summerville Area'];
      
      const el = document.createElement('div');
      el.className = 'restaurant-marker';
      el.innerHTML = `
        <div class="w-8 h-8 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${colors.text}">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;
      
      el.addEventListener('click', () => {
        setSelectedRestaurant(restaurant);
      });

      new mapboxgl.Marker(el)
        .setLngLat([restaurant.coordinates.lng, restaurant.coordinates.lat])
        .addTo(map.current!);
    });

    // Add user location marker if available
    if (userLocation) {
      const userEl = document.createElement('div');
      userEl.className = 'user-location-marker';
      userEl.innerHTML = `
        <div class="relative">
          <div class="absolute inset-0 bg-oak-400 rounded-full animate-ping opacity-30"></div>
          <div class="relative w-4 h-4 bg-oak-600 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `;
      
      new mapboxgl.Marker(userEl)
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current!);
    }

    return () => {
      map.current?.remove();
    };
  }, [userLocation]);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
        {/* Search / Filter Bar */}
        <div className="veranda-card px-4 py-3 pointer-events-auto max-w-md">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-oak-500" />
            <div>
              <h2 className="font-serif font-semibold text-porch-800">
                {userLocation ? 'Near You' : 'Summerville'}
              </h2>
              <p className="text-xs text-porch-500">
                {userLocation 
                  ? `${nearbyRestaurants.length} places within 5 miles`
                  : `${restaurants.length} places to explore`
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={() => setShowList(!showList)}
            className="veranda-card p-3 hover:bg-porch-50 transition-colors"
            title="Toggle List View"
          >
            {showList ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Location Button */}
      <button
        onClick={getUserLocation}
        disabled={isLocating}
        className={`
          absolute bottom-8 right-8 z-10
          w-12 h-12 rounded-full shadow-porch-lg
          flex items-center justify-center
          transition-all duration-200
          ${isLocating 
            ? 'bg-porch-200 text-porch-400 cursor-wait' 
            : 'bg-white text-oak-600 hover:bg-oak-50 hover:scale-105'
          }
        `}
        title="Find my location"
      >
        {isLocating ? (
          <div className="w-5 h-5 border-2 border-oak-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Crosshair className="w-5 h-5" />
        )}
      </button>
      
      {/* Location Error */}
      {locationError && (
        <div className="absolute bottom-24 right-4 left-4 md:left-auto md:w-80 veranda-card p-4 border-l-4 border-azalea-500">
          <p className="text-sm text-porch-700">{locationError}</p>
          <button 
            onClick={() => setLocationError(null)}
            className="text-xs text-porch-500 hover:text-oak-600 mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Restaurant List Sidebar */}
      {showList && (
        <div className="absolute top-20 left-4 bottom-4 w-80 veranda-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-porch-100">
            <h3 className="font-serif font-semibold text-porch-800">
              {userLocation ? 'Nearby Places' : 'All Places'}
            </h3>
            <p className="text-xs text-porch-500">
              {userLocation 
                ? `Sorted by distance from you`
                : `Sorted by neighborhood`
              }
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {(userLocation ? nearbyRestaurants : restaurants).map((restaurant) => {
              const colors = NEIGHBORHOOD_COLORS[restaurant.neighborhood] || NEIGHBORHOOD_COLORS['Summerville Area'];
              const distance = userLocation 
                ? calculateDistance(userLocation.lat, userLocation.lng, restaurant.coordinates.lat, restaurant.coordinates.lng)
                : null;
              
              return (
                <button
                  key={restaurant.id}
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    map.current?.flyTo({
                      center: [restaurant.coordinates.lng, restaurant.coordinates.lat],
                      zoom: 15
                    });
                  }}
                  className="w-full text-left p-4 border-b border-porch-100 hover:bg-porch-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-porch-800 truncate">{restaurant.name}</h4>
                      <p className="text-xs text-porch-500 mt-0.5">{restaurant.neighborhood}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {restaurant.rating && (
                          <span className="flex items-center text-xs text-pine-700">
                            <Star className="w-3 h-3 mr-0.5 fill-current" />
                            {restaurant.rating}
                          </span>
                        )}
                        {distance && (
                          <span className="text-xs text-oak-600">
                            {distance < 0.1 ? '< 0.1' : distance.toFixed(1)} mi
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                      {PRICE_LEVEL_MAP[restaurant.priceLevel || ''] || '$$'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Selected Restaurant Detail Panel */}
      {selectedRestaurant && (
        <div className="absolute top-20 right-4 w-80 max-h-[calc(100%-6rem)] veranda-card overflow-y-auto">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 ${
                  NEIGHBORHOOD_COLORS[selectedRestaurant.neighborhood]?.bg || 'bg-porch-100'
                } ${
                  NEIGHBORHOOD_COLORS[selectedRestaurant.neighborhood]?.text || 'text-porch-700'
                }`}>
                  {selectedRestaurant.neighborhood}
                </span>
                <h3 className="font-serif font-bold text-lg text-porch-800 leading-tight">
                  {selectedRestaurant.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="p-1 text-porch-400 hover:text-porch-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Rating & Price */}
            <div className="flex items-center space-x-3 mb-3">
              {selectedRestaurant.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-pine-500 fill-current" />
                  <span className="font-semibold text-porch-800">{selectedRestaurant.rating}</span>
                  <span className="text-xs text-porch-500">({selectedRestaurant.userRatingCount})</span>
                </div>
              )}
              <span className="text-porch-600">
                {PRICE_LEVEL_MAP[selectedRestaurant.priceLevel || ''] || '$$'}
              </span>
              <span className="text-porch-400">•</span>
              <span className="text-sm text-porch-600">
                {selectedRestaurant.cuisine.slice(0, 2).join(', ')}
              </span>
            </div>
            
            {/* Description */}
            {selectedRestaurant.editorialSummary && (
              <p className="text-sm text-porch-600 mb-3 leading-relaxed">
                {selectedRestaurant.editorialSummary}
              </p>
            )}
            
            {/* Address */}
            <div className="flex items-start space-x-2 mb-2 text-sm text-porch-600">
              <MapPin className="w-4 h-4 mt-0.5 text-oak-500 shrink-0" />
              <span>{selectedRestaurant.address}</span>
            </div>
            
            {/* Hours */}
            {selectedRestaurant.openingHours && (
              <div className="flex items-center space-x-2 mb-2 text-sm">
                <Clock className="w-4 h-4 text-oak-500 shrink-0" />
                <span className={selectedRestaurant.openingHours.openNow ? 'text-oak-600' : 'text-azalea-600'}>
                  {selectedRestaurant.openingHours.openNow ? 'Open now' : 'Closed'}
                </span>
              </div>
            )}
            
            {/* Phone */}
            {selectedRestaurant.phone && (
              <div className="flex items-center space-x-2 mb-4 text-sm text-porch-600">
                <Phone className="w-4 h-4 text-oak-500 shrink-0" />
                <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-oak-700">
                  {selectedRestaurant.phone}
                </a>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex space-x-2 pt-3 border-t border-porch-100">
              <button 
                onClick={() => navigate(`/spot/${selectedRestaurant.id}`)}
                className="flex-1 porch-btn text-center text-sm"
              >
                View Details
              </button>
              {selectedRestaurant.website && (
                <a 
                  href={selectedRestaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="porch-btn-secondary text-sm"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
