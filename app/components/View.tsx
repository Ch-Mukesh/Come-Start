import { writeClient } from '@/sanity/lib/write-client';
import { client } from '@/sanity/lib/client';
import { EyeIcon } from '@heroicons/react/24/outline';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { after } from 'next/server';

interface ViewProps {
  postId: string;
  initialViews: number;
}

const View = async ({ postId, initialViews }: ViewProps) => {
  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id: postId });
  
  const totalViews = result?.views ?? initialViews;

  after(async () => {
    await writeClient.patch(postId).set({views: totalViews+1}).commit();
  })

  return (
    <p className="text-gray-400 flex items-center gap-2">
      Views : 
      &nbsp;&nbsp;
      <span 
        className={`
          inline-block
          transition-all 
          duration-500 
          ease-in-out 
          transform 
          hover:scale-110 
          text-blue-400
          hover:text-blue-500
          font-medium
          premium-shimmer-glow
        `}
      >
        {totalViews.toLocaleString()}
      </span>
      <EyeIcon className="w-5 h-5 text-blue-400 premium-shimmer-glow" />
    </p>
  );
};

export default View;
