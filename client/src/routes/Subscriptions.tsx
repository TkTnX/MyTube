import { UserType } from "../types";
import SubscriptionsVideos from "../components/Subscriptions/SubscriptionsVideos";
import { useOutletContext } from "react-router-dom";

const SubscriptionsPage = () => {
  const subs = useOutletContext();

  return (
    <div className="max-w-full overflow-x-hidden w-full">
      <SubscriptionsVideos subs={subs as UserType[] || []} />
    </div>
  );
};

export default SubscriptionsPage;
