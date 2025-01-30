import PlaylistItem from "../components/Playlists/PlaylistItem";
import PlaylistsControls from "../components/Playlists/PlaylistsControls";

const PlaylistsPage = () => {
  return (
    <div className="mt-7 w-full h-full">
      <PlaylistsControls />

      <div className="flex flex-col gap-4 mt-11">
        <PlaylistItem />
        <PlaylistItem />
      </div>
    </div>
  );
};

export default PlaylistsPage;
