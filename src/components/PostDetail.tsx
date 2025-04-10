import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import Avatar from './Avatar';
import CommentBar from './CommentBar';
import ActionBar from './ActionBar';
import useFullPost from '@/hooks/post';
import useMe from '@/hooks/me';

type PostDetailProps = {
  post: SimplePost;
};

export default function PostDetail({ post }: PostDetailProps) {
  const { id, username, userImage, image, likes, createdAt } = post;
  const { data, postComment } = useFullPost(id);
  const { data: user } = useMe();
  const comments = data ? data.comments : [];
  const handlePostComment = (comment: string) => {
    user && postComment({comment, username: user.username, userImage: user.image})
  }

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
        <ActionBar post={post} />
        <CommentBar onPostComment={handlePostComment}/>
      </div>
    </section>
  );
}
