'use client';

import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentBar from './CommentBar';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

type PostListCardProps = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostListCard({ post, priority=false }: PostListCardProps) {
  const { username, userImage, image, text, likes, comments, createdAt } = post;
  const [openModal, setOpenModal] = useState(false)
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
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar likes={likes} username={username} text={text} createdAt={createdAt} />
      <CommentBar />
      {openModal && <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post}/>
          </PostModal>
        </ModalPortal>}
    </article>
  );
}
