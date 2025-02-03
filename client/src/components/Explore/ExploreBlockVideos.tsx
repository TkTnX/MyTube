import { useQuery } from "@tanstack/react-query";
import { useVideoControls } from "../../hooks/useVideoControls";
import { useSearchParams } from "react-router-dom";
import VideosListItem from "../ui/VideosListItem";
import { VideosListSkeleton } from "../Skeletons";

const ExploreBlockVideos = ({
  category,
  currentFilter,
}: {
  category: string;
  currentFilter: number;
}) => {
  const { getVideos } = useVideoControls({ videoId: "" });
  const [searchParams] = useSearchParams();
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["videos", currentFilter, category],
    queryFn: () =>
      getVideos(
        searchParams.get("category") || category,
        4,
        String(currentFilter)
      ),
  });

  if (isError) return <span>Error: {error.message}</span>;

  if (isPending) return <VideosListSkeleton className="mt-7" count={4} />;

  if (data.length === 0)
    return (
      <p className="text-center mt-10 text-xs text-[#aaa]">
        No {category} videos yet
      </p>
    );

  return (
    <div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
      {data.map((video) => (
        <VideosListItem key={video._id} video={video} />
      ))}
    </div>
  );
};

export default ExploreBlockVideos;
