import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "../../../utils/context/AuthContext";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  newpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function Login() {
  const { dispatchAuth } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver(
      currentStep === 1
        ? loginSchema
        : currentStep === 2
        ? forgotPasswordSchema
        : resetPasswordSchema
    ),
    defaultValues: {
      email: "",
      password: "",
      newpassword: "",
    },
  });

  const _handleSubmit = (data) => {
    if(!trigger()){
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    }, 3000)
    console.log("Form Data:", data);
  };

  const handleBackToLogin = () => {
    setCurrentStep(1);
  };

  const handleForgotPassword = () => {
    setCurrentStep(2);
  };

  const handleContinueWithGoogle = () => {
    confirm("Continuing with google");
    console.log("Logged in with googlr");
  };

  const togglePasswordVisibility = () =>
    setPasswordVisible((prev) => !prev);
  const toggleNewPasswordVisibility = () =>
    setNewPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
      {currentStep === 1 && (
        <>
          <div className="grid gap-3">
            <div className="">
              <p className="text-left font-[600] text-xl">Welcome back to MyCrib</p>
              <p className="flex gap-2 text-base">
                <span className="text-[#62636C] text-xs">No account? </span>
                <p onClick={() => dispatchAuth(true, false, true) } className="font-medium text-xs text-blue-400 hover:text-blue-700 cursor-pointer">Signup</p>
              </p>
            </div>
            <div className="">
              <label className="block mb-1 font-medium text-sm">Email</label>
              <InputText
                type="email"
                placeholder="doe@example.com"
                {...register("email")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="">
              <label className="block mb-1 font-medium text-sm">Password</label>
              <div className="relative">
                <InputText
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******"
                  {...register("password")}
                  className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 mt-3 font-semibold`}
                label={ isLoading ? <CardLoadingSpinner color={'black'}/> : "Sign In"}
              />
            <div className="flex justify-center text-sm text-[#1D84C9]">
              <p
                className="cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                <span className="text-lg font-normal text-[#80828D]">
                  or
                </span>
                <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
              </div>
              <button onClick={handleContinueWithGoogle} className="flex items-center border border-[#CDCED7] rounded-[8px] py-2 w-full">
                <div className="w-6 h-6 object-cover mx-6">
                  <img src="/logos/google.png" alt="Google" />
                </div>
                <p className="font-medium flex-1 text-center">Continue with Google</p>
              </button>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h2 className="text-left font-bold text-xl">
            Reset your password
          </h2>
          <p className="text-xs text-[#62636C]">
            We’ll email you a link to reset your password.
          </p>
          <div className="my-6">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <InputText
              type="email"
              placeholder="doe@example.com"
              {...register("email")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
              label={ isLoading ? <CardLoadingSpinner color={'black'}/> : "Send Link"}
            />
          <p
            className="text-sm text-center mt-3 text-[#1D84C9] cursor-pointer"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </p>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h2 className="text-left font-bold text-xl">
            Set your new password
          </h2>
          <p className="text-xs text-[#62636C]">
            Create a strong password for your account.
          </p>
          <div className="grid gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                New Password
              </label>
              <div className="relative">
                <InputText
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******"
                  {...register("password")}
                  className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <InputText
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="******"
                  {...register("newpassword")}
                  className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={toggleNewPasswordVisibility}
                >
                  {newPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.newpassword && (
                <p className="text-red-500 text-sm">
                  {errors.newpassword.message}
                </p>
              )}
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
                label={ isLoading ? <CardLoadingSpinner color={'black'}/> : "Set Password"}
              />
            <p
              className="text-sm text-center text-[#1D84C9] cursor-pointer"
              onClick={handleBackToLogin}
            >
              Back to Sign In
            </p>
          </div>
        </>
      )}
    </form>
  );
}