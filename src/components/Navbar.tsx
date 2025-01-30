'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, HomeFillIcon, AddNewIcon, AddNewFillIcon, SearchIcon, SearchFillIcon } from './ui/icons/index';
import ColorButton from "./ui/ColorButton";
const menu = [
  {href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon />},
  {href: '/new', icon: <AddNewIcon />, clickedIcon: <AddNewFillIcon />},
  {href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon />},
]

export default function Navbar() {
  const pathName = usePathname();

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
        <ColorButton text={'Sign In'} onClick={() => {}}/>
      </ul>
    </div>
  )
};