import { twMerge } from "tailwind-merge";
import { validationSchema } from "../../schemas/videoValidationSchema";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errors?: z.typeToFlattenedError<z.infer<typeof validationSchema>> | null;
}

const Input = (props: InputProps) => {
  return (
    <>
      <input
        {...props}
        placeholder={`${props.placeholder} ${
          props.required ? "(required)" : ""
        }`}
        className={twMerge(
          "border-white border p-4 bg-inherit w-full rounded-xl  placeholder:text-[#b7b7b7]",
          props.className
        )}
      />
      <ErrorMessage
        error={
          props.errors?.fieldErrors?.[
            props.name as keyof z.infer<typeof validationSchema>
          ]?.[0]
        }
      />
    </>
  );
};

export default Input;
