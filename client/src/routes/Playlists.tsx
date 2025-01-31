import { useEffect } from "react";
import PlaylistItem from "../components/Playlists/PlaylistItem";
import PlaylistsControls from "../components/Playlists/PlaylistsControls";
import { useUserStore } from "../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { PlaylistType } from "../types";

const PlaylistsPage = () => {
  const { user: clerkUser } = useUser();
  const { user, getUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkUser || !clerkUser.id) return navigate("/");
      await getUser(clerkUser.id, "playlists");
    };

    fetchUser();
  }, [clerkUser, getUser, navigate]);

  if (!user) return null;

  return (
    <div className="mt-7 w-full h-full">
      <PlaylistsControls />

      <div className="flex flex-col gap-10 lg:gap-4 mt-11">
        {user.playlists.length > 0 ? (
          user.playlists.map((playlist: PlaylistType) => (
            <PlaylistItem
              isMyPlaylist={clerkUser?.id === playlist?.author?.clerkId}
              key={playlist._id}
              playlist={{ ...playlist, author: user }}
            />
          ))
        ) : (
          <p className="mt-7 w-full h-full text-center  text-[#aaa]">
            No playlists
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaylistsPage;
