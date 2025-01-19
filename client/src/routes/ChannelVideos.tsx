import { useState } from "react";
import { ChannelVideosCategories } from "../constants";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { AuthorType, VideoType } from "../types";
import VideosListItem from "../components/ui/VideosListItem";

const getChannelVideos = async (id: string) => {
  try {
    const videos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/author/${id}`
    );

    return videos.data;
  } catch (error) {
    console.log(error);
  }
};

const ChannelVideos = () => {
  const channel: AuthorType = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState(0);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["channelVideos", channel._id],
    queryFn: () => getChannelVideos(channel._id),
  });

  if (isError) return <div>Error: {error?.message}</div>;
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="mt-7">
      <div className="flex items-center gap-2">
        {ChannelVideosCategories.map((category, i: number) => (
          <button
            onClick={() => setCurrentCategory(i)}
            className={twMerge(
              "text-white bg-[#333333] py-2 px-4 rounded-lg font-medium",
              [currentCategory === i && "bg-white text-[#333333]"]
            )}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-7">
        {data.map((video: VideoType) => (
          <VideosListItem
            isChannelPage={true}
            video={{ ...video, author: channel }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelVideos;
