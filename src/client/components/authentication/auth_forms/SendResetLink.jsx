import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../../../utils/hooks/useUsers";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export function SendPasswordResetEmail() {
  const { sendPasswordResetToken, loading, success, setSuccess, error, setError } = useUsers();
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();  

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver( forgotPasswordSchema ),
    defaultValues: {
      email: searchParams.get('u_email') || "",
    },
  });

  const _handleSubmit = async (data) => {
    if(!trigger()){
      return;
    }
    setError(""); setSuccess("");
    const res = await sendPasswordResetToken(data.email);
    if(res === "sent") {
      setSuccess("Password reset link sent to your email"); 
      setTimeout(() => {
        handleClose();
      }, 3000)
    }
  };

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <h2 className="text-left font-bold text-xl">
            Reset your password
          </h2>
          <p className="text-xs text-[#62636C]">
            We’ll email you a link to reset your password.
          </p>

          <p className={`${!error && "hidden"} text-center text-xs text-red-500 bg-red-100 p-2 mt-2`}>{error}</p>
          <p className={`${!success && "hidden"} text-center text-xs text-green-500 font-bold bg-green-100 p-2 mt-2`}>{success}</p>

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
              disabled={loading}
              className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
              label={ loading ? <CardLoadingSpinner color={'black'}/> : "Send Link"}
            />
          <p
            className="text-sm text-center mt-3 text-[#1D84C9] cursor-pointer"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </p>
        </>
    </form>
  );
}