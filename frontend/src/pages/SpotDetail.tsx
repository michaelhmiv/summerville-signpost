import { useParams, Link } from 'react-router-dom';
import { getRestaurantById } from '../data/restaurants';
import { NEIGHBORHOOD_COLORS, PRICE_LEVEL_MAP } from '../types';
import { MapPin, Phone, Globe, Clock, Star, ArrowLeft, Heart, Share, Navigation } from 'lucide-react';

export default function SpotDetail() {
  const { id } = useParams<{ id: string }>();
  const restaurant = id ? getRestaurantById(id) : undefined;

  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-2xl font-bold text-porch-800 mb-4">Place Not Found</h1>
        <p className="text-porch-600 mb-6">We couldn't find that restaurant.</p>
        <Link to="/" className="porch-btn">
          Back to Map
        </Link>
      </div>
    );
  }

  const colors = NEIGHBORHOOD_COLORS[restaurant.neighborhood] || NEIGHBORHOOD_COLORS['Summerville Area'];
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link 
        to="/" 
        className="inline-flex items-center text-sm text-porch-500 hover:text-oak-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to map
      </Link>

      {/* Header Card */}
      <div className="veranda-card overflow-hidden mb-6">
        {/* Placeholder Image Area */}
        <div className={`h-48 ${colors.bg} flex items-center justify-center relative`}>
          <div className="text-center">
            <span className="text-6xl opacity-30">
              {restaurant.cuisine.includes('Pizza') ? '🍕' :
               restaurant.cuisine.includes('Burgers') ? '🍔' :
               restaurant.cuisine.includes('Sushi') ? '🍣' :
               restaurant.cuisine.includes('Mexican') ? '🌮' :
               restaurant.cuisine.includes('Coffee') ? '☕' :
               restaurant.cuisine.includes('BBQ') ? '🍖' :
               restaurant.cuisine.includes('Seafood') ? '🦐' :
               restaurant.cuisine.includes('Italian') ? '🍝' :
               restaurant.cuisine.includes('Bar') ? '🍺' :
               '🍽️'}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 rounded-full bg-white/80 hover:bg-white text-porch-600 shadow-sm transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white text-porch-600 shadow-sm transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Badges */}
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {restaurant.neighborhood}
            </span>
            {restaurant.cuisine.slice(0, 2).map(c => (
              <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium bg-porch-100 text-porch-600">
                {c}
              </span>
            ))}
          </div>

          {/* Name */}
          <h1 className="font-serif text-3xl font-bold text-porch-800 mb-2">
            {restaurant.name}
          </h1>

          {/* Rating & Price */}
          <div className="flex items-center space-x-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center space-x-1.5">
                <div className="flex items-center bg-pine-100 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-pine-600 fill-current" />
                  <span className="ml-1 font-semibold text-pine-700">{restaurant.rating}</span>
                </div>
                <span className="text-sm text-porch-500">
                  {restaurant.userRatingCount} reviews
                </span>
              </div>
            )}
            <span className="text-porch-600 font-medium">
              {PRICE_LEVEL_MAP[restaurant.priceLevel || ''] || '$$'}
            </span>
          </div>

          {/* Description */}
          {restaurant.editorialSummary && (
            <p className="text-porch-600 leading-relaxed mb-6">
              {restaurant.editorialSummary}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="porch-btn flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </a>
            {restaurant.website && (
              <a 
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="porch-btn-secondary flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Website</span>
              </a>
            )}
            {restaurant.phone && (
              <a 
                href={`tel:${restaurant.phone}`}
                className="porch-btn-secondary flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="veranda-card p-6">
          <h2 className="font-serif font-semibold text-porch-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-oak-500" />
            Location
          </h2>
          <p className="text-porch-600 mb-4">{restaurant.address}</p>
          <div className="aspect-video rounded-lg bg-porch-100 flex items-center justify-center">
            <span className="text-porch-400 text-sm">Map view coming soon</span>
          </div>
        </div>

        {/* Hours */}
        <div className="veranda-card p-6">
          <h2 className="font-serif font-semibold text-porch-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-oak-500" />
            Hours
          </h2>
          {restaurant.openingHours?.weekdayDescriptions ? (
            <ul className="space-y-2">
              {restaurant.openingHours.weekdayDescriptions.map((day, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-porch-500">{day.split(': ')[0]}</span>
                  <span className="text-porch-700">{day.split(': ')[1]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-porch-500">Hours not available</p>
          )}
          {restaurant.openingHours?.openNow !== undefined && (
            <div className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm ${
              restaurant.openingHours.openNow 
                ? 'bg-oak-100 text-oak-700' 
                : 'bg-azalea-100 text-azalea-700'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                restaurant.openingHours.openNow ? 'bg-oak-500' : 'bg-azalea-500'
              }`} />
              {restaurant.openingHours.openNow ? 'Open now' : 'Closed'}
            </div>
          )}
        </div>
      </div>

      {/* Community Section - Placeholder */}
      <div className="mt-8 veranda-card p-6 text-center">
        <h2 className="font-serif font-semibold text-porch-800 mb-2">
          Community Memories
        </h2>
        <p className="text-porch-600 mb-4">
          Be the first to share a memory about {restaurant.name}
        </p>
        <button className="porch-btn-secondary">
          Share a Memory
        </button>
      </div>
    </div>
  );
}
