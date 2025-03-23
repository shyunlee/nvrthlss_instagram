import { parseDate } from '@/util/date';
import { BookmarkIcon, HeartIcon } from './ui/icons';

type ActionBarProps = {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
};
export default function ActionBar({
  likes,
  username,
  text,
  createdAt,
}: ActionBarProps) {
  return (
    <>
      <div className='flex justify-between py-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className='py-1 px-4'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {text && (
          <p>
            <span className='font-bold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
