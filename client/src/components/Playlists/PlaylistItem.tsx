import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { Eye, Forward, MoreVertical, Play, Plus } from "lucide-react";

const PlaylistItem = () => {
  return (
    <div className="flex items-start gap-4 relative">
      <Link to={`/playlists/${1}`}>
        <Image
          src="/video-previews/test.jpg"
          width="332"
          height="186"
          alt="TITLE"
          className="rounded-2xl"
        />
      </Link>
      <div>
        <h5 className="font-medium text-lg leading-6">TITLE</h5>
        {/* PLAYLIST AUTHOR */}
        <Link className="flex items-center gap-4 mt-4" to={`/channel/${1}`}>
          <Image src="/icons/avatar.svg" alt="AVATAR" width="28" height="28" />
          <h6>USERNAME</h6>
          <p className="text-sm text-[#aaa]">288K subscribers</p>
        </Link>
        {/* PLAYLIST INFORMATION */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-1">
            <Eye size={24} color="#585858" />
            <p>
              50 <span className="text-[#aaa]">views</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Play fill="#585858" size={16} color="#585858" />
            <p>
              15 <span className="text-[#aaa]">videos</span>
            </p>
          </div>
        </div>
        {/* PLAYLIST CONTROLS */}
        <div className="flex items-center gap-4 mt-5">
          <Link
            to={`/playlists/${1}`}
            className="flex items-center gap-2 bg-white py-1 px-4 rounded-3xl hover:opacity-80 transition"
          >
            <Play fill="black" />
            <span className="text-black font-medium">Play All</span>
          </Link>
          <button className="flex items-center gap-2 bg-[#1d1d1d] py-1 px-4 rounded-3xl hover:opacity-80 transition">
            <Forward />
            <span className=" font-medium">Share</span>
          </button>
          <button className="flex items-center gap-2 bg-[#1d1d1d] py-1 px-4 rounded-3xl hover:opacity-80 transition">
            <Plus />
            <span className=" font-medium">Add video</span>
          </button>
        </div>
        <button className="absolute right-0 top-0 hover:opacity-80 transition">
          <MoreVertical color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;
