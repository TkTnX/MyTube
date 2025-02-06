import { useSearchParams } from "react-router-dom";
import { UserType, VideoType } from "../../types";
import VideosListItem from "../ui/VideosListItem";
import { PlaylistVideosSkeleton } from "../Skeletons";
import { groupSubsVideos } from "../../helpers/groupSubsVideos";
import React from "react";

type Props = {
  subs: UserType[];
};

const SubscriptionsVideos: React.FC<Props> = ({ subs }) => {
  const [searchParams] = useSearchParams();
  if (!subs || typeof subs[0] === "string")
    return <PlaylistVideosSkeleton className="mt-12" />;

  const sort = searchParams.get("sort") || "newest";
  const videos = subs.flatMap((sub) => sub.videos as VideoType[]);

  const groupedVideos = groupSubsVideos(videos, sort);

  return (
    <div className="mt-12 flex flex-col gap-16">
      {groupedVideos.map(([dateLabel, videos]) => (
        <div key={dateLabel}>
          <h2>{dateLabel}</h2>
          <div className="mt-4 items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10">
            {videos?.map((video) => (
              <VideosListItem key={video?._id} video={video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionsVideos;
