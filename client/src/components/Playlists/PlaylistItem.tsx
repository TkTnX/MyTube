import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { MoreVertical } from "lucide-react";
import PlaylistControls from "./PlaylistControls";
import PlaylistInformation from "./PlaylistInformation";
import { PlaylistType } from "../../types";
import PlaylistDropdown from "./PlaylistDropdown";
import PlaylistAuthor from "./PlaylistAuthor";

// * TODO: Возможность удалять видео из плейлистов
// * TODO: Если в плейлисте нет видео, то показать что-то
// * TODO: Фикс бага, если нажать на add to playlist на странице плейлиста, там должно отображаться. Возможно заменить эту кнопку на "удалить из плейлиста"
// * TODO: Сортировка в странице плейлиста
// * TODO: Адаптив
// TODO: В сайдбаре сделать выпадающее меню, в котором отображаются плейлисты пользователя (см. макет)

type Props = {
  playlist: PlaylistType;
  isMyPlaylist?: boolean;
  className?: string;
};

const PlaylistItem: React.FC<Props> = ({
  playlist,
  isMyPlaylist = false,
  className,
}) => {
  return (
    <div
      className={`flex lg:items-start gap-4 relative flex-col lg:flex-row items-center border-b border-b-[#333] pb-10 ${className}`}
    >
      <Link to={`/playlists/${playlist.author.username}/${playlist._id}`}>
        {playlist?.videos?.length > 0 ? (
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
          to={`/playlists/${playlist.author.username}/${playlist._id}`}
          className="font-medium text-lg leading-6 w-full block"
        >
          {playlist.title}
        </Link>
        {/* PLAYLIST AUTHOR */}
        <PlaylistAuthor author={playlist.author} className="mt-6" />
        {/* PLAYLIST INFORMATION */}
        <PlaylistInformation
          className="mt-6"
          totalViews={playlist?.videos?.reduce((a, b) => a + b.views, 0)}
          totalVideos={playlist?.videos?.length}
        />
        {/* PLAYLIST CONTROLS */}
        <PlaylistControls
          isMyPlaylist={isMyPlaylist}
          authorUsername={playlist.author.username}
          playlistId={playlist._id}
        />
        {isMyPlaylist && (
          <div className="absolute right-0 top-0 hover:opacity-80 transition">
            <PlaylistDropdown playlistId={playlist._id}>
              <button className="">
                <MoreVertical color="#fff" />
              </button>
            </PlaylistDropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistItem;
