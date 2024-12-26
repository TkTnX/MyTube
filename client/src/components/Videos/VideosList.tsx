import VideosListItem from "./VideosListItem";

const VideosList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <VideosListItem />
      <VideosListItem />
      <VideosListItem />
      <VideosListItem />
      <VideosListItem />
      <VideosListItem />

    </div>
  );
};

export default VideosList;
