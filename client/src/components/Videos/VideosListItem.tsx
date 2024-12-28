import { MoreVertical } from "lucide-react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { VideoType } from "../../types";
import { format } from "timeago.js";
const VideosListItem = ({ video }: { video: VideoType }) => {
  return (
    <div className="justify-self-center max-w-[476px] relative">
      <Link
        to={`/watch/${video._id}`}
        className="w-full h-full absolute inset-0  z-10"
      />
      <div className="rounded-2xl overflow-hidden relative">
        <Image src={video.previewUrl} alt="Video" width="476" height="266" />
        <span className="absolute bottom-2 right-2 text-white text-sm tracking-wider bg-[#120608]/60 py-1 px-2 rounded-full font-medium">
          12:07
        </span>
      </div>
      {/* VIDEO DETAILS */}
      <div className="mt-4 flex items-start gap-4">
        <Link
          to={`/channel/${video.author.username}`}
          className="relative min-w-9 min-h-9"
        >
          <img
            src={video.author.img}
            width="36"
            height="36"
            alt={video.author.username}
            className="rounded-full object-cover absolute z-20 w-full h-full "
          />
        </Link>
        <div className="flex flex-col gap-2 flex-1">
          <h6 className="font-medium text-lg text-white leading-6 big-text">
            {video.title}
          </h6>
          <p className="text-[#aaa]">{video.author.username}</p>
          <div className="text-[#aaa] flex flex-wrap items-center gap-1">
            <span>{video.views} views</span> •{" "}
            <span>{format(video.createdAt)}</span>
          </div>
        </div>
        <button>
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideosListItem;
