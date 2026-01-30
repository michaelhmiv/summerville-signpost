import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-mint border-b-4 border-mint-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-cream p-2 rounded-full border-2 border-rose">
              <MapPin className="w-6 h-6 text-rose" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-charcoal">
                Summerville
              </h1>
              <p className="text-xs text-charcoal/70 -mt-1">Signpost</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-charcoal hover:bg-mint-dark transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Home</span>
            </Link>
            <Link
              to="/map"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-charcoal hover:bg-mint-dark transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Map</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}