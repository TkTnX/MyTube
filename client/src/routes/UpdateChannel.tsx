// TODO: Изменять аватарку
// TODO: Изменять бг канала
// TODO: Изменять название канала

import { useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import Input from "../components/ui/Input";

const UpdateChannelPage = () => {
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

  return (
    <div className="w-full mt-10">
      <form className="flex flex-col md:flex-row items-center md:items-start  justify-between gap-3 lg:gap-0  lg:justify-evenly">
        <button className="rounded-full w-40 h-40 bg-[#1d1d1d] flex flex-col items-center justify-center hover:opacity-80 transition gap-2">
          <Plus />
          <span>Your Avatar</span>
        </button>
        <div className="flex flex-col gap-2 flex-1 lg:flex-none w-full lg:w-1/2">
          <button className="rounded-md w-full h-40 bg-[#1d1d1d] flex items-center justify-center hover:opacity-80 transition gap-2">
            <Plus />
            <span>Cover Image</span>
          </button>
          <Input placeholder="Username" name="username" />
          <Input placeholder="Email" name="email" />
          <textarea
            name="description"
            className=" border-white border p-4 bg-inherit w-full rounded-xl  placeholder:text-[#b7b7b7]"
            placeholder="Description"
          ></textarea>
          <button className="bg-[#fff] text-[#1d1d1d] py-2 rounded-full hover:opacity-80 transition">
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateChannelPage;
