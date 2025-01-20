import { Link, useLocation } from "react-router-dom";
import { ChannelLinksList } from "../../constants";
import { twMerge } from "tailwind-merge";

const ChannelLinks = ({ channelUsername }: { channelUsername: string }) => {
  const location = useLocation();

  return (
    <div className="sm:px-6 mt-12">
      <div className="flex gap-6 ">
        {ChannelLinksList.map((link) => (
          <Link
            className={twMerge(
              "font-medium text-sm leading-5 text-[#aaa] relative pb-3",
              [
                location.pathname ===
                  `/channel/${channelUsername}${link.href}` &&
                  "text-white after:[content:''] after:bg-[#fa0044] after:absolute after:bottom-0 after:w-full after:block after:rounded-t-full  after:h-[3px] ",
              ]
            )}
            to={`/channel/${channelUsername}${link.href}`}
            key={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="w-full h-[1px] bg-[#333333] " />
    </div>
  );
};

export default ChannelLinks;
