import { parseDate } from '@/util/date';
import {
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
  BookmarkFillIcon,
} from './ui/icons';
import ToggleButton from './ui/ToggleButton';
import { SimplePost } from '@/model/post';
import usePosts from '@/hooks/post';
import useMe from '@/hooks/me';

type ActionBarProps = {
  post: SimplePost;
  children?: React.ReactNode;
};
export default function ActionBar({ post, children }: ActionBarProps) {
  const { id, likes, username, text, createdAt } = post;
  const { data: user, setBookmark } = useMe();
  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(id) : false;

  const { setLike } = usePosts();
  const toggleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  const toggleBookmark = (bookmark: boolean) => {
    if (user) {
      setBookmark(id, bookmark);
    }
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
          onToggle={toggleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='py-1 px-4'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {children}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
