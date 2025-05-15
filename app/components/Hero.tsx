import React from 'react';
import { Search } from 'lucide-react';

const Hero = async ({ searchParams }: { searchParams?: { query?: string } }) => {
  const query = (await searchParams)?.query || '';
  
  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-black min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center py-10 sm:py-20 pt-24 sm:pt-28">
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/85 backdrop-blur-md" aria-hidden="true"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-4  sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:mt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Pitch Your Startup
            <br />
            Connect With Entrepreneurs
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of innovators and investors. Share your vision, get feedback, and make meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <form className="flex gap-2">
                <input
                  type="text"
                  name="query"
                  defaultValue={query}
                  placeholder="Search startups, investors, or topics..."
                  className="w-full px-6 py-3 bg-black/40 backdrop-blur-md text-white rounded-lg font-medium border border-white/10 focus:outline-none focus:border-white/30 placeholder-gray-500 transition-all duration-200 shadow-lg shadow-black/20"
                  aria-label="Search startups"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black/40 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-black/60 transition-all duration-200 border border-white/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg shadow-black/20"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" aria-hidden="true"></div>
    </div>
  );
};

export default Hero; 