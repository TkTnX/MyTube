import { Search, User } from "lucide-react";
import Image from "../ui/Image";

const HeaderActions = () => {
  return (
    <div className="flex items-center  gap-2 xl:gap-6">
      <button className="md:hidden hover:opacity-80 transition" type="button">
        <Search color="#fff" width={24} height={24} />
      </button>
      <button className="hover:opacity-80 transition">
        <Image
          width="24"
          height="24"
          src="/icons/addContent.svg"
          alt="Add Content"
        />
      </button>
      <button className="hover:opacity-80 transition">
        <Image
          width="24"
          height="24"
          src="/icons/notifications.svg"
          alt="Notifications"
        />
      </button>
      <button className="hidden sm:block hover:opacity-80 transition">
        <Image
          width="24"
          height="24"
          src="/icons/settings.svg"
          alt="Settings"
        />
      </button>
      <button className="w-6 h-6 rounded-full hover:opacity-80 transition">
        <User />
      </button>
    </div>
  );
}

export default HeaderActions