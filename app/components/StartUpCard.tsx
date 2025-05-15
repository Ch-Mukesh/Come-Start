import React from 'react';
import Image from 'next/image';
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { STARTUP_QUERYResult } from '@/sanity/types';

const StartUpCard = ({ post }: { post: STARTUP_QUERYResult[number] }) => {
    const imageUrl = post.image || '/images/placeholder.svg';

    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-lg 
            shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ease-in-out
            hover:bg-gradient-to-br hover:from-gray-800 hover:via-black hover:to-gray-800
            hover:scale-[1.02] hover:-translate-y-1
            group border border-gray-700/50 hover:border-gray-400/80 transition-all duration-500 relative
            after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:transition-opacity after:duration-500
            after:bg-gradient-to-r after:from-gray-400/5 after:via-gray-300/5 after:to-gray-400/5 after:opacity-0
            hover:after:opacity-100 flex h-[220px] sm:h-[220px] relative">
            <div className="relative w-1/3 min-w-[120px] sm:min-w-[180px] h-full">
                <Link href={`/startup/${post._id}`}>
                    <Image
                        src={imageUrl}
                        alt={post.title || 'Startup Image'}
                        fill
                        sizes="(max-width: 412px) 120px, (max-width: 768px) 180px, 33vw"
                        className="object-cover group-hover:opacity-90 transition-opacity duration-500"
                        priority
                    />
                </Link>
            </div>
            <div className="p-3 sm:p-4 text-white group-hover:text-white transition-colors duration-500 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                        <Link href={`/?query=${post.category?.toLowerCase()}`} className="hover:text-white hover:font-semibold transition-all duration-300">{post.category}</Link>
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-500 flex items-center gap-1.5">
                        Views : {post.views}
                        <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4 premium-shimmer-glow" />
                    </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 tracking-tight">
                    <Link href={`/startup/${post._id}`} className="group-hover:text-white hover:text-gray-200 transition-colors duration-500 hover:underline decoration-gray-500/50 underline-offset-4">{post.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed line-clamp-2">
                    <Link href={`/startup/${post._id}`} className="hover:text-white transition-colors duration-300">{post.description}</Link>
                </p>
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-500 flex items-center gap-2">
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-gray-500 transition-colors duration-500">
                                <Image
                                    src={post.author?.image || '/images/default-avatar.png'}
                                    alt={post.author?.name || 'Author'}
                                    fill
                                    sizes="(max-width: 768px) 20px, 24px"
                                    className="object-cover"
                                />
                            </div>
                            <Link href={`/user/${post.author?._id}`} className="hover:text-white transition-colors duration-500 hover:font-semibold">By {post.author?.name}</Link>
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                            {new Date(post._createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <Link 
                        href={`/startup/${post._id}`}
                        className="block w-full mx-auto text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md 
                        hover:from-gray-700 hover:to-gray-800 hover:text-white
                        hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] 
                        active:scale-95
                        transition-all duration-500 ease-in-out
                        shadow-lg border-2 border-gray-600/50 
                        hover:border-gray-400/80 font-medium tracking-wide text-xs sm:text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StartUpCard; 