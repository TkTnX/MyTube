import { IKImage } from "imagekitio-react";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
}

const Image = ({
  src,
  alt,
  className,
  width = "200",
  height = "200",
}: ImageProps) => {
  return (
    <IKImage
      className={twMerge(className)}
      alt={alt}
      path={src}
      loading="lazy"
      lqip={{
        active: true,
        quality: 20,
      }}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      width={width}
      height={height}
      transformation={[
        {
          width,
          height,
        },
      ]}
    />
  );
};

export default Image;
