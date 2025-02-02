import { Link, useParams, useSearchParams } from "react-router-dom";
import PlaylistItem from "../components/Playlists/PlaylistItem";
import { useQuery } from "@tanstack/react-query";
import { usePlaylistsControls } from "../hooks/usePlaylistsControls";
import PlaylistsControls from "../components/Playlists/PlaylistsControls";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { VideoType } from "../types";
import VideoPlaylistItem from "../components/ui/VideoPlaylistItem";
import { useUserStore } from "../stores/useUserStore";

const PlaylistPage = () => {
  const { playlistId, username } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams] = useSearchParams();
  const { user: clerkUser } = useUser();
  const { getUser, user } = useUserStore();
  const { getPlaylist } = usePlaylistsControls();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["playlist", playlistId, searchParams.get("sort")],
    queryFn: () =>
      getPlaylist(playlistId!, username!, searchParams.get("sort") || ""),
  });

  useEffect(() => {
    if (!user) {
      getUser(clerkUser?.id as string, "playlists");
    }
  }, [clerkUser]);

  const filter = (v: VideoType) =>
    v.title.toLowerCase().includes(searchValue.toLowerCase());

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="w-full mt-8">
      {/* PLAYLISTS TOP */}
      <PlaylistItem
        playlist={data}
        className="w-full border border-[#31383d] p-6 rounded-3xl"
      />

      {/* PLAYLIST VIDEOS */}
      <div className="mt-8">
        <PlaylistsControls
          setSearchValue={setSearchValue}
          userId={clerkUser?.id as string}
          isPlaylistPage={true}
        />
        {/* PLAYLIST VIDEOS LIST */}
        <div className="w-full mt-9 flex flex-col gap-8">
          {data.videos.length > 0 ? (
            data.videos
              .filter(filter)
              .map((video: VideoType) => (
                <VideoPlaylistItem
                  playlistId={playlistId}
                  isPlaylistPage={true}
                  key={video._id}
                  video={video}
                />
              ))
          ) : (
            <div className="text-center">
              <p className="text-sm text-[#aaa]">No videos yet</p>
              <Link
                to="/explore"
                className="text-sm bg-[#fa0044] py-2 px-4 rounded-lg mt-4 block w-fit mx-auto hover:opacity-80 transition  "
              >
                Add more videos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
