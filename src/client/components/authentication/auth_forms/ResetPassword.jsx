import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../../../utils/hooks/useUsers";
import { decodeToken } from "../../../utils/cookies/AuthCookiesManager";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  newpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function ResetPassword() {
  const { resetPassword, sendPasswordResetToken, loading, success, setSuccess, error, setError } = useUsers();
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const verificationToken = searchParams.get("Verification-Token") || "";
  // const email = searchParams.get('u_email') || "";
  const email = decodeToken(verificationToken).email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: zodResolver( resetPasswordSchema ),
    defaultValues: {
      password: "",
      newpassword: "",
    },
  });

  const _handleSubmit = async (data) => {
    if(!trigger()){
      return;
    }
    setError("");
    setSuccess("");

    if(data.password !== data.newpassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    setSuccess("");
    if(!verificationToken) alert("Invalid reset link. Contact support to fix the issue");
    
    const res = await resetPassword(verificationToken, data.password)
    if(error) return;
    setSuccess(res);

    reset();
  };

  const handleGenerateNewResetToken = async () => {
    const res = await sendPasswordResetToken(email);
    if(res === "sent") {
      setSuccess("Password reset link sent to your email"); 
      setTimeout(() => {
        handleClose();
      }, 3000)
    }
  }

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleNewPasswordVisibility = () => setNewPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <h2 className="text-left font-bold text-xl">
            Set your new password
          </h2>
          <p className="text-xs text-[#62636C]">
            Create a strong password for your account.
          </p>

          <p className={`${!error && "hidden"} text-center text-xs text-red-500 bg-red-100 p-2 mt-2`}>{error}</p>
          <p className={`${!success && "hidden"} text-center text-xs text-green-500 font-bold bg-green-100 p-2 mt-2`}>{success}</p>

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
                  disabled={loading}
                  className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
                  label={ loading ? <CardLoadingSpinner color={'black'}/> : "Set Password"}
                />
              <p
                className="text-sm text-center text-[#1D84C9] cursor-pointer"
                onClick={handleBackToLogin}
              >
                Back to Sign In
              </p>
          </div>

          { success === "Token has expired." &&
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className={`w-full text-[#2F91D7] border-[#2F91D7] border flex mt-4 rounded-lg py-2 font-semibold`}
                label={ loading ? <CardLoadingSpinner color={'black'}/> : "Get new reset link"}
                onClick={handleGenerateNewResetToken}
              />
              <small className="text-center text-gray-400">Link is only valid for 10 minutes</small>
            </div>
          }
        </>
    </form>
  );
}