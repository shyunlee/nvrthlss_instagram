import { DetailUser } from "@/model/user";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr"

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({id: postId, bookmark})
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({id: targetId, follow})
  }).then((res) => res.json());
}

export default function useMe() {
  const {data: user, isLoading, error, mutate} = useSWR<DetailUser>('/api/me');

  const { mutate: globalMutate } = useSWRConfig();
  const setBookmark = useCallback((postId: string, bookmark: boolean) => {
    if (!user) return;
    const bookmarks = user.bookmarks;
    const newUser = {...user, bookmarks: bookmark ? [...bookmarks, postId] : bookmarks.filter(item => item !== postId)}

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    }).then(() => globalMutate(`/api/user/${user.username}/saved`))
  }, [user, mutate])

  const toggleFollow = useCallback((targetId: string, follow: boolean) => {
    return mutate(updateFollow(targetId, follow), {
      populateCache: false,
    })
  }, [mutate])

  return {data: user, isLoading, error, setBookmark, toggleFollow}
}