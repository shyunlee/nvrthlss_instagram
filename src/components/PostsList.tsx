'use client';
import { SimplePost } from '@/model/post';
import { HashLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  console.log(posts);

  return (
    <section>
      {isLoading && (
        <div className='flex justify-center mt-32'>
          <HashLoader color='red' />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className='mb-4'><PostListCard post={post}/></li>
          ))}
        </ul>
      )}
    </section>
  );
}
