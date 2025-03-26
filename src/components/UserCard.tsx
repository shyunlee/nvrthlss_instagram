import { SearchResultUser } from "@/model/user"
import Link from "next/link"
import Avatar from "./Avatar"

type UserCardProps = {
  user: SearchResultUser
}

export default function UserCard({user: {name, username, image, following, followers}}: UserCardProps) {
  return (
    <Link href={`user/${username}`}>
      <Avatar image={image} />
      <div>
        <p>{username}</p>
        <p>{name}</p>
        <p>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  )
};