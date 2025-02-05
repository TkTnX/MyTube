import { Link } from "react-router-dom";
import { UserType } from "../../types";

const SubscriptionsChannels = ({ subs }: { subs: UserType[] }) => {
  return (
    <div>
      <h4 className="font-semibold text-lg flex items-center gap-2">
        Your subscriptions{" "}
        <span className="text-[#aaa] text-sm font-normal">{subs.length}</span>
      </h4>
      <div className="flex items-center gap-2 mt-4 overflow-x-auto  ">
        {subs.map((sub) => (
          <Link
            className="hover:opacity-80 transition"
            to={`/channel/${sub.username}`}
            key={sub._id}
          >
            <img
              src={sub.img}
              alt={sub.username}
              width={56}
              height={56}
              className="w-14 h-14 min-w-14 min-h-14 rounded-full object-cover bg-[#aaa]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsChannels;
