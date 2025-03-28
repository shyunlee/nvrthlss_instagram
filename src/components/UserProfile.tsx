import { ProfileUser } from "@/model/user"
import Avatar from "./Avatar";
import FollowButton from "./ui/FollowButton";

type UserProfileProps = {
  user: ProfileUser;
}

export default function UserProfile({user}: UserProfileProps) {
  const {image, username, name, following, followers, posts} = user

  const info = [
    {title: 'posts', data: posts},
    {title: 'followers', data: followers},
    {title: 'following', data: following}
  ]

  return (
    <section>
      <Avatar image={image} highlight/>
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>{info.map(({title, data}, index) => (<li key={index}>{`${title} ${data}`}</li>))}</ul>
      </div>
    </section>
  )
};