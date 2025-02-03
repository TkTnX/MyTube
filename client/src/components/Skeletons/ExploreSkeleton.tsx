import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  count?: number;
};

const ExploreSkeleton: React.FC<Props> = ({ className, count }) => {
  return (
    <div className={twMerge("mt-10 flex flex-col gap-7", className)}>
      {[...new Array(count ?? 5)].map((_, i) => (
        <div
          key={i}
          className=" w-full h-[440px] bg-[#343434] rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default ExploreSkeleton;
