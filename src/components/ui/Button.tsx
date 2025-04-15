type ButtonProps = {
  text: string;
  onClick: () => void;
  red?: boolean
}

export default function Button({text, onClick, red}: ButtonProps) {
  return (
    <button className={`border-none rounded-md py-2 px-8 font-bold leading-4 text-white ${red ? 'bg-red-400' : 'bg-blue-400'}`} onClick={() => onClick()}>
      {text}
    </button>
  )
};