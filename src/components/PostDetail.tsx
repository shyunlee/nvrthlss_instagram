import { FullPost, SimplePost } from "@/model/post"
import useSWR from "swr";

type PostDetailProps = {
  post: SimplePost
}

export default function PostDetail({post}: PostDetailProps) {
  const { username, userImage, image, likes } = post;
  const {data, isLoading} = useSWR<FullPost>(`api/posts/${post.id}`)
  const comments = data ? data.comments : []

  console.log(comments)

  return (
    <>
    
    </>
  )
};