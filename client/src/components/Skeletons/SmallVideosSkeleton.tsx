import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  count?: number;
};

const SmallVideosSkeleton: React.FC<Props> = ({ className, count }) => {
  return (
    <div className={twMerge(" flex flex-col gap-3", className)}>
      {[...new Array(count ?? 5)].map((_, i) => (
        <div
          key={i}
          className="max-w-[230px] w-full h-[94px] bg-[#343434] rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default SmallVideosSkeleton;
