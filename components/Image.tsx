import NextImage from "next/legacy/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

export default function Image(props: any) {
  return <NextImage {...props} loader={customLoader} />;
}
