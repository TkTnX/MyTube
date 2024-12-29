const VideoNotFound = () => {
  return (
    <div className="w-full h-full">
      {/* PLAYER */}
      <div className="w-3/4">
        <div className="w-full h-[576px] bg-[#555555] rounded-2xl flex items-center justify-center flex-col">
          <h6 className="text-5xl font-bold">404</h6>
          <p className="text-2xl font-bold">Video not found!</p>
        </div>
      </div>
    </div>
  );
}

export default VideoNotFound