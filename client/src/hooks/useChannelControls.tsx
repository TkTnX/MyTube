import axios from "axios";

export const useChannelControls = () => {
  // ПОЛУЧЕНИЕ КАНАЛОВ ПО USERNAME

  const getAuthors = async ({
    username,
    subscribersQuery,
  }: {
    username: string;
    subscribersQuery?: string;
  }) => {
    try {
      const authors = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/channels/search/${username}`,
        { params: { subscribersQuery } }
      );

      return authors.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ПОЛУЧЕНИЕ КАНАЛА ПО USERNAME

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


  // ПОДПИСКА НА КАНАЛ

  
  const onSubscribe = async ({
    channelId,
    clerkUserId,
  }: {
    channelId: string;
    clerkUserId: string;
  }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/channels/subscribe/${channelId}`,
        { clerkUserId }
      );
  
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAuthors, onSubscribe, getChannel };
};
