const ChannelTopSkeleton = () => {
  return (
    <div className="px-6 flex flex-col items-center sm:block">
      <div className="w-40 h-40 rounded-full bg-[#aaa] animate-pulse " />
      <div className="h-6 w-40 rounded-xl bg-[#aaa] animate-pulse mt-5" />
      <div className="flex items-center gap-4 mt-4">
        <div className="h-5 w-20 rounded-xl bg-[#aaa] animate-pulse" />
        <div className="h-5 w-20 rounded-xl bg-[#aaa] animate-pulse" />
      </div>
    </div>
  );
}

export default ChannelTopSkeleton