import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChannelVideosCategories } from "../constants";
import { twMerge } from "tailwind-merge";
import {  UserType, VideoType } from "../types";
import VideosListItem from "../components/ui/VideosListItem";
import { useChannelStore } from "../stores/useChannelStore";
import { VideosListSkeleton } from "../components/Skeletons";

const ChannelVideos = () => {
  const channel: UserType = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState(0);
  const { error, loading, authorVideos, getAuthorVideos } = useChannelStore();

  useEffect(() => {
    getAuthorVideos(
      channel._id,
      ChannelVideosCategories[currentCategory].toLowerCase()
    );
  }, [currentCategory, channel._id, getAuthorVideos]);

  if (error) return <div>Error</div>;
  if (!loading && !authorVideos.length)
    return (
      <p className="text-center mt-10 text-xs text-[#aaa]">No videos yet</p>
    );

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
      {loading ? (
        <div className="mt-7">
          <VideosListSkeleton className="w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-7">
          {authorVideos.map((video: VideoType) => (
            <VideosListItem
              isChannelPage={true}
              video={{ ...video, author: channel }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
