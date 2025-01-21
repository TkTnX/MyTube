import { useOutletContext } from "react-router-dom";
import { AuthorType } from "../types";
import { Eye, Info, Link2, Mail } from "lucide-react";
import { useChannelStore } from "../stores/useChannelStore";

const ChannelAbout = () => {
  const channel: AuthorType = useOutletContext();
  const authorVideos = useChannelStore((state) => state.authorVideos);
  const totalViews = authorVideos.reduce((a, b) => a + b.views, 0);
  return (
    <div className="mt-7 flex items-start justify-between flex-col-reverse lg:flex-row gap-10 lg:gap-0">
      {channel.description && channel.description !== "" && (
        <div className="lg:w-1/2">
          <h4 className="font-semibold text-lg">Description</h4>
          <p className="text-sm lg:text-base leading-6">
            {channel.description}
          </p>
        </div>
      )}
      <div className="grid gap-5">
        <h4 className="font-semibold text-lg">Channel Details</h4>
        <div>
          <div className="flex items-center gap-4">
            <Mail size={24} color="#888888" />
            <span className="ml-2">{channel.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Eye size={24} color="#888888" />
            <span className="ml-2">{totalViews} views</span>
          </div>
          <div className="flex items-center gap-4">
            <Link2 size={24} color="#888888" />
            <span className="ml-2">
              http://localhost:5173/channel/{channel.username}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Info size={24} color="#888888" />
            <span className="ml-2">
              {new Date(channel.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelAbout;
