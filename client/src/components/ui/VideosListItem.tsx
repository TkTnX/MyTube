import { MoreVertical } from "lucide-react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { VideoType } from "../../types";
import { format } from "timeago.js";
import { twMerge } from "tailwind-merge";
import AvatarLink from "./AvatarLink";
import VideoDropdown from "./VideoDropdown";
const VideosListItem = ({
  video,
  className,
  isChannelPage = false,
}: {
  video: VideoType;
  className?: string;
  isChannelPage?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "justify-self-center max-w-[476px] relative",
        className
      )}
    >
      <Link
        to={`/watch/${video._id}`}
        className="w-full h-full absolute inset-0  z-[1]"
      />
      <div className="rounded-2xl overflow-hidden relative bg-[#aaa]">
        <Image src={video.previewUrl} alt="Video" width="476" height="266" />
      </div>
      {/* VIDEO DETAILS */}
      <div className="mt-4 flex items-start gap-4">
        {!isChannelPage && (
          <AvatarLink
            username={video.author.username}
            img={video.author.img}
            width="36"
            height="36"
            className="rounded-full object-cover max-w-[36px] max-h-[36px] "
          />
        )}

        <div className="flex flex-col gap-2 flex-1">
          <h6 className="font-medium text-lg text-white leading-6 big-text">
            {video.title}
          </h6>
          <p className="text-[#aaa]">{video.author.username}</p>
          <div className="text-[#aaa] flex flex-wrap items-center gap-1">
            <span>
              {video.views > 1000
                ? `${(video.views / 1000).toFixed(1)}K`
                : video.views + 1}{" "}
              views
            </span>{" "}
            • <span>{format(video.createdAt)}</span>
          </div>
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

export default VideosListItem;
