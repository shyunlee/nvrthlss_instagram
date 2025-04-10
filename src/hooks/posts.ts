import { SimplePost } from "@/model/post";
import useSWR from "swr"

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({id, like})
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({id, comment})
  }).then((res) => res.json());
}

export default function usePosts() {
  const {data: posts, isLoading, error, mutate} = useSWR<SimplePost[]>('/api/posts');
  
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {...post, likes: like ? [...post.likes, username] : post.likes.filter(user => user !== username)}
    const updatedPostList = posts?.map(p => p.id === post.id ? newPost : p)

    return mutate(updateLike(post.id, like), {
      optimisticData: updatedPostList,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }

  const postComment = (post: SimplePost, comment: string) => {
    const newPost = {...post, comments: post.comments + 1}
    const updatedPostList = posts?.map(p => p.id === post.id ? newPost : p)

    return mutate(addComment(post.id, comment), {
      optimisticData: updatedPostList,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }

  return {data: posts, isLoading, error, setLike, postComment}
}