import axios from "axios";
import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";
import { CommentType } from "../../types";
import AddComment from "./AddComment";

const getComments = async (videoId: string) => {
  try {
    const comments = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${videoId}`
    );
    if (!comments.data) return null;
    return comments.data;
  } catch (error) {
    console.log(error);
  }
};

const Comments = ({ videoId }: { videoId: string }) => {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => getComments(videoId),
  });
  if (!videoId) return null;

  if (isError) return <div>Error: {error.message}</div>;
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="mt-8 w-full">
      <h4 className="font-medium text-lg">
        Comments <span>{data.length}</span>
      </h4>
      <AddComment videoId={videoId} />
      <div className="mt-10 flex flex-col gap-8">
        {data.length > 0 ? (
          data.map((comment: CommentType) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-xs text-[#aaa] text-center mt-3">No comments</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
