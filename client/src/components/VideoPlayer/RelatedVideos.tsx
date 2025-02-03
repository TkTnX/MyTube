import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import VideoSmall from "../ui/VideoSmall";
import { UserType, VideoType } from "../../types";
import { SmallVideosSkeleton } from "../Skeletons";

type Props = {
  videoCategory: string;
  videoId: string;
  author: UserType;
};

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

const RelatedVideos: React.FC<Props> = ({ videoCategory, videoId, author }) => {
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
          <SmallVideosSkeleton className="mt-3" />
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
