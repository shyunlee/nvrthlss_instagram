import { ProfileUser } from "@/model/user"

type UserProfileProps = {
  user: ProfileUser;
}

export default function UserProfile({user}: UserProfileProps) {

  return (
    <>
      {user.username}
    </>
  )
};