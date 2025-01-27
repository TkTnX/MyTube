import { useQuery } from "@tanstack/react-query";
import { useVideoControls } from "../../hooks/useVideoControls";
import { useSearchParams } from "react-router-dom";
import VideosListItem from "../ui/VideosListItem";

const ExploreBlockVideos = () => {
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

  if (isError) return <span>Error: {error.message}</span>;

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="mt-7 grid grid-cols-4  gap-4">
      {data.map((video) => (
        <VideosListItem key={video._id} video={video} />
      ))}
    </div>
  );
};

export default ExploreBlockVideos;
