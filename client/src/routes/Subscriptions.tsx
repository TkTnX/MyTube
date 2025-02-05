import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import SubscriptionsChannels from "../components/Subscriptions/SubscriptionsChannels";
import { UserType } from "../types";
import SubscriptionsVideos from "../components/Subscriptions/SubscriptionsVideos";

const SubscriptionsPage = () => {
  const { user: clerkUser } = useUser();
  const { user, getUser } = useUserStore();

  useEffect(() => {
    if (!clerkUser || !clerkUser.id) return;
    getUser(clerkUser.id, "subscriptions");
  }, [clerkUser]);

  useEffect(() => {
    if (!user?.subscriptions?.length) return;

    if (typeof user.subscriptions[0] === "string") {
      getUser(clerkUser?.id as string, "subscriptions");
    }
  }, [user?.subscriptions]);

  if (!user || !user.subscriptions || typeof user.subscriptions[0] === "string")
    return null;
  return (
    <div className="max-w-full overflow-x-hidden">
      <SubscriptionsChannels subs={user.subscriptions as UserType[]} />

      <SubscriptionsVideos subs={user.subscriptions as UserType[]} />
    </div>
  );
};

export default SubscriptionsPage;
