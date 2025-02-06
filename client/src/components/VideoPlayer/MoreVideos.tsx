import {  UserType } from "../../types";
import MoreAuthorVideos from "./MoreAuthorVideos";
import RelatedVideos from "./RelatedVideos";

const MoreVideos = ({
  author,
  id,
  category,
}: {
  author: UserType;
  id: string;
  category: string;
}) => {
  return (
    <div className="w-full xl:w-1/4 h-full">
      {/* FROM AUTHOR */}
      <MoreAuthorVideos videoId={id} author={author} />
      {/* Related Videos */}
      <RelatedVideos videoId={id} author={author} videoCategory={category} />
    </div>
  );
};

export default MoreVideos;
