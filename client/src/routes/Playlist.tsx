import { useParams } from "react-router-dom";
import PlaylistItem from "../components/Playlists/PlaylistItem";
import { useQuery } from "@tanstack/react-query";
import { usePlaylistsControls } from "../hooks/usePlaylistsControls";
import PlaylistsControls from "../components/Playlists/PlaylistsControls";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { VideoType } from "../types";
import VideoPlaylistItem from "../components/ui/VideoPlaylistItem";

// TODO: ДОДЕЛАТЬ ЭТУ СТРАНИЦУ
// TODO: фиксы багов

const PlaylistPage = () => {
  const { playlistId, username } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const { user: clerkUser } = useUser();
  const { getPlaylist } = usePlaylistsControls();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId!, username!),
  });

  console.log(data);
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
                <VideoPlaylistItem key={video._id} video={video} />
              ))
          ) : (
            <p>No videos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
