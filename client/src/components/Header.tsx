import { Menu, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-16 h-20 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <button>
          <Menu />
        </button>
        <Link to="/">
          <img src="/Logo.svg" alt="Logo" />
        </Link>
      </div>
      {/* CENTER */}
      <div className="">
        <form className="flex items-center gap-3  border border-[#2a2a2a] rounded-full px-4 w-[727px]">
          <button type="button">
            <Search color="#888888" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none py-3 flex-1 placeholder:text-[#888888]"
          />
        </form>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <button className="hover:opacity-80 transition">
          <img src="/icons/addContent.svg" alt="Add Content" />
        </button>
        <button className="hover:opacity-80 transition">
          <img src="/icons/notifications.svg" alt="Notifications" />
        </button>
        <button className="hover:opacity-80 transition">
          <img src="/icons/settings.svg" alt="Settings" />
        </button>
        <button className="w-6 h-6 rounded-full hover:opacity-80 transition">
          <User />
        </button>
      </div>
    </header>
  );
};

export default Header;
