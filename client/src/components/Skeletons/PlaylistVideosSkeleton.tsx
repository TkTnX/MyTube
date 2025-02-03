import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  count?: number;
};

const PlaylistVideosSkeleton: React.FC<Props> = ({ className, count }) => {
  return (
    <div className={twMerge(" flex flex-col gap-3", className)}>
      {[...new Array(count ?? 5)].map((_, i) => (
        <div
          key={i}
          className=" w-full h-[230px] bg-[#343434] rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default PlaylistVideosSkeleton;
