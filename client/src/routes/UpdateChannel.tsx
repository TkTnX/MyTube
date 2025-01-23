import { useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateUserSchema } from "../schemas/updateUserSchema";
import { z } from "zod";
import UploadMedia from "../components/ui/UploadMedia";
import axios, { AxiosError } from "axios";
import Image from "../components/ui/Image";

const UpdateChannelPage = () => {
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const ikUploadCoverImgRef = useRef<null | HTMLInputElement>(null);

  const [errors, setErrors] = useState<z.typeToFlattenedError<
    z.infer<typeof updateUserSchema>
  > | null>(null);

  // TODO: Хук как в добавлении видео
  // TODO: Улучшить код 

  const { user: clerkUser } = useUser();
  const { user, getUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      if (!clerkUser || !clerkUser.id) {
        navigate("/");
        return;
      }
      await getUser(clerkUser.id);
    }
    fetchUser();
  }, [clerkUser, getUser, navigate]);

  if (!user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const data = {
        description: formData.get("description") || null,
        coverImg: coverImg || user.coverImg,
      };
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.clerkId}`,
        data
      );
      setErrors(null);
      toast.success("Channel updated!");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        axiosError.response?.statusText || "An unexpected error occurred."
      );
    }
  };

  const onSuccessCoverImg = (res: { filePath?: string }) => {
    setCoverImg(res.filePath!);
    console.log(res.filePath);
    toast.success("Cover file uploaded!");
  };
  console.log(user);

  return (
    <div className="w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start  justify-between gap-3 lg:gap-0  lg:justify-evenly"
      >
        <div className="flex flex-col gap-2 flex-1 lg:flex-none w-full lg:w-1/2">
          <UploadMedia
            folder="images"
            // TODO: video-previews заменить на images/videos, а в добавлении видео использовать folder
            type="video-previews"
            ref={ikUploadCoverImgRef}
            onSuccess={onSuccessCoverImg}
            onUploadProgress={() => {}}
            onError={() => {}}
          />
          <button
            type="button"
            onClick={() => ikUploadCoverImgRef.current?.click()}
            className="rounded-md w-full h-40 bg-[#1d1d1d] flex items-center justify-center hover:opacity-80 transition gap-2 relative"
          >
            <Image
              src={user.coverImg ?? ""}
              alt={`${user.username}-cover`}
              className="absolute w-full h-full opacity-30 object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-2 relative z-[2]">
              <Plus />
              <span>Cover Image</span>
            </div>
          </button>
          {errors?.fieldErrors?.coverImg && (
            <p className="text-red-500">{errors?.fieldErrors?.coverImg}</p>
          )}
          <textarea
            name="description"
            className=" border-white border p-4 bg-inherit w-full rounded-xl  placeholder:text-[#b7b7b7]"
            placeholder="Description"
          ></textarea>
          {errors?.fieldErrors?.description && (
            <p className="text-red-500">{errors?.fieldErrors?.description}</p>
          )}
          <button className="bg-[#fff] text-[#1d1d1d] py-2 rounded-full hover:opacity-80 transition">
            Update profile
          </button>
          <p className="text-xs text-[#aaa]">
            You can change avatar, username and email using avatar button on the
            header
          </p>
        </div>
      </form>
    </div>
  );
};

export default UpdateChannelPage;
