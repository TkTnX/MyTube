import HeaderLeft from "./HeaderLeft";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="mx-4 sm:mx-8 xl:mx-16 h-20 flex items-center justify-between sticky top-0 z-10  bg-[#111111]">
      {/* LEFT */}
      <HeaderLeft />
      {/* CENTER */}
      <HeaderSearch />
      {/* RIGHT */}
      <HeaderActions />
    </header>
  );
};

export default Header;
