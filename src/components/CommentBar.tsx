import { SmileIcon } from "./ui/icons";

export default function CommentBar() {
  return (
    <form className='flex border-t items-center px-2 mx-2'>
      <SmileIcon />
      <input
        className='w-full ml-2 p-2 border-none outline-none'
        type='text'
        name='comment'
        placeholder='Add a comment..'
      />
      <button className='font-bold text-sky-400 ml-2' type='submit'>
        Post
      </button>
    </form>
  );
}
