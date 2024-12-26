import HeaderLeft from "./HeaderLeft";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";

// * TODO: Main section категории (как на макете)
// * TODO: Main section с видео 
// TODO: CLERK


const Header = () => {
  return (
    <header className="mx-4 sm:mx-8 xl:mx-16 h-20 flex items-center justify-between">
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
