'use client';

import { DetailUser } from "@/model/user";
import useSWR from "swr";
import { PropagateLoader } from 'react-spinners';
import Link from "next/link";
import Avatar from "./Avatar";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR<DetailUser>('/api/me');
  const followingUsers = data?.following;

  return (
    <section>
      {isLoading ? <PropagateLoader size={8} color="red" /> : 
        (!followingUsers || followingUsers.length === 0) && <p>No users you are following</p>
      }
      {followingUsers && followingUsers.length > 0 && <ul>
          {followingUsers.map(({username, image}) => <li key={username}>
            <Link href={'/user/username'}>
              <Avatar image={image} highlight />
              <p>{username}</p>
            </Link>
          </li>)}
        </ul>}
    </section>
  )
};