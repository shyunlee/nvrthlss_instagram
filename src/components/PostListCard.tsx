import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import { HeartIcon, BookmarkIcon, SmileIcon } from './ui/icons';
import { parseDate } from '@/util/date';

type PostListCardProps = {
  post: SimplePost;
};
export default function PostListCard({ post }: PostListCardProps) {
  const { username, userImage, image, text, likes, comments, createdAt } = post;
  return (
    <article className='rounded-lg shadow-md border border-gray-200'>
      <div className='flex items-center p-2'>
        <Avatar image={userImage} highlight size='medium' />
        <span className='text-gray-900 font-bold ml-2'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className='flex justify-between py-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className='py-1 px-4'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p>
          <span className='font-bold mr-1'>{username}</span>
          {text}
        </p>
        <p className='text-xs text-neutral-500 uppercase my-2'>{parseDate(createdAt)}</p>
        <form className='flex border-t items-center px-2'>
          <SmileIcon/>
          <input className='w-full ml-2 p-2 border-none outline-none' type='text' name='comment' placeholder='Add a comment..' />
          <button className='font-bold text-sky-400 ml-4' type='submit'>Post</button>
        </form>
      </div>
    </article>
  );
}
