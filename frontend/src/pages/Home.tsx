import { MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { spots } from '../data/spots';
import SpotList from '../components/SpotList';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mint via-mint/80 to-cream py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Discover Summerville's Best
            <span className="block text-rose">Happy Hours</span>
          </h1>
          <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Your local guide to the best deals, hidden gems, and neighborhood favorites 
            in Summerville, South Carolina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/map"
              className="inline-flex items-center justify-center px-6 py-3 bg-rose text-white rounded-lg font-medium hover:bg-rose-dark transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Map
            </Link>
            <a
              href="#spots"
              className="inline-flex items-center justify-center px-6 py-3 bg-cream text-charcoal border-2 border-butter rounded-lg font-medium hover:bg-butter transition-colors"
            >
              <Clock className="w-5 h-5 mr-2" />
              Browse Deals
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-warm-white border-b-2 border-butter">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-cream rounded-lg">
              <p className="text-3xl font-serif font-bold text-rose">{spots.length}</p>
              <p className="text-sm text-charcoal/60">Happy Hour Spots</p>
            </div>
            <div className="text-center p-4 bg-cream rounded-lg">
              <p className="text-3xl font-serif font-bold text-mint-dark">4</p>
              <p className="text-sm text-charcoal/60">Neighborhoods</p>
            </div>
            <div className="text-center p-4 bg-cream rounded-lg">
              <p className="text-3xl font-serif font-bold text-sage-dark">Daily</p>
              <p className="text-sm text-charcoal/60">Updates Coming</p>
            </div>
            <div className="text-center p-4 bg-cream rounded-lg">
              <p className="text-3xl font-serif font-bold text-butter-dark">100%</p>
              <p className="text-sm text-charcoal/60">Local Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spots Section */}
      <section id="spots" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-2">
              Happy Hour Listings
            </h2>
            <p className="text-charcoal/60">
              Find the best deals by neighborhood, day, or cuisine
            </p>
          </div>
          <SpotList spots={spots} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-sage/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-charcoal text-center mb-8">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream p-6 rounded-xl border-2 border-butter">
              <Star className="w-8 h-8 text-rose mb-3" />
              <h3 className="font-serif font-bold text-charcoal mb-2">Community Reviews</h3>
              <p className="text-sm text-charcoal/60">
                Honest reviews from locals who know best. No generic ratings.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-xl border-2 border-butter">
              <Clock className="w-8 h-8 text-mint-dark mb-3" />
              <h3 className="font-serif font-bold text-charcoal mb-2">Real-Time Updates</h3>
              <p className="text-sm text-charcoal/60">
                Business owners can post daily specials and last-minute changes.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-xl border-2 border-butter">
              <MapPin className="w-8 h-8 text-sage-dark mb-3" />
              <h3 className="font-serif font-bold text-charcoal mb-2">AI Recommendations</h3>
              <p className="text-sm text-charcoal/60">
                Ask "Italian tonight" and get personalized suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}