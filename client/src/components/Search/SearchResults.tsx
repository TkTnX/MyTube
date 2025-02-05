import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useVideoControls } from "../../hooks/useVideoControls";
import VideoPlaylistItem from "../ui/VideoPlaylistItem";
import { useChannelControls } from "../../hooks/useChannelControls";
import { PlaylistType, UserType, VideoType } from "../../types";
import PlaylistItem from "../Playlists/PlaylistItem";
import ChannelItem from "../Channel/ChannelItem";
import { usePlaylistsControls } from "../../hooks/usePlaylistsControls";
import { PlaylistVideosSkeleton } from "../Skeletons";

// * TODO: Кнопка "X" - стереть в поиске
// * TODO: Дополнить channel controls. Поискать в других компонентах функции
// * TODO: Проверить, почему playlists не появляются
// * TODO: Скролл для скроллбара

const SearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { type = "videos", sortBy, date, videos, subscribers } = params;

  const { getVideos } = useVideoControls({ videoId: "" });
  const { getAuthors } = useChannelControls();
  const { getPlaylists } = usePlaylistsControls();

  const queryKeys = [
    "search",
    searchQuery,
    type,
    sortBy,
    date,
    searchParams,
    videos,
    subscribers,
  ];

  const fetchers = {
    videos: () => getVideos({ searchQuery, sortQuery: sortBy, takeDate: date }),
    channels: () =>
      getAuthors({ username: searchQuery, subscribersQuery: subscribers }),
    playlists: () => getPlaylists({ title: searchQuery, sortVideos: videos }),
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: queryKeys,
    queryFn: fetchers[type as keyof typeof fetchers] || fetchers.videos,
  });

  if (isError) return <span>Error: {error.message}</span>;

  if (isPending)
    return <PlaylistVideosSkeleton className="mt-11 gap-10" count={10} />;
  if (!data) return <p>No results</p>;
  return (
    <div className="w-full mt-11 flex flex-col gap-10">
      {data.length > 0 ? (
        type === "videos" ? (
          data.map((video: VideoType) => (
            <VideoPlaylistItem key={video._id} video={video} />
          ))
        ) : type === "channels" ? (
          data.map((channel: UserType) => (
            <ChannelItem key={channel._id} channel={channel} />
          ))
        ) : (
          data.map((playlist: PlaylistType) => (
            <PlaylistItem playlist={playlist} key={playlist._id} />
          ))
        )
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default SearchResults;
