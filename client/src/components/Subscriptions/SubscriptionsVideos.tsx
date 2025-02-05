import { UserType, VideoType } from "../../types";
import VideosListItem from "../ui/VideosListItem";

const getDateLabel = (date: string) => {
  const createdAt = new Date(date);
  const now = new Date();

  const diffDays = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SubscriptionsVideos = ({ subs }: { subs: UserType[] }) => {
  const videos = subs.flatMap((sub) => sub.videos as VideoType[]);

  const groupedVideos = videos.reduce((acc, video) => {
    const dateLabel = getDateLabel(video?.createdAt);
    acc[dateLabel] = acc[dateLabel] || [];
    acc[dateLabel].push(video);
    return acc;
  }, {} as Record<string, VideoType[]>);

  const sortedEntries = Object.entries(groupedVideos).sort(([a], [b]) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="mt-12 flex flex-col gap-16">
      {sortedEntries.map(([dateLabel, videos]) => (
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
