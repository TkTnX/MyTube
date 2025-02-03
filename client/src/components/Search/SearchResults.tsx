import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useVideoControls } from "../../hooks/useVideoControls";
import VideoPlaylistItem from "../ui/VideoPlaylistItem";

const SearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams] = useSearchParams();
  const { type, sortBy, date } = Object.fromEntries(searchParams);
  const { getVideos } = useVideoControls({ videoId: "" });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["search", searchQuery, type, sortBy, date],
    queryFn: async () => {
      switch (type) {
        case "videos":
          return await getVideos({ searchQuery });
        case "channels":
          break;
        case "playlists":
          break;
        default:
          break;
      }
    },
  });

  if (isError) return <span>Error: {error.message}</span>;

  if (isPending) return <p>Loading...</p>;
  if (!data) return <p>No results</p>;
  return (
    <div className="w-full mt-11 flex flex-col gap-10">
      {data.length > 0 ? (
        data.map((video) => <VideoPlaylistItem key={video._id} video={video} />)
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default SearchResults;
