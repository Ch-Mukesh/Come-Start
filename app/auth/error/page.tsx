'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-800/50 animate-fade-in">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4 animate-pulse">
          Authentication Error
        </h1>
        <div className="relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <p className="text-gray-300 mb-6 pl-4">
            {error === 'Configuration' 
              ? 'There was a problem with the authentication configuration. Please make sure all required environment variables are set correctly.'
              : 'An error occurred during authentication. Please try again.'}
          </p>
        </div>
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transform hover:-translate-y-1"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

// Add these styles to your globals.css or create a new style block
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
`; 