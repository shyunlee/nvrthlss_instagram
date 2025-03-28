'use client';

import { DetailUser, ProfileUser } from "@/model/user"
import useSWR from "swr"
import Button from "./Button";

type FollowButtonProps = {
  user: ProfileUser
}

export default function FollowButton({user}: FollowButtonProps) {
  const { username } = user;
  const {data: loggedInUser} = useSWR<DetailUser>('/api/me');
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing = loggedInUser && !!loggedInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? 'Unfollow' : 'Follow'

  return (
    <>
      {showButton && <Button text={buttonText} onClick={() => {}} red={isFollowing}/>}
    </>
  )
};