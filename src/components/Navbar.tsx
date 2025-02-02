'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, HomeFillIcon, AddNewIcon, AddNewFillIcon, SearchIcon, SearchFillIcon } from './ui/icons/index';
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
const menu = [
  {href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon />},
  {href: '/new', icon: <AddNewIcon />, clickedIcon: <AddNewFillIcon />},
  {href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon />},
]

export default function Navbar() {
  const pathName = usePathname();
  const {data: session} = useSession();

  return (
    <div className='flex justify-between px-6 py-4 items-center border-b'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>Seanstagram</h1>
      </Link>
      <ul className='flex gap-3 items-center'>
        {
          menu.map((item) => <li key={item.href}>
            <Link href={item.href}>
              {pathName === item.href ? item.clickedIcon : item.icon }
            </Link>
          </li>)
        }
        {
          session ? <ColorButton text={'Sign out'} onClick={() => signOut()}/> : <ColorButton text={'Sign In'} onClick={() => signIn()}/>
        }
        
      </ul>
    </div>
  )
};