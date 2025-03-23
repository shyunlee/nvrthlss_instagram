import CloseIcon from './ui/icons/CloseIcon';

type PostModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: PostModalProps) {
  return (
    <section
      className='fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-neutral-900/70 z-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button className='fixed top-0 right-0 p-8 text-white' onClick={onClose}>
        <CloseIcon />
      </button>
      <div className='bg-white w-4/5 h-3/5 max-w-7xl'>{children}</div>
    </section>
  );
}
