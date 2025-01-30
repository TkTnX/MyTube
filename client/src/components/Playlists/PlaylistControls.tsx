import { Forward, Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PlaylistControls = () => {
  return (
    <div className="flex items-center gap-4 mt-5 flex-wrap">
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
  );
};

export default PlaylistControls;
