import dynamic from "next/dynamic";

type SpinnerProps = {
  color?: string;
}

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
)

export default function GridSpinner({color = 'red'}: SpinnerProps) {
  return <GridLoader color={color}/>
};