import NextImage from "next/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

export default function Image(props: any) {
  return <NextImage {...props} loader={customLoader} />;
}
