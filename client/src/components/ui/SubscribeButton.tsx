import { twMerge } from "tailwind-merge";
import { UserType } from "../../types";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useChannelStore } from "../../stores/useChannelStore";
import { useChannelControls } from "../../hooks/useChannelControls";

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
  const { onSubscribe } = useChannelControls();
  const { subscribers, setSubscribers } = useChannelStore();
  const [subscribed, setSubscribed] = useState(
    typeof user?.subscriptions[0] === "string" &&
      (user.subscriptions as string[]).includes(channelId)
  );

  useEffect(() => {
    setSubscribed(
      typeof user?.subscriptions[0] === "string" &&
        (user.subscriptions as string[]).includes(channelId)
    );
  }, [user, channelId]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const res = await onSubscribe({ channelId, clerkUserId: user.clerkId });
      setSubscribed(res.subscribed);
      setSubscribers(subscribers + (res.subscribed ? 1 : -1));
    },
  });

  const optimisticUpdate = () => {
    if (mutation.isPending) {
      return {
        bg: subscribed ? "bg-[#cc2849]" : "bg-[#4f4b4a]",
        text: subscribed ? "Subscribe" : "You Subscribed",
      };
    }
    return {
      bg: subscribed ? "bg-[#4f4b4a]" : "bg-[#cc2849]",
      text: subscribed ? "You Subscribed" : "Subscribe",
    };
  };

  return (
    <button
      onClick={() => mutation.mutate()}
      className={twMerge(
        "rounded-3xl py-2 px-6 font-medium  hover:opacity-80 transition-opacity text-nowrap",
        [optimisticUpdate().bg],

        className
      )}
    >
      {optimisticUpdate().text}
    </button>
  );
};

export default SubscribeButton;
