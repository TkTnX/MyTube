import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useChannelControls } from "../hooks/useChannelControls";
import VideosListItem from "../components/ui/VideosListItem";
import { VideoType } from "../types";

const SubscriptionsChannelPage = () => {
  const { username } = useParams();
  const { getChannel } = useChannelControls();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["subscriptions", username],
    queryFn: () => getChannel(username as string),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  console.log(data);

  return (
    <div className="w-full mt-4">
      <h3 className=" text-2xl big-text-one font-bold">{username}'s videos</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10 mt-10">
        {data.videos.map((video: VideoType) => (
          <VideosListItem video={{ ...video, author: data }} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsChannelPage;
