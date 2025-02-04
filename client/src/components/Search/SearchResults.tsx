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

// * TODO: Получение результатов поиска для channels & playlists
// * TODO: Скелетоны при поиске
// * TODO: Сортировку отображать для конкретного типа - у Channels сортировка по подписчикам и колву видео, и тд
// TODO: Сортировка
// TODO: Пофиксить - сделать у VideoPlaylistItem возможность делать лайки/дизлайки и переходить на канал, а не сразу на видео
// TODO: Кнопка "X" - стереть в поиске
// TODO: Дополнить channel controls. Поискать в других компонентах функции

const SearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams] = useSearchParams();
  const { type, sortBy, date } = Object.fromEntries(searchParams);
  const { getVideos } = useVideoControls({ videoId: "" });
  const { getAuthors } = useChannelControls();
  const { getPlaylists } = usePlaylistsControls();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["search", searchQuery, type, sortBy, date, searchParams],
    queryFn: async () => {
      switch (type) {
        case "videos":
          return await getVideos({ searchQuery });
        case "channels":
          return await getAuthors({ username: searchQuery });
        case "playlists":
          return await getPlaylists({ title: searchQuery });
        default:
          return await getVideos({ searchQuery });
      }
    },
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
