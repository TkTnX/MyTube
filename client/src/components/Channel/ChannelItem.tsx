import { Link } from "react-router-dom";
import { AuthorType } from "../../types";
import SubscribeButton from "../ui/SubscribeButton";

const ChannelItem = ({ channel }: { channel: AuthorType }) => {
  return (
    <Link
      to={`/channel/${channel.username}`}
      className="flex flex-col lg:flex-row items-start gap-3 lg:items-center lg:gap-10 justify-between relative z-[1]"
    >
      <img
        className="rounded-full object-cover bg-[#aaa] max-w-[136px] max-h-[136px] min-w-[136px] min-h-[136px]"
        src={channel.img}
        width="136"
        height="136"
        alt={channel.username}
      />
      <div className="flex justify-between lg:justify-normal w-full items-center gap-3 lg:gap-10 text-sm ">
        <div className="flex-1 w-full">
          <h5 className="text-[#aaa]">{channel.username}</h5>
          <p className="text-[#aaa]">
            {channel.subscribers.length} subscribers
          </p>
          {channel.description && (
            <p className="big-text text-[#aaa] ">{channel.description}</p>
          )}
        </div>
        <div className="w-[1px] h-[90px] bg-[#333]" />
        <SubscribeButton channelId={channel._id} user={null} />
      </div>
    </Link>
  );
};

export default ChannelItem;
