'use client';

import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/posts';

export default function PostList() {
  const { data: posts, isLoading } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className='flex justify-center mt-32'>
          <GridSpinner color='red' />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className='mb-4'><PostListCard post={post} priority={index < 2}/></li>
          ))}
        </ul>
      )}
    </section>
  );
}
