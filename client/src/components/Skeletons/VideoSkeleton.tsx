import SmallVideosSkeleton from "./SmallVideosSkeleton";

const VideoSkeleton = () => {
  return (
    <div className="w-full h-full mt-6 flex items-start flex-col xl:flex-row gap-4  2xl:gap-8">
      {/* PLAYER */}
      <div className="w-full xl:w-4/6 2xl:w-3/4">
        {/* VIDEO */}

        <div className="w-full relative pt-[56.25%] rounded-2xl overflow-hidden bg-[#343434] animate-pulse " />

        <div className="h-7 w-28 bg-[#343434] animate-pulse mt-5 rounded-2xl" />

        <div className="mt-5 flex  flex-wrap 2xl:flex-nowrap flex-col-reverse lg:flex-row items-start lg:items-center  gap-4 lg:gap-2">
          <div className="flex  items-center gap-2 md:gap-5 w-full justify-between vsm:w-fit vsm:justify-normal">
            <div className="flex items-center gap-1 md:gap-4 h-12 w-40 bg-[#343434] animate-pulse rounded-2xl" />

            <div className="h-12 w-28 bg-[#343434] animate-pulse rounded-2xl" />
          </div>
          <div className="h-10 w-36 bg-[#343434] animate-pulse rounded-2xl" />
        </div>
        {/* video description */}
        <div className="w-full h-16 bg-[#343434] animate-pulse mt-5 rounded-2xl" />

        {/* comments */}
      </div>
      {/* OTHER VIDEOS */}
      <SmallVideosSkeleton className="xl:w-1/4" />
    </div>
  );
};

export default VideoSkeleton;
