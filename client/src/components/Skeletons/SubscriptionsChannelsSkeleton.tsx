const SubscriptionsChannelsSkeleton = () => {
  return (
    <div className="">
      <h4 className="font-semibold text-lg flex items-center gap-2 mt-4">
        Your subscriptions{" "}
      </h4>
      <div className="flex items-center gap-2 mt-4">
        {[...new Array(5)].map((_, i) => (
          <div
            key={i}
            className=" w-[55px] h-[55px] bg-[#343434] rounded-full animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsChannelsSkeleton;
