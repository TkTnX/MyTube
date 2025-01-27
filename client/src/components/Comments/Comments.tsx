import axios from "axios";
import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";
import { CommentType } from "../../types";
import AddComment from "./AddComment";
import { ArrowDownNarrowWide, Loader2 } from "lucide-react";
import { useState } from "react";
import FilterDropdown from "../ui/FilterDropdown";


const getComments = async (videoId: string, filter: "newest" | "popular") => {
  try {
    const comments = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${videoId}`,
      {
        params: {
          filter,
        },
      }
    );
    if (!comments.data) return null;
    return comments.data;
  } catch (error) {
    console.log(error);
  }
};

const Comments = ({ videoId }: { videoId: string }) => {
  const [filter, setFilter] = useState<"newest" | "popular">("newest");
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["comments", videoId, filter],
    queryFn: () => getComments(videoId, filter),
  });
  if (!videoId) return null;

  if (isError) return <div>Error: {error.message}</div>;
  if (isPending)
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  const onFilter = (value: "newest" | "popular") => {
    setFilter(value);
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center gap-5">
        <h4 className="font-medium text-lg">
          Comments <span>{data.length}</span>
        </h4>
        <FilterDropdown onFilter={onFilter}>
          <button className=" flex items-center gap-2">
            <ArrowDownNarrowWide />
            <span>Filter</span>
          </button>
        </FilterDropdown>
      </div>
      <AddComment videoId={videoId} />
      <div className="mt-10 flex flex-col gap-8">
        {data.length > 0 ? (
          data
            .filter((comment: CommentType) => comment.replyTo === null)
            .map((comment: CommentType) => (
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
