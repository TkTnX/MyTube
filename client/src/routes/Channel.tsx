import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const getChannel = async (username: string) => {
  try {
    const channel = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/channels/${username}`
    );

    console.log(channel.data);

    return channel.data;
  } catch (error) {
    console.log(error);
  }
};

const ChannelPage = () => {
  const { username } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["channel", username],
    queryFn: async () => {
      if (!username) throw new Error("Username not found");
      await getChannel(username);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error: {error.message}</div>;
  console.log(data);

  return <div className="">{data.username}</div>;
};

export default ChannelPage;
