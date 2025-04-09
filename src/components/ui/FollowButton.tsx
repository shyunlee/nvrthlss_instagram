'use client';

import { ProfileUser } from "@/model/user"
import Button from "./Button";
import useMe from "@/hooks/me";

type FollowButtonProps = {
  user: ProfileUser
}

export default function FollowButton({user}: FollowButtonProps) {
  const { username } = user;
  const {data: loggedInUser} = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing = loggedInUser && !!loggedInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? 'Unfollow' : 'Follow'

  return (
    <>
      {showButton && <Button text={buttonText} onClick={() => {}} red={isFollowing}/>}
    </>
  )
};