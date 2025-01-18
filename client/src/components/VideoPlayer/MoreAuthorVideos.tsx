import { useQuery } from "@tanstack/react-query";
import { AuthorType, VideoType } from "../../types";
import VideoSmall from "../ui/VideoSmall";
import axios from "axios";

const getAuthorVideos = async (authorId: string) => {
  try {
    const videos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/author/${authorId}`
    );

    return videos.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const MoreAuthorVideos = ({
  author,
  videoId,
}: {
  author: AuthorType;
  videoId: string;
}) => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["authorVideos", author._id],
    queryFn: () => getAuthorVideos(author._id),
  });

  if (isError) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-medium tracking-[0.01em] leading-5">
        From {author.username}
      </h5>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {data.filter((v: VideoType) => v._id !== videoId).length > 0 ? (
            data.map((video: VideoType) => (
              <VideoSmall video={{ ...video, author }} />
            ))
          ) : (
            <p className="text-xs text-[#b7b7b7]">No videos from this author</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoreAuthorVideos;
