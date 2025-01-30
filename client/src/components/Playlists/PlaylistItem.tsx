import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { MoreVertical } from "lucide-react";
import PlaylistControls from "./PlaylistControls";
import PlaylistInformation from "./PlaylistInformation";
import { PlaylistType } from "../../types";

// * TODO: Разнести по компонентам
// * TODO: Адаптив
// * TODO: Создать модель плейлиста на беке

const PlaylistItem = ({ playlist }: { playlist: PlaylistType }) => {
  console.log(playlist);
  return (
    <div className="flex lg:items-start gap-4 relative flex-col lg:flex-row items-center border-b border-b-[#333] pb-10">
      <Link to={`/playlists/${playlist._id}`}>
        <Image
          src={playlist.videos[0].previewUrl}
          width="332"
          height="186"
          alt={playlist.title}
          className="rounded-2xl"
        />
      </Link>
      <div>
        <h5 className="font-medium text-lg leading-6">{playlist.title}</h5>
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
        <PlaylistInformation />
        {/* PLAYLIST CONTROLS */}
        <PlaylistControls />
        <button className="absolute right-0 top-0 hover:opacity-80 transition">
          <MoreVertical color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;
