import { VideoType } from "../../types";
import Image from "./Image";
import VideoDropdown from "./VideoDropdown";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistInformation from "../Playlists/PlaylistInformation";
import { LikeButtons } from "../VideoPlayer";
import PlaylistAuthor from "../Playlists/PlaylistAuthor";

type Props = {
  video: VideoType;
  isPlaylistPage?: boolean;
  playlistId?: string;
};

const VideoPlaylistItem: React.FC<Props> = ({
  video,
  isPlaylistPage = false,
  playlistId,
}) => {
  return (
    <div
      className={
        "justify-self-center  relative flex w-full flex-col sm:flex-row gap-2  sm:gap-4"
      }
    >
      <Link
        to={`/watch/${video._id}`}
        className="w-full h-full absolute inset-0  z-[1] "
      />
      <div className="rounded-2xl overflow-hidden relative bg-[#aaa] md:min-w-[159px] xl:min-w-[259px] md:min-h-[130px] xl:min-h-[146px]">
        <Image
          src={video.previewUrl}
          alt="Video"
          width="259"
          height="146"
          className="object-cover w-full h-full"
        />
      </div>
      {/* VIDEO DETAILS */}
      <div className="mt-4 flex items-start gap-4 w-full">
        <div className="flex flex-col gap-2 flex-1 ">
          <h6 className="font-medium text-lg text-white leading-6 big-text">
            {video.title}
          </h6>
          <div className="flex flex-row sm:flex-col  md:flex-row items-start lg:items-center gap-4">
            <PlaylistInformation
              totalViews={video.views}
              createdAt={video.createdAt}
              className="gap-1 lg:gap-6 items-start flex-col lg:flex-row"
            />
            <LikeButtons
              videoId={video._id}
              likes={video.likes}
              dislikes={video.dislikes}
            />
          </div>
          <PlaylistAuthor author={video.author} />
        </div>
        <VideoDropdown
          playlistId={playlistId}
          isPlaylistPage={isPlaylistPage}
          video={video}
        >
          <button>
            <MoreVertical size={24} />
          </button>
        </VideoDropdown>
      </div>
    </div>
  );
};

export default VideoPlaylistItem;
