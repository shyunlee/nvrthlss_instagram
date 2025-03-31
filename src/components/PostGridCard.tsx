import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type PostGridCardProps = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({
  post,
  priority = false,
}: PostGridCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  const handleClickPost = () => {
    if (!session?.user) {
      return signIn();
    }

    setOpenModal(true);
  }

  const { image, username } = post;
  return (
    <div className='relative w-full aspect-square'>
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
        onClick={handleClickPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
