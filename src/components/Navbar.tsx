'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, HomeFillIcon, AddNewIcon, AddNewFillIcon, SearchIcon, SearchFillIcon } from './ui/icons/index';
const menu = [
  {href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon />},
  {href: '/new', icon: <AddNewIcon />, clickedIcon: <AddNewFillIcon />},
  {href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon />},
]

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div>
      <Link href='/'>
        Seanstagram
      </Link>
      <ul>
        {
          menu.map((item) => <li key={item.href}>
            <Link href={item.href}>
              {pathName === item.href ? item.clickedIcon : item.icon }
            </Link>
          </li>)
        }
      </ul>
    </div>
  )
};