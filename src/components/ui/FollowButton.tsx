'use client';

import { ProfileUser } from '@/model/user';
import Button from './Button';
import useMe from '@/hooks/me';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

type FollowButtonProps = {
  user: ProfileUser;
};

export default function FollowButton({
  user: userToFollow,
}: FollowButtonProps) {
  const { username } = userToFollow;
  const { data: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isUpdating = isPending || isFetching;
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    !!loggedInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? 'Unfollow' : 'Follow';

  const handleClickFollow = async () => {
    setIsFetching(true);
    await toggleFollow(userToFollow.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && <div className='absolute inset-0 z-10 flex justify-center items-center'><PulseLoader size={6} /></div>}
          <Button
            text={buttonText}
            onClick={handleClickFollow}
            red={isFollowing}
            disabled={isUpdating}
          />
        </div>
      )}
    </>
  );
}
