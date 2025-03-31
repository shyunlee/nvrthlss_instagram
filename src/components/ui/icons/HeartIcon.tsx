import { AiOutlineHeart } from 'react-icons/ai';

export default function HeartIcon({ className }: { className?: string}) {
  return <AiOutlineHeart className={className || 'w-7 h-7'} />;
}
