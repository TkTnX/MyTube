import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlaylistItem from "../components/Playlists/PlaylistItem";
import { PlaylistType } from "../types";
import { useUser } from "@clerk/clerk-react";

const getUserPlaylists = async (username: string) => {
  try {
    const playlists = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/playlist/${username}`
    );
    return playlists.data;
  } catch (error) {
    console.log(error);
  }
};

const UserPlaylistsPage = () => {
  const { username } = useParams();
  const { user } = useUser();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userPlaylists", username],
    queryFn: () => {
      if (!username) throw new Error("Username not found");
      return getUserPlaylists(username);
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="">
      <div className="flex flex-col gap-10 lg:gap-4 mt-11">
        {data.map((playlist: PlaylistType) => (
          <PlaylistItem
            isMyPlaylist={user?.id === playlist.author.clerkId}
            key={playlist._id}
            playlist={{ ...playlist }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPlaylistsPage;
