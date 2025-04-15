type ButtonProps = {
  text: string;
  onClick: () => void;
  red?: boolean
  disabled?: boolean
}

export default function Button({text, onClick, red, disabled=false}: ButtonProps) {
  return (
    <button className={`border-none rounded-md py-2 px-8 font-bold leading-4 text-white ${red ? 'bg-red-400' : 'bg-blue-400'} ${disabled && 'opacity-70'}`} onClick={() => onClick()}>
      {text}
    </button>
  )
};