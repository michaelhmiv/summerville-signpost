import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, List, Heart, User, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Explore', icon: Map },
    { path: '/list', label: 'All Places', icon: List },
    { path: '/community', label: 'Community', icon: Heart },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-porch-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-oak-500 to-oak-700 flex items-center justify-center shadow-porch group-hover:shadow-porch-lg transition-shadow">
              <Map className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-porch-800 leading-tight">
                Signpost
              </h1>
              <p className="text-[10px] text-porch-500 -mt-0.5 tracking-wide uppercase">Summerville</p>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-1.5 px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200
                    ${active 
                      ? 'bg-oak-50 text-oak-700' 
                      : 'text-porch-600 hover:text-oak-700 hover:bg-porch-50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-oak-600' : 'text-porch-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button className="p-2 rounded-pill text-porch-500 hover:text-oak-700 hover:bg-porch-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* User Button */}
            <button className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-pill bg-porch-100 text-porch-700 hover:bg-porch-200 transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-pill text-porch-600 hover:text-oak-700 hover:bg-porch-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-porch-100">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${active 
                        ? 'bg-oak-50 text-oak-700' 
                        : 'text-porch-600 hover:bg-porch-50'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-oak-600' : 'text-porch-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-porch-100 mt-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-porch-600 hover:bg-porch-50 transition-colors">
                  <User className="w-5 h-5 text-porch-400" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
