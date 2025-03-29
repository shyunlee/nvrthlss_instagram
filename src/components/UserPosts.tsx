'use client';

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";

type UserProfileProps = {
  user: ProfileUser;
};


export default function UserPosts({user: {username}}: UserProfileProps) {
  const [tab, setTab] = useState('posts')
  const {data, isLoading, error} = useSWR(`/api/user/${username}/${tab}`)

  return (
    <>
    
    </>
  )
};