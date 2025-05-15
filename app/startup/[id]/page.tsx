import React, { Suspense } from 'react'
import { STARTUP_DETAIL_QUERY, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import {
  EyeIcon,
  TagIcon,
  UserIcon,
  CalendarIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import View from '@/app/components/View';

const StartUpDetails = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  const [post, editorsChoice] = await Promise.all([client.fetch(STARTUP_DETAIL_QUERY, { id }), client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editors-choice' })]);


  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[60vh] rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title || 'Startup Image'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 backdrop-blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{post.title}</h1>
            <div className="flex items-center gap-4">
              {post.author?.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name || 'Author'}
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-purple-500"
                />
              )}
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-purple-400" />
                  {post.author?.name}
                </p>
                <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                  {format(new Date(post._createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-colors duration-300 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-yellow-400" />
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">{post.description || 'No description available'}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-colors duration-300 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <RocketLaunchIcon className="w-6 h-6 text-blue-400" />
                Pitch
              </h2>
              <div className="prose prose-invert max-w-none">
                {post.pitch ? (
                  <ReactMarkdown>{post.pitch}</ReactMarkdown>
                ) : (
                  'No pitch available'
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-colors duration-300 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TagIcon className="w-6 h-6 text-green-400" />
                Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Category :
                    <span className="font-medium"> {post.category || 'Uncategorized'}</span>
                  </p>
                </div>
                <div>
                  <View postId={post._id} initialViews={post.views || 0} />
                </div>
              </div>
            </div>

            {editorsChoice?.select && editorsChoice.select.length > 0 && (
              <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-colors duration-300 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <StarIcon className="w-6 h-6 text-yellow-400" />
                  Editor's Choice
                </h3>
                <div className="space-y-4">
                  {editorsChoice.select.map((startup: any) => (
                    <Link href={`/startup/${startup._id}`} key={startup._id} className="block">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                        {startup.image && (
                          <Image
                            src={startup.image}
                            alt={startup.title || 'Startup'}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-sm">{startup.title}</p>
                          <p className="text-xs text-gray-400">{startup.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.author && (
              <Link href={`/author/${post.author._id}`} className="block">
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-colors duration-300 shadow-xl cursor-pointer">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <UserIcon className="w-6 h-6 text-purple-400" />
                    About Author
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    {post.author.image && (
                      <Image
                        src={post.author.image}
                        alt={post.author.name || 'Author'}
                        width={60}
                        height={60}
                        className="rounded-full ring-2 ring-purple-500"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{post.author.name}</p>
                      {post.author.bio && (
                        <p className="text-sm text-gray-300">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartUpDetails
