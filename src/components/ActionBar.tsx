import { parseDate } from '@/util/date';
import { BookmarkIcon, HeartFilledIcon, HeartIcon, BookmarkFillIcon } from './ui/icons';
import ToggleButton from './ui/ToggleButton';
import { useState } from 'react';

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
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);


  return (
    <>
      <div className='flex justify-between py-2 px-4'>
        <ToggleButton toggled={liked} onToggle={setLiked} onIcon={<HeartFilledIcon />} offIcon={<HeartIcon />} />
        <ToggleButton toggled={bookmarked} onToggle={setBookmarked} onIcon={<BookmarkFillIcon />} offIcon={<BookmarkIcon />} />
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
