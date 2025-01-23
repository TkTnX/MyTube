import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { AuthorType } from "../../types";
import SubscribeButton from "../ui/SubscribeButton";
import { useUser } from "@clerk/clerk-react";
import { useChannelStore } from "../../stores/useChannelStore.ts";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Image from "../ui/Image.tsx";

const ChannelTop = ({ channel }: { channel: AuthorType }) => {
  const { subscribers, authorVideos } = useChannelStore();
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
      <div className="flex items-center text-center sm:text-left sm:items-start justify-between mt-4 flex-col xl:flex-row gap-2">
        <div className="lg:px-6 flex flex-col  xl:flex-row gap-5 ">
          <img
            src={channel.img}
            alt={channel.username}
            width="160"
            height="160"
            className={twMerge(
              "rounded-full object-cover bg-[#343434] max-w-[160px] max-h-[160px]",
              [channel.coverImg && channel.coverImg !== "" && "-mt-24"]
            )}
          />
          <div>
            <h4 className="text-white text-2xl ">{channel.username}</h4>
            <div className="flex items-center gap-2">
              <p className="text-[#aaa]">
                <span className="text-white">{subscribers}</span> subscribers
              </p>
              <span className="text-[#aaa]">•</span>
              <p className="text-[#aaa]">
                <span className="text-white">{authorVideos.length}</span> videos
              </p>
              {channel.subscribers && (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[#aaa]">•</span>
                  <p className="text-white max-w-40 big-text-one">
                    {channel.description}
                  </p>
                  <Link
                    to={`/channel/${channel.username}/about`}
                    className="text-[#aaa] hover:underline "
                  >
                    more
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {channel.clerkId !== user?.clerkId && (
          <SubscribeButton
            className="w-full sm:w-auto"
            channelId={channel._id}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelTop;
