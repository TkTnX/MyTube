import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { MoreVertical } from "lucide-react";
import PlaylistControls from "./PlaylistControls";
import PlaylistInformation from "./PlaylistInformation";
import { PlaylistType } from "../../types";

// TODO: Создание плейлистов
// TODO: Удаление плейлистов
// TODO: Сортировка плейлистов
// TODO: Поиск плейлистов
// TODO: Страница плейлиста по адресу /playlists/:username/:playlistId

const PlaylistItem = ({
  playlist,
  isMyPlaylist = false,
}: {
  playlist: PlaylistType;
  isMyPlaylist?: boolean;
}) => {
  return (
    <div className="flex lg:items-start gap-4 relative flex-col lg:flex-row items-center border-b border-b-[#333] pb-10">
      <Link to={`/playlists/${playlist.author.username}/${playlist._id}`}>
        {playlist?.videos[0]?.previewUrl ? (
          <Image
            src={playlist.videos[0].previewUrl}
            width="332"
            height="186"
            alt={playlist.title}
            className="rounded-2xl"
          />
        ) : (
          <div className="w-[332px] h-[186px] bg-[#555555] rounded-2xl" />
        )}
      </Link>
      <div>
        <Link
          to={`/playlists/${playlist._id}`}
          className="font-medium text-lg leading-6 w-full block"
        >
          {playlist.title}
        </Link>
        {/* PLAYLIST AUTHOR */}
        <Link
          className="flex items-center gap-4 mt-4"
          to={`/channel/${playlist.author.username}`}
        >
          <img
            className="rounded-full object-cover"
            src={playlist.author.img}
            alt={playlist.author.username}
            width="28"
            height="28"
          />
          <h6>{playlist.author.username}</h6>
          <p className="text-sm text-[#aaa]">
            {playlist.author.subscribers.length} subscribers
          </p>
        </Link>
        {/* PLAYLIST INFORMATION */}
        <PlaylistInformation
          totalViews={playlist.videos.reduce((a, b) => a + b.views, 0)}
          totalVideos={playlist.videos.length}
        />
        {/* PLAYLIST CONTROLS */}
        <PlaylistControls
          isMyPlaylist={isMyPlaylist}
          authorUsername={playlist.author.username}
          playlistId={playlist._id}
        />
        {isMyPlaylist && (
          <button className="absolute right-0 top-0 hover:opacity-80 transition">
            <MoreVertical color="#fff" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaylistItem;
