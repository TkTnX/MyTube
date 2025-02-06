import { format } from "timeago.js";
import { VideoType } from "../../types";
import { Calendar, Eye, MoreHorizontal } from "lucide-react";
import LikeButtons from "./LikeButtons";
import VideoDropdown from "../ui/VideoDropdown";

const VideoControls = ({ data }: { data: VideoType }) => {
  return (
    <div className="flex  justify-between 2xl:justify-end flex-col md:flex-row    w-full  lg:items-center gap-6 vsm:gap-2 2xl:gap-6">
      {/* video stats */}
      <div className="flex items-center gap-2 2xl:gap-6">
        <div className="flex items-center gap-1">
          <Eye size={24} color="#585858" />
          <span className="text-[#b7b7b7]">{data.views + 1}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={24} color="#585858" />
          <span className="text-[#b7b7b7]">{format(data.createdAt)}</span>
        </div>
      </div>
      {/* video actions */}
      <div className="flex items-center gap-2 justify-between vsm:justify-normal">
        <LikeButtons
          videoId={data._id}
          likes={data.likes}
          dislikes={data.dislikes}
        />
        <VideoDropdown isPlaylistPage={false} video={data}>
          <button className="rounded-full p-2 w-10 h-10 bg-[#1d1d1d]">
            <MoreHorizontal size={24} color="#fff" />
          </button>
        </VideoDropdown>
      </div>
    </div>
  );
};

export default VideoControls;
