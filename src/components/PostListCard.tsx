'use client';

import { Comment, SimplePost } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hooks/posts';

type PostListCardProps = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostListCard({
  post,
  priority = false,
}: PostListCardProps) {
  const { username, userImage, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment.comment)
  }

  return (
    <article className='rounded-lg shadow-md border border-gray-200'>
      <PostUserAvatar username={username} userImage={userImage} />
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onPostComment={handlePostComment}>
        <p>
          <span className='font-bold mr-1'>{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className='font-bold text-sm my-1 text-sky-500'
            onClick={() => setOpenModal(true)}
          >
            {`View all ${comments} comments`}
          </button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
