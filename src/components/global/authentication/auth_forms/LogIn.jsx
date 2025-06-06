import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../../../utilities/loaders/CardLoadingSpinner";
import { useAuthDialog } from "../../../../utilities/hooks/client/useAuthDialog";
import { dialog_operations } from "../../../../utilities/constants/DialogOperations";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../../../../utilities/hooks/client/useUsers";
import CustomToast from "../../ui/CustomToast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function Login() {
  const { loginUser, loading, error, setError } = useUsers();
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [success, setSuccess] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver( loginSchema ),
    defaultValues: {
      email: searchParams.get('u_email') || "",
      password: "",
    },
  });

  const _handleSubmit = async (data) => {
    if(!trigger()){
      return;
    }
    const res = await loginUser({ username: data.email, password: data.password});
    if(res === "success"){
      handleClose();
    }
  };

  const handleForgotPassword = () => {
    openDialog(dialog_operations.reset_email);
  };

  const handleContinueWithGoogle = () => {
    confirm("Continuing with google");
    console.log("Logged in with google");
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="py-8">
      <>
        <div className="grid gap-3">
          <div className="">
            <p className="text-left font-[600] text-[1.6rem]">Welcome back to MyCrib</p>
            <p className="flex gap-2 text-base">
              <span className="text-[#62636C] text-[1rem]">No account? </span>
              <p onClick={() => openDialog(dialog_operations.signup) } className="font-medium text-[1rem] text-blue-400 hover:text-blue-700 cursor-pointer">Signup</p>
            </p>
          </div>
          <div className="">
            <label className="block mb-1 font-medium text-[1rem]">Email</label>
            <InputText
              type="email"
              placeholder="doe@example.com"
              {...register("email")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.email && (
              <p className="text-red-500 text-[.8rem]">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <label className="block mb-1 font-medium text-[1rem]">Password</label>
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
              <p className="text-red-500 text-[.8rem]">{errors.password.message}</p>
            )}
          </div>
          <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 mt-3 font-semibold`}
              label={ loading ? <CardLoadingSpinner color={'black'}/> : "Sign In"}
            />
          <div className="flex justify-center text-[1rem] text-[#1D84C9]">
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
        <div className="col-span-2 mt-4">
          { success && 
          <CustomToast 
            message={success} 
            type="success"
            autoHide
            fillWidth
          />}
          { error && 
          <CustomToast 
            message={error} 
            type="error"
            autoHide
            fillWidth
          />}
        </div>
      </>
    </form>
  );
}