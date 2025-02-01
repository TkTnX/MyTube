import { VideoType } from "../../types";
import Image from "./Image";
import VideoDropdown from "./VideoDropdown";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistInformation from "../Playlists/PlaylistInformation";
import { LikeButtons } from "../VideoPlayer";
import PlaylistAuthor from "../Playlists/PlaylistAuthor";

const VideoPlaylistItem = ({ video }: { video: VideoType }) => {
  return (
    <div className={"justify-self-center  relative flex w-full gap-4"}>
      <Link
        to={`/watch/${video._id}`}
        className="w-full h-full absolute inset-0  z-[1] "
      />
      <div className="rounded-2xl overflow-hidden relative bg-[#aaa]">
        <Image
          src={video.previewUrl}
          alt="Video"
          width="259"
          height="146"
          className="object-cover w-full h-full"
        />
      </div>
      {/* VIDEO DETAILS */}
      <div className="mt-4 flex items-start gap-4 w-full">
        <div className="flex flex-col gap-2 flex-1 ">
          <h6 className="font-medium text-lg text-white leading-6 big-text">
            {video.title}
          </h6>
          <div className="flex items-center gap-4">
            <PlaylistInformation
              totalViews={video.views}
              createdAt={video.createdAt}
            />
            <LikeButtons
              videoId={video._id}
              likes={video.likes}
              dislikes={video.dislikes}
            />
          </div>
          <PlaylistAuthor author={video.author} />
        </div>
        <VideoDropdown video={video}>
          <button>
            <MoreVertical size={24} />
          </button>
        </VideoDropdown>
      </div>
    </div>
  );
};

export default VideoPlaylistItem;
