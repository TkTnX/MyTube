import { Outlet } from "react-router-dom";
import SubscriptionsFilters from "../components/Subscriptions/SubscriptionsFilters";
import SubscriptionsChannels from "../components/Subscriptions/SubscriptionsChannels";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import { UserType } from "../types";

const SubscriptionsLayout = () => {
  const [value, setValue] = useState("");
  const { user: clerkUser } = useUser();
  const { user, getUser, error } = useUserStore();

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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10">
      <SubscriptionsFilters setValue={setValue} />
      <SubscriptionsChannels
        value={value}
        subs={user?.subscriptions as UserType[]}
      />
      <Outlet context={user?.subscriptions} />
    </div>
  );
};

export default SubscriptionsLayout;
