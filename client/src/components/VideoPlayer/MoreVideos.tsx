import { AuthorType } from "../../types";
import VideoSmall from "../ui/VideoSmall";

const MoreVideos = ({ author }: { author: AuthorType }) => {
  return (
    <div className="w-full xl:w-1/4 h-full">
      {/* FROM AUTHOR */}
      <h5 className="text-sm font-medium tracking-[0.01em] leading-5">
        From {author.username}
      </h5>
      <div className="mt-3 flex flex-col gap-3">
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
      </div>
      {/* Related Videos */}
      <h5 className="text-sm font-medium tracking-[0.01em] leading-5 mt-6">
        Related Videos
      </h5>
      <div className="mt-3 flex flex-col gap-3">
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
        <VideoSmall />
      </div>
    </div>
  );
};

export default MoreVideos;
