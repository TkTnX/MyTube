import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VideoType } from "../../types";
import VideosListItem from "../ui/VideosListItem";
import { useSearchParams } from "react-router-dom";
import VideosSkeleton from "../ui/VideosSkeleton";

const getVideos = async (category: string): Promise<VideoType[]> => {
  try {
    const videos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos`,
      { params: { category } }
    );

    return videos.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const VideosList = () => {
  const [searchParams] = useSearchParams();
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
