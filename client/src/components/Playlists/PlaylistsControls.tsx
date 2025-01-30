import { Search } from "lucide-react";

const PlaylistsControls = () => {
  return (
    <div className="flex items-center justify-between ">
      <select className="bg-[#333333] p-1 rounded-lg ">
        <option value="" disabled selected hidden className="bg-[#111111]">
          Sort by
        </option>
        <option value="createdAt" className="bg-[#111111]">
          Created date
        </option>
        <option value="videosLength" className="bg-[#111111]">
          Videos count
        </option>
      </select>

      <div>
        <form className="flex items-center gap-2 py-1 pl-4 bg-[#1d1d1d] rounded-full">
          <Search color="#aaa" />
          <input
            type="text"
            placeholder="Search playlists"
            className="placeholder:text-[#aaa] bg-inherit outline-none flex-1 pr-4 rounded-full"
          />
        </form>
      </div>
    </div>
  );
};

export default PlaylistsControls;
