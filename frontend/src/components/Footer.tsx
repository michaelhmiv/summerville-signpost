import { Link } from 'react-router-dom';
import { Map, Heart, Mail, Instagram, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-porch-100/50 border-t border-porch-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-oak-500 to-oak-700 flex items-center justify-center shadow-porch">
                <Map className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-porch-800">Signpost</span>
            </div>
            <p className="text-porch-600 text-sm leading-relaxed max-w-md mb-4">
              A community-driven guide to Summerville's best places. 
              Discover local gems, share memories, and explore the 
              neighborhoods that make Flowertown special.
            </p>
            <p className="text-xs text-porch-400 italic">
              "Where neighbors become friends, one bite at a time."
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-porch-800 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-porch-600 hover:text-oak-700 transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link to="/list" className="text-sm text-porch-600 hover:text-oak-700 transition-colors">
                  All Places
                </Link>
              </li>
              <li>
                <Link to="/neighborhoods" className="text-sm text-porch-600 hover:text-oak-700 transition-colors">
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-porch-600 hover:text-oak-700 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-serif font-semibold text-porch-800 mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-porch-600 hover:text-oak-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>hello@signpost.summerville</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-porch-600 hover:text-oak-700 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@signpostsc</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-porch-600 hover:text-oak-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Open Source</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-porch-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-porch-500">
              © {currentYear} Signpost. Made with{' '}
              <Heart className="w-3 h-3 inline text-azalea-500" /> for Summerville.
            </p>
            <div className="flex items-center space-x-6 text-sm text-porch-500">
              <Link to="/privacy" className="hover:text-oak-700 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-oak-700 transition-colors">
                Terms
              </Link>
              <Link to="/submit" className="hover:text-oak-700 transition-colors">
                Submit a Place
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
