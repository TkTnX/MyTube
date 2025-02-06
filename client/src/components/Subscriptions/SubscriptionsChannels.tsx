import { Link, useLocation } from "react-router-dom";
import { UserType } from "../../types";
import { SubscriptionsChannelsSkeleton } from "../Skeletons";
import { twMerge } from "tailwind-merge";

type Props = {
  subs: UserType[];
  value: string;
};

const SubscriptionsChannels: React.FC<Props> = ({ subs, value }) => {
  const location = useLocation();
  if (!subs || typeof subs[0] === "string")
    return <SubscriptionsChannelsSkeleton />;
  const filteredSubs = subs?.filter((sub) =>
    sub?.username?.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div>
      <h4 className="font-semibold text-lg flex items-center gap-2 mt-4">
        Your subscriptions{" "}
        <span className="text-[#aaa] text-sm font-normal">{subs.length}</span>
      </h4>
      <div className="flex items-center gap-2 mt-4 overflow-x-auto  ">
        {filteredSubs.length > 0 ? (
          filteredSubs.map((sub) => (
            <Link
              className={twMerge(
                "hover:opacity-80 transition p-1",
                location.pathname === `/subscriptions/${sub.username}` &&
                  "bg-[#332729] rounded "
              )}
              to={`/subscriptions/${sub.username}`}
              key={sub._id}
            >
              <img
                src={sub.img}
                alt={sub.username}
                width={56}
                height={56}
                className="w-14 h-14 min-w-14 min-h-14 rounded-full object-cover bg-[#aaa]"
              />
              <p
                className={twMerge(
                  "text-center text-xs text-[#aaa]",
                  location.pathname === `/subscriptions/${sub.username}` &&
                    "font-semibold text-white"
                )}
              >
                {sub.username}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-xs text-[#aaa] ">No subscriptions</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsChannels;
