import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PlaylistItem from "../components/Playlists/PlaylistItem";
import { PlaylistType } from "../types";
import { useUser } from "@clerk/clerk-react";
import { usePlaylistsControls } from "../hooks/usePlaylistsControls";
import { PlaylistVideosSkeleton } from "../components/Skeletons";

const UserPlaylistsPage = () => {
  const { username } = useParams();
  const { user } = useUser();
  const { getUserPlaylists } = usePlaylistsControls();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userPlaylists", username],
    queryFn: () => {
      if (!username) throw new Error("Username not found");
      return getUserPlaylists(username);
    },
  });

  if (isPending) return <PlaylistVideosSkeleton className="mt-11" />;
  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="flex flex-col gap-10 lg:gap-4 mt-11">
      {data.map((playlist: PlaylistType) => (
        <PlaylistItem
          isMyPlaylist={user?.id === playlist.author.clerkId}
          key={playlist._id}
          playlist={{ ...playlist }}
        />
      ))}
    </div>
  );
};

export default UserPlaylistsPage;
