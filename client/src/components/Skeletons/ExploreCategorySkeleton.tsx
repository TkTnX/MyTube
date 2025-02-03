import VideosListSkeleton from "./VideosListSkeleton";

const ExploreCategorySkeleton = () => {
  return (
    <div className="w-full mt-10">
      <div className="h-12 w-32 bg-[#343434] animate-pulse rounded-2xl" />
      <VideosListSkeleton className="mt-6" />
    </div>
  );
};

export default ExploreCategorySkeleton;
