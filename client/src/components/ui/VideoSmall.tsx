import { Link } from "react-router-dom";
import Image from "./Image";

const VideoSmall = () => {
  return (
    <Link to="/" className="flex items-start gap-2">
      <div>
        <Image
          src="/video-previews/test.jpg"
          alt="Video"
          height="94"
          className="rounded-lg min-h-[94px] object-cover"
        />
      </div>
      <div>
        <h6 className="font-medium text-sm leading-5 big-text">
          I Redesigned the ENTIRE Spotify UI from Scratch
        </h6>
        <p className="text-[#aaa]">tktnx</p>
        <div className="text-[#aaa] flex flex-wrap items-center gap-1 text-xs">
          <span>0 views</span> • <span>5 months ago</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoSmall;
