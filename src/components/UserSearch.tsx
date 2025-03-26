'use client';

import { SearchResultUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState('')
  const { data: users, isLoading, error } = useSWR<SearchResultUser[]>(`/api/search/${keyword}`)
  function onSubmit (e: FormEvent) {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" autoFocus placeholder="Search users by username or name" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
      {error && <p>something is wrong - error</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p> }
      {<ul>{
        users?.map((user) => <li key={user.username}>
        <UserCard user={user} />
      </li>)
        }</ul>}
    </>
  )
};