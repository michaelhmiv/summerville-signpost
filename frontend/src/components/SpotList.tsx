import { useState, useMemo } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import type { Spot } from '../types';
import { NEIGHBORHOODS, DAYS } from '../types';
import SpotCard from './SpotCard';

interface SpotListProps {
  spots: Spot[];
}

export default function SpotList({ spots }: SpotListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const matchesSearch = 
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesNeighborhood = 
        selectedNeighborhood === 'all' || spot.neighborhood === selectedNeighborhood;
      
      const matchesDay = 
        selectedDay === 'all' || 
        spot.happyHour.days.toLowerCase().includes(selectedDay.toLowerCase().slice(0, 3)) ||
        spot.happyHour.days === 'Daily';

      return matchesSearch && matchesNeighborhood && matchesDay;
    });
  }, [spots, searchQuery, selectedNeighborhood, selectedDay]);

  const spotsByNeighborhood = useMemo(() => {
    const grouped: Record<string, Spot[]> = {};
    filteredSpots.forEach((spot) => {
      if (!grouped[spot.neighborhood]) {
        grouped[spot.neighborhood] = [];
      }
      grouped[spot.neighborhood].push(spot);
    });
    return grouped;
  }, [filteredSpots]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-cream rounded-xl border-2 border-butter p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search spots, cuisine, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-warm-white border-2 border-butter rounded-lg text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-mint-dark transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center text-sm font-medium text-charcoal mb-2">
              <MapPin className="w-4 h-4 mr-1 text-rose" />
              Neighborhood
            </label>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full px-3 py-2 bg-warm-white border-2 border-butter rounded-lg text-charcoal focus:outline-none focus:border-mint-dark"
            >
              <option value="all">All Neighborhoods</option>
              {NEIGHBORHOODS.map((hood) => (
                <option key={hood} value={hood}>{hood}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="flex items-center text-sm font-medium text-charcoal mb-2">
              <Filter className="w-4 h-4 mr-1 text-sage-dark" />
              Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 bg-warm-white border-2 border-butter rounded-lg text-charcoal focus:outline-none focus:border-mint-dark"
            >
              <option value="all">Any Day</option>
              {DAYS.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-charcoal/60">
          Showing <span className="font-medium text-charcoal">{filteredSpots.length}</span> happy hour spots
        </p>
      </div>

      {/* Spots Grid */}
      {selectedNeighborhood === 'all' ? (
        // Grouped by neighborhood
        Object.entries(spotsByNeighborhood).map(([neighborhood, neighborhoodSpots]) => (
          <div key={neighborhood} className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-charcoal flex items-center">
              <span className="w-3 h-3 bg-mint rounded-full mr-2" />
              {neighborhood}
              <span className="ml-2 text-sm font-sans font-normal text-charcoal/50">
                ({neighborhoodSpots.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhoodSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Flat grid when neighborhood is selected
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredSpots.length === 0 && (
        <div className="text-center py-12 bg-cream rounded-xl border-2 border-butter">
          <p className="text-charcoal/60 text-lg">No spots found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedNeighborhood('all');
              setSelectedDay('all');
            }}
            className="mt-4 px-4 py-2 bg-mint text-charcoal rounded-lg hover:bg-mint-dark transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}