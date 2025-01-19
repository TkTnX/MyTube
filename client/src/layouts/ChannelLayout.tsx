import { Outlet, useParams } from "react-router-dom";
import ChannelTop from "../components/Channel/ChannelTop";
import ChannelLinks from "../components/Channel/ChannelLinks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["channel", username],
    queryFn: async () => {
      if (!username) throw new Error("Username not found");
      return await getChannel(username);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error: {error?.message}</div>;
  return (
    <div className="">
      <ChannelTop channel={data} />
      <ChannelLinks channelUsername={data.username} />

      <Outlet context={data} />
    </div>
  );
};

export default ChannelLayout;
