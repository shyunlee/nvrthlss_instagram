import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import Avatar from './Avatar';
import CommentBar from './CommentBar';
import ActionBar from './ActionBar';

type PostDetailProps = {
  post: SimplePost;
};

export default function PostDetail({ post }: PostDetailProps) {
  const { id, username, userImage, image, likes, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data ? data.comments : [];

  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          fill
          priority
          sizes='650px'
        />
      </div>
      <div className='flex flex-col basis-2/5 w-full'>
        <PostUserAvatar username={username} userImage={userImage} />
        <ul className='border-t border-gray-200 h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ comment, userImage, username: commentUsername }, index) => (
                <li className='flex items-center mb-1' key={index}>
                  <Avatar
                    image={userImage}
                    size='small'
                    highlight={commentUsername === username}
                  />
                  <div className='ml-2'>
                    <span className='font-bold mr-1'>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentBar />
      </div>
    </section>
  );
}
