import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const AvatarLink = ({
  username,
  img,
  className,
  width = "30",
  height = "30",
}: {
  username: string;
  img: string;
  className?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <Link
      to={`/channel/${username}`}
      className={`relative min-w-[${width}px] min-h-[${height}px] z-[2] block`}
    >
      <img
        src={img}
        width={width}
        height={height}
        alt={username}
        className={twMerge(
          `rounded-full object-cover min-w-[${width}px] min-h-[${height}px]`,
          className
        )}
      />
    </Link>
  );
};

export default AvatarLink;
