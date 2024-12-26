import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-full flex items-center justify-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
