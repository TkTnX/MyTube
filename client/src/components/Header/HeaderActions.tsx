import { Loader2, Search, User } from "lucide-react";
import Image from "../ui/Image";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const HeaderActions = () => {
  return (
    <div className="flex items-center  gap-2 xl:gap-6">
      <button className="md:hidden hover:opacity-80 transition" type="button">
        <Search color="#fff" width={24} height={24} />
      </button>
      <Link to="/create" className="hover:opacity-80 transition">
        <Image
          width="24"
          height="24"
          src="/icons/addContent.svg"
          alt="Add Content"
        />
      </Link>
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
      <SignedIn>
        <button className="w-6 h-6 rounded-full hover:opacity-80 transition">
          <UserButton />
        </button>
      </SignedIn>
      <SignedOut>
        <Link
          to="/sign-in"
          className="w-6 h-6 rounded-full hover:opacity-80 transition"
        >
          <User />
        </Link>
      </SignedOut>
      <ClerkLoading>
        <Loader2 className="w-6 h-6 animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default HeaderActions;
