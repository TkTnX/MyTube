import { Plus, Search } from "lucide-react";
import PlaylistAddForm from "./PlaylistAddForm";
import { useSearchParams } from "react-router-dom";
import React from "react";

type Props = {
  userId: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isPlaylistPage?: boolean;
};

const PlaylistsControls: React.FC<Props> = ({
  userId,
  setSearchValue,
  isPlaylistPage = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center lg:justify-between flex-col justify-center  flex-wrap  vsm:flex-row gap-2 vsm:gap-2">
      <select
        value={searchParams.get("sort") || ""}
        onChange={(e) => setSearchParams({ sort: e.target.value })}
        className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto"
      >
        <option value="" disabled selected hidden className="bg-[#111111]">
          Sort by
        </option>

        {isPlaylistPage ? (
          <>
            <option value="addedAt" className="bg-[#111111]">
              Added date
            </option>
            <option value="views" className="bg-[#111111]">
              Views
            </option>
          </>
        ) : (
          <>
            <option value="createdAt" className="bg-[#111111]">
              Created date
            </option>
            <option value="videos" className="bg-[#111111]">
              Videos count
            </option>
          </>
        )}
      </select>

      <div className="w-full vsm:w-auto flex flex-col vsm:flex-row items-center gap-2">
        <form className="flex w-full vsm:w-auto items-center gap-2 py-1 pl-4 bg-[#1d1d1d] rounded-full">
          <Search color="#aaa" />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search playlists"
            className="placeholder:text-[#aaa] bg-inherit outline-none flex-1 pr-4 rounded-full"
          />
        </form>
        {!isPlaylistPage && (
          <PlaylistAddForm className="w-full" type="add" userId={userId}>
            <button className="flex w-full justify-center vsm:w-auto items-center gap-2 bg-[#1d1d1d] py-1 px-4 rounded-3xl hover:opacity-80 transition ">
              <Plus /> <span>Create</span>
            </button>
          </PlaylistAddForm>
        )}
      </div>
    </div>
  );
};

export default PlaylistsControls;
