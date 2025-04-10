import { FormEvent, useState } from "react";
import { SmileIcon } from "./ui/icons";

type CommentBarProps = {
  onPostComment: (comment: string) => void;
}

export default function CommentBar({onPostComment}: CommentBarProps) {
  const [comment, setComment] = useState('')
  const buttonDisabled = comment.length === 0
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment)
    setComment('')
  }

  return (
    <form className='flex border-t items-center px-2 mx-2' onSubmit={handleSubmit}>
      <SmileIcon />
      <input
        className='w-full ml-2 p-2 border-none outline-none'
        type='text'
        name='comment'
        placeholder='Add a comment..'
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={`font-bold ml-2 ${buttonDisabled ? 'text-sky-300' : 'text-sky-500'}`} type='submit' disabled={buttonDisabled}>
        Post
      </button>
    </form>
  );
}
