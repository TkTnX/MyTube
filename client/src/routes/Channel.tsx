import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { AuthorType, VideoType } from "../types";
import axios from "axios";
import VideosListItem from "../components/ui/VideosListItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideosSkeleton from "../components/ui/VideosSkeleton";
const responsive = {
  desktop: {
    breakpoint: { max: 1920, min: 1150 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1150, min: 464 },
    items: 2,
  },
  mobileSmall: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
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
  return (
    <div className="my-7 overflow-hidden w-full">
      <h2 className="font-medium text-2xl">Popular videos</h2>

      <div className="mt-6">
        {isPending ? (
          <VideosSkeleton />
        ) : (
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            draggable={false}
            responsive={responsive}
          >
            {data.map((video: VideoType) => (
              <VideosListItem video={{ ...video, author: channel }} />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
