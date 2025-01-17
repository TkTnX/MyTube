import axios from "axios";
import { twMerge } from "tailwind-merge";
import { UserType } from "../../types";
import { useEffect, useState } from "react";

type SubscribeButtonProps = {
  channelId: string;
  user: UserType | null;
  className?: string;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  channelId,
  user,
  className,
}) => {
  const [subscribed, setSubscribed] = useState(
    user?.subscriptions.includes(channelId)
  );

  useEffect(() => {
    setSubscribed(user?.subscriptions.includes(channelId));
  }, [user, channelId]);

  const onSubscribe = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/channels/subscribe/${channelId}`,
        {
          clerkUserId: user?.clerkId,
        }
      );

      setSubscribed(user?.subscriptions.includes(res.data.channelId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={onSubscribe}
      className={twMerge(
        "rounded-3xl py-2 px-6 font-medium  hover:opacity-80 transition text-nowrap",
        [subscribed ? "bg-[#4f4b4a]" : "bg-[#cc2849]"],

        className
      )}
    >
      {subscribed ? "You subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
