import { Link } from "react-router-dom";
import { UserType } from "../../types";
import AvatarLink from "../ui/AvatarLink";

type Props = {
  author: UserType;
  className?: string;
};

const PlaylistAuthor: React.FC<Props> = ({ author, className }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <AvatarLink username={author.username} img={author.img} />
      <Link to={`/channel/${author.username}`}>{author.username}</Link>
      <p className="text-[#aaa] text-sm ">
        {author.subscribers.length} subscribers
      </p>
    </div>
  );
};

export default PlaylistAuthor;
