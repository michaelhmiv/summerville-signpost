import { Link } from 'react-router-dom';
import { Clock, MapPin, ExternalLink } from 'lucide-react';
import type { Spot } from '../types';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <div className="bg-cream rounded-xl border-2 border-butter overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-serif font-bold text-charcoal">
              {spot.name}
            </h3>
            <p className="text-sm text-charcoal/60">{spot.cuisine}</p>
          </div>
          <span className="px-2 py-1 bg-mint text-charcoal text-xs font-medium rounded-full">
            {spot.neighborhood}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center text-sm text-charcoal/70 mb-3">
          <MapPin className="w-4 h-4 mr-1 text-rose" />
          {spot.address}
        </div>

        {/* Happy Hour */}
        <div className="bg-warm-white rounded-lg p-3 mb-3 border border-butter">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-1 text-sage-dark" />
            <span className="font-medium text-charcoal">Happy Hour</span>
          </div>
          <p className="text-sm text-charcoal/70 mb-2">
            {spot.happyHour.days} • {spot.happyHour.hours}
          </p>
          <ul className="text-xs text-charcoal/60 space-y-1">
            {spot.happyHour.deals.slice(0, 3).map((deal, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-1 h-1 bg-mint-dark rounded-full mr-2" />
                {deal}
              </li>
            ))}
            {spot.happyHour.deals.length > 3 && (
              <li className="text-sage-dark italic">
                +{spot.happyHour.deals.length - 3} more deals
              </li>
            )}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {spot.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-sage/50 text-charcoal/80 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-butter">
          <Link
            to={`/spot/${spot.id}`}
            className="flex items-center text-sm font-medium text-rose hover:text-rose-dark transition-colors"
          >
            View Details
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
          {spot.phone && (
            <a
              href={`tel:${spot.phone}`}
              className="text-xs text-charcoal/60 hover:text-charcoal"
            >
              {spot.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}