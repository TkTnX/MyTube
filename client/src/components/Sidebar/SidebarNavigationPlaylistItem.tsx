import { Link, useParams } from "react-router-dom";
import Image from "../ui/Image";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "../../stores/useSidebarStore";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "../../stores/useUserStore";

const SidebarNavigationPlaylistItem = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user: clerkUser } = useUser();
  const { user } = useUserStore();
  const { playlistId } = useParams();
  if (!clerkUser) return null;
  return (
    <div className="w-full">
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className={twMerge(
          "flex flex-col  sm:flex-row  gap-1 sm:gap-5 py-1 sm:p-[10px] hover:bg-[#332729] rounded-[10px] transition min-w-[60px] w-full text-[#bababa] justify-between",
          [!isOpen && " sm:flex-col  sm:gap-1  sm:py-1 text-[#bababa] "]
        )}
      >
        <div className="flex items-center gap-1 sm:gap-5">
          <Image
            src={"/icons/playlists.svg"}
            alt={"Playlists"}
            width="24"
            height="24"
            className="min-w-6 min-h-6"
          />
          <Link
            to="/playlists"
            className={twMerge(
              "font-medium leading-6 text-sm sm:text-base",
              !isOpen && "text-xs sm:text-xs"
            )}
          >
            Playlists
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-[1px] h-[28px] bg-[#333333]" />
          <ChevronDown
            className={`transition ${openDropdown ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {openDropdown && (
        <div className="flex flex-col gap-2 p-2">
          {user?.playlists.map((playlist) => (
            <Link
              to={`/playlists/${user.username}/${playlist._id}`}
              key={playlist._id}
              className={twMerge(
                "block w-full p-3 rounded-lg hover:bg-[#333] transition",
                [playlistId === playlist._id && "bg-[#332729] text-white"]
              )}
            >
              {playlist.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavigationPlaylistItem;
