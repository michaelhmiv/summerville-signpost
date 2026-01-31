import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { NEIGHBORHOOD_COLORS, PRICE_LEVEL_MAP } from '../types';
import { Search, MapPin, Star, Filter, X } from 'lucide-react';

export default function ListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique neighborhoods and cuisines
  const neighborhoods = useMemo(() => 
    [...new Set(restaurants.map(r => r.neighborhood))].sort(),
    []
  );
  
  const cuisines = useMemo(() => {
    const allCuisines = new Set<string>();
    restaurants.forEach(r => r.cuisine.forEach(c => allCuisines.add(c)));
    return [...allCuisines].sort();
  }, []);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesSearch = searchQuery === '' || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesNeighborhood = !selectedNeighborhood || r.neighborhood === selectedNeighborhood;
      const matchesCuisine = !selectedCuisine || r.cuisine.includes(selectedCuisine);
      
      return matchesSearch && matchesNeighborhood && matchesCuisine;
    });
  }, [searchQuery, selectedNeighborhood, selectedCuisine]);

  // Group by neighborhood
  const groupedByNeighborhood = useMemo(() => {
    const grouped: Record<string, typeof restaurants> = {};
    filteredRestaurants.forEach(r => {
      if (!grouped[r.neighborhood]) grouped[r.neighborhood] = [];
      grouped[r.neighborhood].push(r);
    });
    return grouped;
  }, [filteredRestaurants]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-porch-800 mb-2">
          All Places
        </h1>
        <p className="text-porch-600">
          Discover {restaurants.length} restaurants, cafes, and local gems in Summerville
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-porch-400" />
          <input
            type="text"
            placeholder="Search by name, cuisine, or neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-porch-200 bg-white focus:outline-none focus:ring-2 focus:ring-oak-400 focus:border-transparent"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
              showFilters ? 'bg-oak-100 text-oak-700' : 'bg-porch-100 text-porch-700 hover:bg-porch-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {(selectedNeighborhood || selectedCuisine) && (
              <span className="ml-1 px-1.5 py-0.5 bg-oak-500 text-white rounded-full text-xs">
                {[selectedNeighborhood, selectedCuisine].filter(Boolean).length}
              </span>
            )}
          </button>

          {selectedNeighborhood && (
            <button
              onClick={() => setSelectedNeighborhood(null)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-pill bg-oak-100 text-oak-700 text-sm"
            >
              <span>{selectedNeighborhood}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {selectedCuisine && (
            <button
              onClick={() => setSelectedCuisine(null)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-pill bg-pine-100 text-pine-700 text-sm"
            >
              <span>{selectedCuisine}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {(selectedNeighborhood || selectedCuisine) && (
            <button
              onClick={() => {
                setSelectedNeighborhood(null);
                setSelectedCuisine(null);
              }}
              className="text-sm text-porch-500 hover:text-oak-600"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="veranda-card p-4 space-y-4">
            {/* Neighborhood Filter */}
            <div>
              <h4 className="font-medium text-porch-700 mb-2">Neighborhood</h4>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map(hood => {
                  const colors = NEIGHBORHOOD_COLORS[hood] || NEIGHBORHOOD_COLORS['Summerville Area'];
                  const selected = selectedNeighborhood === hood;
                  return (
                    <button
                      key={hood}
                      onClick={() => setSelectedNeighborhood(selected ? null : hood)}
                      className={`px-3 py-1.5 rounded-pill text-sm transition-colors ${
                        selected 
                          ? `${colors.bg} ${colors.text} ring-1 ring-current` 
                          : 'bg-porch-50 text-porch-600 hover:bg-porch-100'
                      }`}
                    >
                      {hood}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cuisine Filter */}
            <div>
              <h4 className="font-medium text-porch-700 mb-2">Cuisine</h4>
              <div className="flex flex-wrap gap-2">
                {cuisines.map(cuisine => {
                  const selected = selectedCuisine === cuisine;
                  return (
                    <button
                      key={cuisine}
                      onClick={() => setSelectedCuisine(selected ? null : cuisine)}
                      className={`px-3 py-1.5 rounded-pill text-sm transition-colors ${
                        selected 
                          ? 'bg-pine-100 text-pine-700 ring-1 ring-current' 
                          : 'bg-porch-50 text-porch-600 hover:bg-porch-100'
                      }`}
                    >
                      {cuisine}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-porch-500 mb-4">
        Showing {filteredRestaurants.length} of {restaurants.length} places
      </p>

      {/* Restaurant Grid */}
      {Object.keys(groupedByNeighborhood).length === 0 ? (
        <div className="text-center py-16">
          <p className="text-porch-600 text-lg">No places match your filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedNeighborhood(null);
              setSelectedCuisine(null);
            }}
            className="mt-4 porch-btn-secondary"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByNeighborhood).map(([neighborhood, places]) => {
            const colors = NEIGHBORHOOD_COLORS[neighborhood] || NEIGHBORHOOD_COLORS['Summerville Area'];
            return (
              <section key={neighborhood}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`w-3 h-3 rounded-full ${colors.bg} ${colors.border} border-2`} />
                  <h2 className="font-serif text-xl font-semibold text-porch-800">{neighborhood}</h2>
                  <span className="text-sm text-porch-500">({places.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {places.map(restaurant => (
                    <Link
                      key={restaurant.id}
                      to={`/spot/${restaurant.id}`}
                      className="veranda-card p-4 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-porch-800 group-hover:text-oak-700 transition-colors line-clamp-1">
                          {restaurant.name}
                        </h3>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${colors.bg} ${colors.text}`}>
                          {PRICE_LEVEL_MAP[restaurant.priceLevel || ''] || '$$'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-porch-500 mb-2 line-clamp-1">
                        {restaurant.cuisine.join(', ')}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          {restaurant.rating && (
                            <span className="flex items-center text-pine-700">
                              <Star className="w-3 h-3 mr-0.5 fill-current" />
                              {restaurant.rating}
                            </span>
                          )}
                        </div>
                        <span className="flex items-center text-porch-400">
                          <MapPin className="w-3 h-3 mr-0.5" />
                          View
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
