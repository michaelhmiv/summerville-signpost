import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sage border-t-4 border-sage-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-charcoal font-serif font-medium">
              Summerville Signpost
            </p>
            <p className="text-sm text-charcoal/70">
              Your local guide to happy hours, events, and hidden gems
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-charcoal/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose" />
            <span>for Summerville</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-charcoal/10 text-center text-xs text-charcoal/50">
          <p>© 2026 Summerville Signpost. Not affiliated with any businesses listed.</p>
          <p className="mt-1">Happy hour deals subject to change. Call ahead to confirm.</p>
        </div>
      </div>
    </footer>
  );
}