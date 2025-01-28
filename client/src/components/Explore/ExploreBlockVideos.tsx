import { useQuery } from "@tanstack/react-query";
import { useVideoControls } from "../../hooks/useVideoControls";
import { useSearchParams } from "react-router-dom";
import VideosListItem from "../ui/VideosListItem";
import VideosSkeleton from "../ui/VideosSkeleton";

const ExploreBlockVideos = ({ category }: { category: string }) => {
  const { getVideos } = useVideoControls({ videoId: "" });
  const [searchParams] = useSearchParams();
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["videos", searchParams.get("sortQuery")],
    queryFn: () =>
      getVideos(
        searchParams.get("category") || "",
        4,
        searchParams.get("sortQuery") || ""
      ),
  });

  console.log(category);
  if (isError) return <span>Error: {error.message}</span>;

  if (isPending) return <VideosSkeleton className="mt-7" count={4} />;

  return (
    <div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
      {data.map((video) => (
        <VideosListItem key={video._id} video={video} />
      ))}
    </div>
  );
};

export default ExploreBlockVideos;
