import { SimplePost } from '@/model/post';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import Avatar from './Avatar';
import ActionBar from './ActionBar';
import useFullPost from '@/hooks/post';

type PostDetailProps = {
  post: SimplePost;
};

export default function PostDetail({ post }: PostDetailProps) {
  const { id, username, userImage, image } = post;
  const { data, postComment } = useFullPost(id);
  const comments = data ? data.comments : [];

  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5 flex-shrink-0'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          fill
          priority
          sizes='650px'
        />
      </div>
      <div className='flex flex-col basis-2/5 w-full overflow-hidden pr-4'>
        <PostUserAvatar username={username} userImage={userImage} />
        <ul className='border-t border-gray-200 h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ comment, userImage, username: commentUsername }, index) => (
                <li className='flex mb-1' key={index}>
                  <div>
                    <Avatar
                      image={userImage}
                      size='small'
                      highlight={commentUsername === username}
                    />
                  </div>
                  <div className='ml-2 mt-1 w-full overflow-hidden'>
                    <span className='font-bold mr-1'>{commentUsername}</span>
                    <span className='break-words'>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onPostComment={postComment} />
      </div>
    </section>
  );
}
