import PlaylistItem from "../components/Playlists/PlaylistItem";
import PlaylistsControls from "../components/Playlists/PlaylistsControls";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlaylistType } from "../types";
import { useQuery } from "@tanstack/react-query";
import { usePlaylistsControls } from "../hooks/usePlaylistsControls";
import { useEffect, useState } from "react";
import { PlaylistVideosSkeleton } from "../components/Skeletons";

const PlaylistsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user: clerkUser } = useUser();
  const [searchParams] = useSearchParams();
  const { getUserPlaylists } = usePlaylistsControls();
  const navigate = useNavigate();

  useEffect(() => {
    if (!clerkUser || !clerkUser.username) navigate("/");
  }, [clerkUser, navigate]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["playlists", searchParams.get("sort")],
    queryFn: () => {
      if (!clerkUser || !clerkUser.username) return [];
      return getUserPlaylists(
        clerkUser.username,
        searchParams.get("sort") || ""
      );
    },
  });

  const filter = (playlist: PlaylistType) =>
    playlist.title.toLowerCase().includes(searchValue.toLowerCase());

  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="mt-7 w-full h-full">
      <PlaylistsControls
        setSearchValue={setSearchValue}
        userId={clerkUser?.id as string}
      />

      <div className="flex flex-col gap-10 lg:gap-4 mt-11">
        {isPending ? (
          <PlaylistVideosSkeleton />
        ) : data.length > 0 ? (
          data
            .filter(filter)
            .map((playlist: PlaylistType) => (
              <PlaylistItem
                isMyPlaylist={clerkUser?.id === playlist?.author?.clerkId}
                key={playlist._id}
                playlist={playlist}
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
