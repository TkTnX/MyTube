import { UserType, VideoType } from "../types";

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

export const groupSubsVideos = (subs: UserType[], sort: string) => {
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

  const sortByArray =
    sort === "oldest" ? sortedEntries.reverse() : sortedEntries;

  return sortByArray;
};
