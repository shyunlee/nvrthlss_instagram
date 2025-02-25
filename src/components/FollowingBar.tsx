'use client';

import useSWR from "swr";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR('/api/me')
  return (
    <p>
      FollowingBar
    </p>
  )
};