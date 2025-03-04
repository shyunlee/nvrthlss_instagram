import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
    // slidesToSlide: 1 // optional, default to 1.
  },
};

export default function ScrollableBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <Carousel
      swipeable={true}
      containerClass='w-full flex gap-2'
      itemClass='mx-1.5 !w-min'
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
