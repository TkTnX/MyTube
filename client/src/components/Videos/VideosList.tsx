import { useQuery } from "@tanstack/react-query";
import VideosListItem from "../ui/VideosListItem";
import { useSearchParams } from "react-router-dom";
import { useVideoControls } from "../../hooks/useVideoControls";
import { useUserStore } from "../../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { VideosListSkeleton } from "../Skeletons";

const VideosList = () => {
  const [searchParams] = useSearchParams();
  const { user: clerkUser } = useUser();
  const { getUser } = useUserStore();
  const { getVideos } = useVideoControls({ videoId: "" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["videos", searchParams.get("category")],
    queryFn: () => getVideos(searchParams.get("category") || ""),
  });

  useEffect(() => {
    if (clerkUser) getUser(clerkUser.id, "playlists");
  }, [clerkUser]);

  if (isPending) return <VideosListSkeleton />;

  if (isError || !data) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10">
      {data.length > 0 ? (
        data.map((video) => <VideosListItem key={video._id} video={video} />)
      ) : (
        <p className=" text-sm text-[#aaa]">No videos yet</p>
      )}
    </div>
  );
};

export default VideosList;
