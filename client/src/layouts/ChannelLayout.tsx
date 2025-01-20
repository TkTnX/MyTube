import { Outlet, useParams } from "react-router-dom";
import ChannelTop from "../components/Channel/ChannelTop";
import ChannelLinks from "../components/Channel/ChannelLinks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useChannelStore } from "../stores/useChannelStore";

const getChannel = async (username: string) => {
  try {
    const channel = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/channels/${username}`
    );

    return channel.data;
  } catch (error) {
    console.log(error);
  }
};

const ChannelLayout = () => {
  const { username } = useParams();
  const { setSubscribers } = useChannelStore();
  const getAuthorVideos = useChannelStore((state) => state.getAuthorVideos);
  const { isLoading, isError, data, error } = useQuery({
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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error: {error?.message}</div>;

  return (
    <div className="w-full overflow-x-hidden">
      <ChannelTop channel={data} />
      <ChannelLinks channelUsername={data.username} />

      <Outlet context={data} />
    </div>
  );
};

export default ChannelLayout;
