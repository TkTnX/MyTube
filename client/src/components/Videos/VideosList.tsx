import { useQuery } from "@tanstack/react-query";
import VideosListItem from "../ui/VideosListItem";
import { useSearchParams } from "react-router-dom";
import VideosSkeleton from "../ui/VideosSkeleton";
import { useVideoControls } from "../../hooks/useVideoControls";

const VideosList = () => {
  const [searchParams] = useSearchParams();
  const { getVideos } = useVideoControls({ videoId: "" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["videos", searchParams.get("category")],
    queryFn: () => getVideos(searchParams.get("category") || ""),
  });
  if (isPending) return <VideosSkeleton />;

  if (isError || !data) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data.map((video) => (
        <VideosListItem key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideosList;
