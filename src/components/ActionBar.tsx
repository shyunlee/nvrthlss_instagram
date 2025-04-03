import { parseDate } from '@/util/date';
import {
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
  BookmarkFillIcon,
} from './ui/icons';
import ToggleButton from './ui/ToggleButton';
import { useState } from 'react';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

type ActionBarProps = {
  post: SimplePost;
};
export default function ActionBar({ post }: ActionBarProps) {
  const { id, likes, username, text, createdAt } = post
  const {data: session} = useSession();
  const user = session?.user
  // const [liked, setLiked] = useState(user ? likes.includes(user.username) : false);
  const liked = user ? likes.includes(user.username) : false
  const [bookmarked, setBookmarked] = useState(false);
  const { mutate } = useSWRConfig();
  const toggleLike = (like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({id, like})
    }).then(() => mutate('/api/posts'))
  }

  return (
    <>
      <div className='flex justify-between py-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={toggleLike}
          onIcon={<HeartFilledIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
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
