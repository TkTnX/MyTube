import ReactPlayer from "react-player";

const VideoPlayer = ({url}: {url: string}) => {
  return (
    <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-[#555555]">
      <ReactPlayer
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        url={url}
      />
    </div>
  );
};

export default VideoPlayer;
