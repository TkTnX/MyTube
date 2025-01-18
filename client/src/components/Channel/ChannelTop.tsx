import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { AuthorType } from "../../types";
import Image from "../ui/Image";
import SubscribeButton from "../ui/SubscribeButton";
import { useUser } from "@clerk/clerk-react";

const ChannelTop = ({ channel }: { channel: AuthorType }) => {
  const { user: clerkUserId } = useUser();
  const { user, getUser } = useUserStore();

  useEffect(() => {
    if (!clerkUserId) return;
    getUser(clerkUserId.id);
  }, [clerkUserId]);

  return (
    <div className="">
      <Image
        src={channel.coverImg ?? ""}
        alt={channel.username}
        className="w-full h-[240px] object-cover rounded-3xl"
        height="240"
        width="1920"
      />
      <div className="flex items-start justify-between mt-4">
        <div className="px-6 flex  gap-5 ">
          <Image
            src={channel.img}
            alt={channel.username}
            width="160"
            height="160"
            className="rounded-full object-cover -mt-24"
          />
          <div>
            <h4 className="text-white text-2xl ">{channel.username}</h4>
            <div className="flex items-center gap-2">
              <p className="text-[#aaa]">
                <span className="text-white">{channel.subscribers.length}</span>{" "}
                subscribers
              </p>
              <span className="text-[#aaa]">•</span>
              <p className="text-[#aaa]">
                <span className="text-white">{31}</span> videos
              </p>
            </div>
          </div>
        </div>
        <SubscribeButton channelId={channel._id} user={user} />
      </div>
    </div>
  );
};

export default ChannelTop;
