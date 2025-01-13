import { format } from "timeago.js";
import { VideoType } from "../../types";
import {
  Calendar,
  Eye,
  MoreHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

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
        <div className="rounded-full bg-[#1d1d1d] flex items-center ">
          <button className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition">
            <ThumbsUp size={24} color="#fff" />
            <span className="font-medium">{data.likes}</span>
          </button>
          <div className="w-[1px] h-7 bg-[#343434]" />
          <button className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition">
            <ThumbsDown size={24} color="#fff" />
            <span className="font-medium">{data.dislikes}</span>
          </button>
        </div>
        <button className="rounded-full p-2 w-10 h-10 bg-[#1d1d1d]">
          <MoreHorizontal size={24} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
