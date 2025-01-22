import { useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import Input from "../components/ui/Input";
import { toast } from "react-toastify";
import { updateUserSchema } from "../schemas/updateUserSchema";
import { z } from "zod";
import UploadMedia from "../components/ui/UploadMedia";

const UpdateChannelPage = () => {
  const [img, setImg] = useState<string | null>(null);
  const ikUploadImgRef = useRef<null | HTMLInputElement>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const ikUploadCoverImgRef = useRef<null | HTMLInputElement>(null);

// TODO: Добавить хук, как в добавлении видео

  const [errors, setErrors] = useState<z.typeToFlattenedError<
    z.infer<typeof updateUserSchema>
  > | null>(null);

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
        username: formData.get("username") || user.email,
        email: formData.get("email") || user.email,
        description: formData.get("description") || user.description,
        img: img !== null ? img : user.img,
        coverImg: coverImg !== null ? coverImg : user.coverImg,
      };
      const result = updateUserSchema.safeParse(data);
      if (!result.success) return setErrors(result.error.flatten());
      // TODO: Доделать обновление канала
      console.log(data);
      setErrors(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onSuccessImg = (res: { url?: string }) => {
    setImg(res.url!);
    toast.success("Avatar file uploaded!");
  };
  const onSuccessCoverImg = (res: { url?: string }) => {
    setCoverImg(res.url!);
    toast.success("Cover file uploaded!");
  };

  console.log(errors);
  return (
    <div className="w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start  justify-between gap-3 lg:gap-0  lg:justify-evenly"
      >
        <div>
          <UploadMedia
            folder="images"
            // TODO: video-previews заменить на images/videos, а в добавлении видео использовать folder
            type="video-previews"
            ref={ikUploadImgRef}
            onSuccess={onSuccessImg}
            onUploadProgress={() => {}}
            onError={() => {}}
          />
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
            onClick={() => ikUploadImgRef.current?.click()}
            className="rounded-full w-40 h-40 bg-[#1d1d1d] flex flex-col items-center justify-center hover:opacity-80 transition gap-2"
          >
            <Plus />
            <span>Your Avatar</span>
          </button>
          {errors?.fieldErrors?.img && (
            <p className="text-red-500">{errors?.fieldErrors?.img}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 lg:flex-none w-full lg:w-1/2">
          <button
            type="button"
            onClick={() => ikUploadCoverImgRef.current?.click()}
            className="rounded-md w-full h-40 bg-[#1d1d1d] flex items-center justify-center hover:opacity-80 transition gap-2"
          >
            <Plus />
            <span>Cover Image</span>
          </button>
          {errors?.fieldErrors?.coverImg && (
            <p className="text-red-500">{errors?.fieldErrors?.coverImg}</p>
          )}
          <Input errors={errors} placeholder="Username" name="username" />
          <Input errors={errors} placeholder="Email" name="email" />
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
        </div>
      </form>
    </div>
  );
};

export default UpdateChannelPage;
