import { Heart, MessageSquare, Users } from 'lucide-react';

export default function Community() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-azalea-100 text-azalea-600 mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-porch-800 mb-4">
          Community Coming Soon
        </h1>
        <p className="text-lg text-porch-600 max-w-2xl mx-auto leading-relaxed">
          We're building a place for Summerville neighbors to share memories, 
          write letters, and preserve the stories that make our town special.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="veranda-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-oak-100 text-oak-600 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-semibold text-porch-800 mb-2">Share Memories</h3>
          <p className="text-sm text-porch-600">
            Tag places and share your stories about what used to be there
          </p>
        </div>

        <div className="veranda-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-pine-100 text-pine-600 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-semibold text-porch-800 mb-2">Letters to Town</h3>
          <p className="text-sm text-porch-600">
            Write and read public letters to the Summerville community
          </p>
        </div>

        <div className="veranda-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-haint-100 text-haint-600 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-semibold text-porch-800 mb-2">Local History</h3>
          <p className="text-sm text-porch-600">
            Discover historical information layered on the map
          </p>
        </div>
      </div>

      <div className="veranda-card p-8 text-center">
        <p className="handwritten text-2xl text-porch-600 mb-4">
          "Every place has a story. What's yours?"
        </p>
        <p className="text-sm text-porch-500">
          Coming this spring. Be the first to know when we launch.
        </p>
      </div>
    </div>
  );
}
