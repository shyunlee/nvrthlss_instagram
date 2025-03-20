type AvatarSize = 'small' | 'medium' | 'large';

type AvatarProps = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: AvatarProps) {
  return (
    <div
      className={getContainerStyle(size, highlight)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`rounded-full object-cover bg-white ${getImageSizeStyle(size)}`}
        alt={'profile image'}
        src={image ?? undefined}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case 'small':
      return 'w-9 h-9'
    case 'medium':
      return  'w-11 h-11'
    case 'large':
      return 'w-[68px] h-[68px]'
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px] p-[0.1rem]'
    case 'medium':
      return  'w-[41px] h-[41px] p-[0.1rem]'
    case 'large':
      return 'w-16 h-16 p-[0.2rem]'
  }
}
