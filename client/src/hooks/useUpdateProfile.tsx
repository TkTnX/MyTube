import { useState } from "react";
import { toast } from "react-toastify";

type UpdateVideoProps = {
  setCoverImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const useUpdateProfile = ({ setCoverImg }: UpdateVideoProps) => {
  const [loading, setLoading] = useState(false);

  const onError = (err: string) => {
    console.log("Error", err);
    toast.error(`Something went wrong: ${err}`);
  };

 const onSuccessCoverImg = (res: { filePath?: string }) => {
   setCoverImg(res.filePath!);
   console.log(res.filePath);
   toast.success("Cover file uploaded!");
 };

  const onUploadProgress = (progress: { loaded: number; total: number }) => {
    setLoading(true);
    toast.loading("Uploading...");
    if (progress.loaded === progress.total) {
      setLoading(false);
      toast.dismiss();
    }
  };
  return {
    onError,
    onUploadProgress,
    onSuccessCoverImg,
    loading,
  };
};

export default useUpdateProfile;
