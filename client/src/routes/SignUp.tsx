import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-full flex items-center justify-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
