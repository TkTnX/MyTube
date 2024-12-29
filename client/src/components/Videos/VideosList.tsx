import { useQuery } from "@tanstack/react-query";
import VideosListItem from "./VideosListItem";
import axios from "axios";
import { VideoType } from "../../types";

const getVideos = async (): Promise<VideoType[]> => {
  try {
    const videos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos`
    );

    return videos.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const VideosList = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {[...new Array(5)].map((_, i) => (
          <div
            key={i}
            className="max-w-[476px] w-full h-[240px] bg-[#343434] rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

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
