import GridSpinner from './ui/GridSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hooks/posts';

export default function PostGrid() {
  const {data: posts, isLoading} = usePosts();

  return (
    <div className='w-full text-center'>
      {isLoading && <div className='mt-4'><GridSpinner /></div>}
      <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
