import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { AuthorType, VideoType } from "../types";
import axios from "axios";
import VideosListItem from "../components/ui/VideosListItem";
const getPopularVideos = async (id: string) => {
  try {
    const popularVideos = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/popular/${id}`
    );

    return popularVideos.data;
  } catch (error) {
    console.log(error);
  }
};

const ChannelPage = () => {
  const channel: AuthorType = useOutletContext();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["popularVideos"],

    queryFn: async () => {
      if (!channel._id) throw new Error("Username not found");
      return await getPopularVideos(channel._id);
    },
  });

  if (isError) return <div>Error: {error?.message}</div>;
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="mt-7">
      <h2 className="font-medium text-2xl">Popular videos</h2>

      {/* // TODO: Сделать слайдер */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
        {data.map((video: VideoType) => (
          <VideosListItem video={{ ...video, author: channel }} />
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
