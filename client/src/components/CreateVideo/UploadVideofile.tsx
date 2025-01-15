import { Upload } from "lucide-react";
import { z } from "zod";
import { validationSchema } from "../../schemas/videoValidationSchema";

type UploadVideofileProps = {
  loading: boolean;
  ref: React.RefObject<HTMLInputElement | null>;
  errors: z.typeToFlattenedError<z.infer<typeof validationSchema>> | null;
};

const UploadVideofile = ({ loading, ref, errors }: UploadVideofileProps) => {
  return (
    <>
      <button
        disabled={loading}
        onClick={() => ref.current!.click()}
        type="button"
        className="bg-[#1f1f1f] p-8 rounded-full hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Upload color="#909090" size={80} />
      </button>
      <p className="text-lg">
        Drag and drop the files here or click the button below to select them on
        your computer.
      </p>
      <button
        disabled={loading}
        onClick={() => ref.current!.click()}
        type="button"
        className="text-lg text-black bg-white px-4 py-2 rounded-full font-medium hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Select Files
      </button>
      {errors?.fieldErrors?.videoUrl && (
        <p className="text-red-500">{errors?.fieldErrors?.videoUrl[0]}</p>
      )}
    </>
  );
};

export default UploadVideofile;
