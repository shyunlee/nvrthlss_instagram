import { User } from "@/model/user"
import Avatar from "./Avatar";

type SideBarProps = {
  user: User;
}

export default function SideBar({user: {username, name, image}}: SideBarProps) {
  return (
    <div className='flex items-center'>
      {image && <Avatar image={image}/>}
      <div className='flex flex-col ml-4'>
        <p className='text-lg font-bold text-neutral-700'>{username}</p>
        <p className='text-neutral-500 text-sm leading-4'>{name}</p>
      </div>
    </div>
  )
};