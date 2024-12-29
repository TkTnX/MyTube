import axios from "axios";
import { VideoType } from "../types";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import VideoControls from "../components/VideoPlayer/VideoControls";
import VideoComments from "../components/VideoPlayer/VideoComments";
import VideoNotFound from "../components/VideoPlayer/VideoNotFound";

const getVideo = async (id: string): Promise<VideoType | null> => {
  try {
    const video = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/${id}`
    );

    return video.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const VideoPage = () => {
  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["video"],
    queryFn: () => getVideo(id!),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <span>Error: {error.message}</span>;
  if (!data) return <VideoNotFound />;
  return (
    <div className="w-full h-full mt-6">
      {/* PLAYER */}
      <div className="w-3/4">
        {/* VIDEO */}
        <VideoPlayer />
        <h3 className="font-semibold text-xl mt-5">{data.title}</h3>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              to={`/channel/${data.author.username}`}
              className="flex items-center gap-4"
            >
              <img
                src={data.author.img}
                alt={data.author.username}
                width={46}
                height={46}
                className="rounded-full w-[46px] h-[46px]"
              />
              <div>
                <h6 className="text-lg font-medium">{data.author.username}</h6>
                <p className="text-sm text-[#aaa]">
                  {data.author.subscribers} subscribers
                </p>
              </div>
            </Link>
            <button className="rounded-3xl py-2 px-6 font-medium bg-[#cc2849] hover:opacity-80 transition">
              Subscribe
            </button>
          </div>
          <VideoControls data={data} />
        </div>
        {/* video description */}
        <div className="mt-5 border border-[#343434] rounded-2xl py-5 px-6 w-full">
          <p>{data.description}</p>
        </div>
        {/* comments */}
        <VideoComments />
      </div>
      {/* OTHER VIDEOS */}
      <div className="w-1/4"></div>
    </div>
  );
};

export default VideoPage;
