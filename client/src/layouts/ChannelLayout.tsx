import { Outlet, useParams } from "react-router-dom";
import ChannelTop from "../components/Channel/ChannelTop";
import ChannelLinks from "../components/Channel/ChannelLinks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useChannelStore } from "../stores/useChannelStore";
import { ChannelTopSkeleton } from "../components/Skeletons";
import { useChannelControls } from "../hooks/useChannelControls";

const ChannelLayout = () => {
  const { username } = useParams();
  const { getChannel } = useChannelControls();
  const { setSubscribers } = useChannelStore();
  const getAuthorVideos = useChannelStore((state) => state.getAuthorVideos);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["channel", username],
    queryFn: async () => {
      if (!username) throw new Error("Username not found");
      return await getChannel(username);
    },
  });

  useEffect(() => {
    if (data) {
      getAuthorVideos(data._id, "latest");
    }
  }, [data, getAuthorVideos]);

  useEffect(() => {
    if (data) {
      setSubscribers(data.subscribers.length);
    }
  }, [data, setSubscribers]);

  if (isError && !isPending) return <div>Error: {error?.message}</div>;
  return (
    <div className="w-full overflow-x-hidden">
      {isPending ? <ChannelTopSkeleton /> : <ChannelTop channel={data} />}

      <ChannelLinks channelUsername={data?.username || ""} />

      {!isPending && <Outlet context={data} />}
    </div>
  );
};

export default ChannelLayout;
