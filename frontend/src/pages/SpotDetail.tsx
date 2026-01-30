import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Globe, Share2, Heart } from 'lucide-react';
import { getSpotById } from '../data/spots';

export default function SpotDetail() {
  const { id } = useParams<{ id: string }>();
  const spot = id ? getSpotById(id) : undefined;

  if (!spot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
            Spot not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center text-dusty-rose hover:text-dusty-rose-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-charcoal/70 hover:text-charcoal mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to listings
        </Link>

        {/* Header */}
        <div className="bg-cream rounded-2xl border-2 border-butter overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-mint text-charcoal text-sm font-medium rounded-full mb-3">
                  {spot.neighborhood}
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2">
                  {spot.name}
                </h1>
                <p className="text-lg text-charcoal/60">{spot.cuisine}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-warm-white rounded-lg border-2 border-butter hover:border-dusty-rose transition-colors">
                  <Heart className="w-5 h-5 text-dusty-rose" />
                </button>
                <button className="p-2 bg-warm-white rounded-lg border-2 border-butter hover:border-mint-dark transition-colors">
                  <Share2 className="w-5 h-5 text-mint-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Happy Hour Card */}
            <div className="bg-mint/20 rounded-xl border-2 border-mint p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-mint-dark mr-2" />
                <h2 className="text-xl font-serif font-bold text-charcoal">
                  Happy Hour
                </h2>
              </div>
              <p className="text-lg font-medium text-charcoal mb-4">
                {spot.happyHour.days} • {spot.happyHour.hours}
              </p>
              <h3 className="font-medium text-charcoal mb-2">Deals:</h3>
              <ul className="space-y-2">
                {spot.happyHour.deals.map((deal, idx) => (
                  <li key={idx} className="flex items-start text-charcoal/80">
                    <span className="w-2 h-2 bg-dusty-rose rounded-full mt-2 mr-3 flex-shrink-0" />
                    {deal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-cream rounded-xl border-2 border-butter p-6">
              <h2 className="text-lg font-serif font-bold text-charcoal mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {spot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-sage/50 text-charcoal/80 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Location */}
            <div className="bg-cream rounded-xl border-2 border-butter p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-dusty-rose mr-2" />
                <h2 className="text-xl font-serif font-bold text-charcoal">
                  Location
                </h2>
              </div>
              <p className="text-charcoal/80 mb-4">{spot.address}</p>
              <p className="text-sm text-charcoal/60">
                {spot.neighborhood}, Summerville, SC
              </p>
            </div>

            {/* Contact */}
            <div className="bg-cream rounded-xl border-2 border-butter p-6">
              <h2 className="text-lg font-serif font-bold text-charcoal mb-4">
                Contact
              </h2>
              <div className="space-y-3">
                {spot.phone && (
                  <a
                    href={`tel:${spot.phone}`}
                    className="flex items-center text-charcoal/80 hover:text-dusty-rose transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3 text-sage-dark" />
                    {spot.phone}
                  </a>
                )}
                {spot.website && (
                  <a
                    href={spot.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-charcoal/80 hover:text-dusty-rose transition-colors"
                  >
                    <Globe className="w-5 h-5 mr-3 text-sage-dark" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-butter/30 rounded-xl border border-butter p-4">
              <p className="text-xs text-charcoal/60">
                <strong>Note:</strong> Happy hour details are subject to change. 
                We recommend calling ahead to confirm current deals and hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}