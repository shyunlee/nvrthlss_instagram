import { SearchResultUser } from "@/model/user"
import Link from "next/link"
import Avatar from "./Avatar"

type UserCardProps = {
  user: SearchResultUser
}

export default function UserCard({user: {name, username, image, following, followers}}: UserCardProps) {
  return (
    <Link className='w-full flex items-center rounded-md border border-neutral-300 mb-2 p-2 bg-white hover:bg-neutral-50' href={`user/${username}`}>
      <Avatar image={image} />
      <div className='text-neutral-500 ml-2'>
        <p className='text-black font-bold leading-4'>{username}</p>
        <p>{name}</p>
        <p className='text-sm leading-4'>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  )
};