import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import VideoSmall from "../ui/VideoSmall";
import { AuthorType, VideoType } from "../../types";

const getRelatedVideos = async (category: string) => {
  try {
    const videos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/category/${category}`
    );

    return videos.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const RelatedVideos = ({
  videoCategory,
  videoId,
  author,
}: {
  videoCategory: string;
  videoId: string;
  author: AuthorType;
}) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["relatedVideos", videoCategory],
    queryFn: () => getRelatedVideos(videoCategory),
  });
  if (isError) return null;

  return (
    <div>
      <h5 className="text-sm font-medium tracking-[0.01em] leading-5 mt-6">
        Related Videos
      </h5>
      <div className="mt-3 flex flex-col gap-3">
        {isPending ? (
          <div>Loading...</div>
        ) : data.filter((v: VideoType) => v._id !== videoId).length > 0 ? (
          data.map((video: VideoType) => (
            <VideoSmall key={video._id} video={{ ...video, author }} />
          ))
        ) : (
          <div className="text-[#b7b7b7] text-xs">No related videos</div>
        )}
      </div>
    </div>
  );
};

export default RelatedVideos;
