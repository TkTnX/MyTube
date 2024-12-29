import { format } from "timeago.js";
import { VideoType } from "../../types";
import { Calendar, Eye, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react";

const VideoControls = ({ data }: { data: VideoType }) => {
  return (
    <div className="flex items-center gap-6">
      {/* video stats */}
      <div className="flex items-center gap-1">
        <Eye size={24} color="#585858" />
        <span>{data.views}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar size={24} color="#585858" />
        <span>{format(data.createdAt)}</span>
      </div>
      {/* video actions */}
      <div className="flex items-center gap-2">
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

export default VideoControls