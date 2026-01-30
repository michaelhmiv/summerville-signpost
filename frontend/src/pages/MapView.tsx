import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { spots } from '../data/spots';
import { MapPin } from 'lucide-react';

// Mapbox token - using a demo token, replace with your own
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2h6ZzB4eXgwMjQ2MnNxcXc4Z2E5a2VjIn0.example';

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [, setSelectedSpot] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-80.17, 33.02], // Summerville center
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each spot
    spots.forEach((spot) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        width: 32px;
        height: 32px;
        background: #A8E6CF;
        border: 3px solid #FFB7B2;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: transform 0.2s, box-shadow 0.2s;
      `;
      el.innerHTML = '<span style="font-size: 14px;">🍸</span>';
      
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([spot.coordinates.lng, spot.coordinates.lat])
        .addTo(map.current!);

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="font-family: Georgia, serif; max-width: 200px;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #3D3D3D; font-weight: bold;">
            ${spot.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            ${spot.cuisine}
          </p>
          <p style="margin: 0 0 4px 0; font-size: 11px; color: #888;">
            ${spot.address}
          </p>
          <div style="background: #FFFDD0; padding: 8px; border-radius: 6px; margin-top: 8px;">
            <p style="margin: 0; font-size: 11px; font-weight: bold; color: #3D3D3D;">
              Happy Hour
            </p>
            <p style="margin: 2px 0 0 0; font-size: 11px; color: #666;">
              ${spot.happyHour.days} • ${spot.happyHour.hours}
            </p>
          </div>
        </div>
      `);

      marker.setPopup(popup);
      
      el.addEventListener('click', () => {
        setSelectedSpot(spot.id);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] relative">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-cream p-4 rounded-xl border-2 border-butter shadow-lg max-w-xs">
        <h3 className="font-serif font-bold text-charcoal mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-rose" />
          Neighborhoods
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-mint border-2 border-rose mr-2" />
            <span className="text-charcoal/80">Historic Downtown (12)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-sage border-2 border-sage-dark mr-2" />
            <span className="text-charcoal/80">Main St / Old Trolley (4)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-butter border-2 border-butter-dark mr-2" />
            <span className="text-charcoal/80">Nexton (2)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-rose border-2 border-rose-dark mr-2" />
            <span className="text-charcoal/80">North Main St (2)</span>
          </div>
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur p-4 rounded-xl border-2 border-butter shadow-lg max-w-xs">
        <p className="text-sm text-charcoal/70">
          Click on markers to see happy hour details. 
          <span className="block mt-1 text-xs text-charcoal/50">
            Map shows approximate locations.
          </span>
        </p>
      </div>
    </div>
  );
}