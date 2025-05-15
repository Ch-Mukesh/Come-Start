import { auth } from '@/auth';
import React from 'react'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const page = async({params}: {params: {id: string}}) => {
    const {id} = params;
    const session = await auth();

    // Fetch author using the ID from the URL params
    const author = await client.fetch(`*[_type == "author" && _id == $id][0]`, {id});

    if(!author) return notFound();

    // Fetch startups created by this author
    const startups = await client.fetch(`
        *[_type == "startup" && author._ref == $id] {
            _id,
            title,
            slug,
            image,
            description,
            category,
            views
        }
    `, {id});
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black-900 to-black pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-2xl rounded-2xl p-8 border border-gray-800/70 shadow-2xl mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/path/to/your/background-image.jpg')] opacity-10"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                            {author.image ? (
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                    <img
                                        src={author.image}
                                        alt={author.name || 'Author'}
                                        className="relative w-32 h-32 rounded-full ring-4 ring-purple-500/50 object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                    <div className="relative w-32 h-32 rounded-full ring-4 ring-purple-500/50 bg-gray-800 flex items-center justify-center text-5xl font-bold text-purple-400 select-none">
                                        {author.name ? author.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                </div>
                            )}
                            <div className="text-center sm:text-left">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{author.name}</h1>
                                {author.username && (
                                    <p className="text-purple-400 mt-2 text-lg">@{author.username}</p>
                                )}
                            </div>
                        </div>
                        {author.bio && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
                                <p className="text-gray-300 leading-relaxed">{author.bio}</p>
                            </div>
                        )}
                        {author.email && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                                <p className="text-gray-300 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {author.email}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-16">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">Startups</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {startups.map((startup: any) => (
                            <Link 
                                href={`/startup/${startup.slug.current}`} 
                                key={startup._id}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-2xl rounded-2xl overflow-hidden border border-gray-800/70 transition-all duration-300 hover:border-purple-500/70 hover:shadow-xl hover:shadow-purple-500/20">
                                    {startup.image && (
                                        <div className="relative h-56 w-full">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                            <img
                                                src={startup.image}
                                                alt={startup.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                            {startup.title}
                                        </h3>
                                        {startup.category && (
                                            <span className="inline-block px-4 py-1.5 text-sm bg-purple-500/20 text-purple-300 rounded-full mb-4">
                                                {startup.category}
                                            </span>
                                        )}
                                        {startup.description && (
                                            <p className="text-gray-400 line-clamp-2 leading-relaxed">
                                                {startup.description}
                                            </p>
                                        )}
                                        <div className="mt-6 flex items-center text-gray-500">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span className="text-sm">
                                                {startup.views || 0} views
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;