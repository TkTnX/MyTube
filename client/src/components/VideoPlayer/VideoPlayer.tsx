import ReactPlayer from "react-player";

const VideoPlayer = () => {
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
        url="https://www.youtube.com/watch?v=3mPkyoHuUgo&t=14926s&ab_channel=%D0%A0%D0%B8%D1%81%D0%B0%D0%B7%D0%B0%D0%A2%D0%B2%D0%BE%D1%80%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE"
      />
    </div>
  );
};

export default VideoPlayer;
