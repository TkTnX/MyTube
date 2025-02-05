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

// TODO: Страница subscribtions, Где будут выводиться авторы, на которых подписан и их видео. Сверху список подписок(аватарки). При нажатии отоброжать их видео
// TODO: На странице плейлиста надпись на поиске "Search playlists" заменить на "Search videos"
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

  const renderItems = (item: VideoType | UserType | PlaylistType) => {
    if (type === "channels")
      return <ChannelItem channel={item as UserType} key={item._id} />;
    if (type === "playlists")
      return <PlaylistItem playlist={item as PlaylistType} key={item._id} />;
    return <VideoPlaylistItem video={item as VideoType} key={item._id} />;
  };

  return (
    <div className="w-full mt-11 flex flex-col gap-10">
      {data.length > 0 ? data.map(renderItems) : <p>No results</p>}
    </div>
  );
};

export default SearchResults;
