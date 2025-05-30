type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

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
  const {container: containerSize, image: imageSize} = getImageSizeStyle(size)
  return (
    <div className={getContainerStyle(size, highlight, containerSize)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`rounded-full object-cover bg-white ${imageSize}`}
        alt={'profile image'}
        src={image ?? undefined}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean, containerSize:string): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  return `${baseStyle} ${highlightStyle} ${containerSize}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case 'small':
      return {container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[2px]'}
    case 'medium':
      return {container: 'w-11 h-11', image: 'w-[41px] h-[41px] p-[0.1rem]'}
    case 'large':
      return {container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]'}
      case 'xlarge':
        return {container: 'w-[142px] h-[142px]', image: 'w-[138px] h-[138px] p-[0.3rem]'}
    default:
      throw new Error(`Unsupported tyupe size ${size}`);
  }
}