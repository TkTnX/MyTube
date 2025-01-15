import { Link } from "react-router-dom";
import Image from "./Image";
import { VideoType } from "../../types";
import { format } from "timeago.js";

// TODO: Пофиксить при переключении видео

const VideoSmall = ({ video }: { video: VideoType }) => {
  return (
    <Link to={`/watch/${video._id}`} className="flex items-start gap-2">
      <div>
        <Image
          src={video.previewUrl}
          alt={video.title}
          height="94"
          className="rounded-lg min-h-[94px] object-cover"
        />
      </div>
      <div>
        <h6 className="font-medium text-sm leading-5 big-text">
          {video.title}
        </h6>
        <p className="text-[#aaa]">{video.author.username}</p>
        <div className="text-[#aaa] flex flex-wrap items-center gap-1 text-xs">
          <span>
            {video.views > 1000
              ? `${(video.views / 1000).toFixed(1)}k`
              : video.views}{" "}
            views
          </span>{" "}
          • <span>{format(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoSmall;
