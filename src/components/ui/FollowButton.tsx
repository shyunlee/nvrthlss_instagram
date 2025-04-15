'use client';

import { ProfileUser } from "@/model/user"
import Button from "./Button";
import useMe from "@/hooks/me";

type FollowButtonProps = {
  user: ProfileUser
}

export default function FollowButton({user: userToFollow}: FollowButtonProps) {
  const { username } = userToFollow;
  const {data: loggedInUser, toggleFollow } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing = loggedInUser && !!loggedInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? 'Unfollow' : 'Follow'

  const handleClickFollow = () => {
    toggleFollow(userToFollow.id, !isFollowing)
  }

  return (
    <>
      {showButton && <Button text={buttonText} onClick={handleClickFollow} red={isFollowing}/>}
    </>
  )
};