import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import VideoSmall from "../components/ui/VideoSmall";
import { SmallVideosSkeleton } from "../components/Skeletons";

const LikedVideosPage = () => {
  const { user: clerkUser } = useUser();
  const { user, getUser, loading } = useUserStore();

  useEffect(() => {
    getUser(clerkUser?.id as string, "likedVideos");
  }, [clerkUser, getUser, user?.likedVideos.length]);
  if (user?.likedVideos.length === 0)
    return (
      <p className="text-sm text-[#aaa]">You don't have liked videos yet</p>
    );
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Your liked videos</h2>

      <div className="mt-4 flex flex-col gap-4 items-center ">
        {!loading ? (
          user?.likedVideos.every((video) => typeof video !== "string") &&
          user?.likedVideos.map((video) => (
            <VideoSmall video={video} key={video._id} />
          ))
        ) : (
          <SmallVideosSkeleton className="w-full" />
        )}
      </div>
    </div>
  );
};

export default LikedVideosPage;
