'use client';

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import { BookmarkIcon, HeartIcon, PostIcon } from "./ui/icons";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type UserProfileProps = {
  user: ProfileUser;
};

const tabs = [
  {type: 'posts', icon: <PostIcon />},
  {type: 'saved', icon: <BookmarkIcon className={'w-3 h-3'} />},
  {type: 'likes', icon: <HeartIcon className={'w-3 h-3'} />}
]
export default function UserPosts({user: {username}}: UserProfileProps) {
  const [tab, setTab] = useState(tabs[0].type)
  console.log('111')
  return (
    <section>
      <ul className='flex justify-center uppercase'>
        {tabs.map(({type, icon}) => (<li className={`mx-12 p-4 cursor-pointer border-black ${type === tab && 'font-bold border-t'}`} key={type} onClick={() => setTab(type)}>
          <button className='scale-150 md:scale-120'>{icon}</button>
          <span className='hidden md:inline ml-2'>{type}</span>
        </li>))}
      </ul>
      <CacheKeysContext.Provider value={{postsKey: `/api/user/${username}/${tab}`}}>
        <PostGrid />
      </CacheKeysContext.Provider>  
    </section>
  )
};