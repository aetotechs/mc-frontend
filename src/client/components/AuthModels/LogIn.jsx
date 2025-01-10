import { useState } from "react";

import { LogInForm } from "../../authforms/LogIn";
import { ForgotPasswordForm } from "../../authforms/ForgotPasswordForm";
import { ResetPasswordForm } from "../../authforms/ResetPasswordForm";

export function Login() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const BackToLogin = () => {
    setCurrentStep(1);
  };
  return (
    <>
      {currentStep === 1 && (
        <>
          <span className="text-left font-bold text-[24px]">
            Welcome to MyCrib
          </span>
          <p className="flex text-base  ">
            <span className="font-normal text-[#62636C] ">No account?</span>
            <span className="font-medium">Signup</span>
          </p>
          <LogInForm />

          <span
            className="text-[#1D84C9] text-sm text-center cursor-pointer"
            onClick={handleNextStep}
          >
            Forgot your password?
          </span>

          <div className="flex items-center gap-5">
            <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
            <span className="text-lg my-1 font-normal text-[#80828D]">or</span>
            <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
          </div>

          <div className="flex border border-[#CDCED7] rounded-[8px] justify-around py-2 ">
            <div className="w-5 h-5 object-cover">
              <img src="/logos/google.png" alt="Google" />
            </div>
            <span className="font-medium">Continue with Google</span>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <span className="text-left font-bold text-[24px]">
            Reset your password
          </span>
          <p className="flex text-base  ">
            <span className="font-normal text-[#62636C] ">
              We’ll email you a link to reset your password.
            </span>
          </p>
          <ForgotPasswordForm handleClick={handleNextStep} />

          <span
            className="text-sm text-[#1D84C9] text-center cursor-pointer"
            onClick={BackToLogin}
          >
            Back to Sign In
          </span>
        </>
      )}

      {currentStep === 3 && (
        <>
          <span className="text-left font-bold text-[24px]">
            Set your new password
          </span>
          <p className="flex text-base  ">
            <span className="font-normal text-[#62636C] ">
              Create a strong password for your account{" "}
            </span>
          </p>
          <ResetPasswordForm />

          <span
            className="text-sm text-[#1D84C9] text-center cursor-pointer"
            onClick={BackToLogin}
          >
            Back to Sign In
          </span>
        </>
      )}
    </>
  );
}
