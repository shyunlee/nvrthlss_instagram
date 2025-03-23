'use client';

import { DetailUser } from '@/model/user';
import useSWR from 'swr';
import { PropagateLoader } from 'react-spinners';
import Link from 'next/link';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR<DetailUser>('/api/me');
  const followingUsers = data?.following;

  return (
    <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
      {isLoading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!followingUsers || followingUsers.length === 0) && (
          <p>No users you are following</p>
        )
      )}
      {followingUsers && followingUsers.length > 0 && (
        // <div>
        <ScrollableBar>
          {followingUsers.map(({ username, image }) => (
            <Link
              key={username}
              className='flex flex-col items-center w-20'
              href={'/user/username'}
            >
              <Avatar image={image} highlight />
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
        // </div>
      )}
    </section>
  );
}
