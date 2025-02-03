import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  count?: number;
};

const VideosListSkeleton: React.FC<Props> = ({ className, count }) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        className
      )}
    >
      {[...new Array(count ?? 5)].map((_, i) => (
        <div
          key={i}
          className="max-w-[476px] w-full h-[240px] bg-[#343434] rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default VideosListSkeleton;
