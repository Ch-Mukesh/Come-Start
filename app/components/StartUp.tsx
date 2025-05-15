import React from 'react';
import StartUpCard from './StartUpCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUP_QUERY } from '@/sanity/lib/queries';
import { STARTUP_QUERYResult } from '@/sanity/types';

const StartUp = async ({ query }: { query: string }) => {
  const { data: posts } = await sanityFetch({
    query: STARTUP_QUERY,
    params: {search: query || null},
  });

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black animate-pulse"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000,#1a1a1a,#000000)] opacity-50"></div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 border border-gray-800/30 bg-black/80 p-8 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-gray-900/50 before:to-black/50 before:-z-10 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-r after:from-transparent after:via-gray-900/10 after:to-transparent after:-z-10 hover:shadow-black/60 transition-all duration-500">
          <div className="relative">
            <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 tracking-tight hover:from-white hover:via-gray-200 hover:to-gray-300 transition-all duration-500">
              {query ? `Search results for "${query}"` : "Featured Startup's"}
            </h2>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-gray-800/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-gray-800/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-900/10 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr relative">
            {posts && posts.length > 0 ? (
              posts.map((post: STARTUP_QUERYResult[number]) => (
                <StartUpCard key={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-xl font-medium tracking-wide hover:text-gray-400 transition-colors duration-300">
                  {query ? "No startups found matching your search." : "No startups available at the moment."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <SanityLive />
    </div>
  );
};

export default StartUp;