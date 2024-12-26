import { MoreVertical } from "lucide-react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";

const VideosListItem = () => {
  return (
    <div className="justify-self-center max-w-[476px] relative">
      <Link to="/watch/test" className="w-full h-full absolute inset-0  z-10" />
      <div className="rounded-2xl overflow-hidden relative">
        <Image
          src="/video-previews/test.jpg"
          alt="Video"
          width="476"
          height="266"
        />
        <span className="absolute bottom-2 right-2 text-white text-sm tracking-wider bg-[#120608]/60 py-1 px-2 rounded-full font-medium">
          12:07
        </span>
      </div>
      {/* VIDEO DETAILS */}
      <div className="mt-4 flex items-start gap-4">
        <Link to="/channel/test" className="relative min-w-9 min-h-9">
          <Image
            src="/icons/avatar.svg"
            width="36"
            height="36"
            alt="USER TEMP DATA"
            className="rounded-full object-cover absolute z-20 w-full h-full "
          />
        </Link>
        <div className="flex flex-col gap-2 ">
          <h6 className="font-medium text-lg text-white leading-6 big-text">
            I Redesigned the ENTIRE YouTube UI from Scratch
          </h6>
          <p className="text-[#aaa]">Juxtopposed</p>
          <div className="text-[#aaa] flex flex-wrap items-center gap-1">
            <span>50K views</span> • <span>1 day ago</span>
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
