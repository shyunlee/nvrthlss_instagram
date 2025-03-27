'use client';

import { SearchResultUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/useDebounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState('')
  const debouncedValue = useDebounce(keyword)
  const { data: users, isLoading, error } = useSWR<SearchResultUser[]>(`/api/search/${debouncedValue}`)
  function onSubmit (e: FormEvent) {
    e.preventDefault();
  }
  return (
    <section className='w-full max-w-2xl p-4 flex flex-col items-center'>
      <form className='w-full mb-4' onSubmit={onSubmit}>
        <input className='w-full text-lg p-2 rounded-sm outline-none border border-gray-300' type="text" autoFocus placeholder="Search users by username or name" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
      {error && <p>something is wrong - error</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p> }
      {<ul className='w-full p-4'>{
        users?.map((user) => <li key={user.username}>
        <UserCard user={user} />
      </li>)
        }</ul>}
    </section>
  )
};