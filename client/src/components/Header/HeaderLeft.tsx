import { Menu } from "lucide-react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { useSidebarStore } from "../../stores/useSidebarStore";

const HeaderLeft = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="flex items-center gap-6">
      <button className="hidden sm:block" onClick={toggleSidebar}>
        <Menu />
      </button>
      <Link to="/">
        <Image src="Logo.svg" alt="Logo" width="112" height="24" />
      </Link>
    </div>
  );
};

export default HeaderLeft;
