import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),

  newpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export function ResetPasswordForm({ handleClick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newpassword: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (handleClick) handleClick();
  };

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleNewPassword = () => setNewPasswordVisible(!newPasswordVisible);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 gap-4 my-3"
    >
      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">New Password</label>
        <div className="relative">
          <InputText
            type={passwordVisible ? "text" : "password"}
            placeholder="******"
            {...register("password")}
            className="border-[#CDCED7] shadow-none rounded-[8px] w-full border px-1 py-1.5 placeholder:text-sm focus-within:border-[#6CAFE6]"
          />
          <span
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            onClick={togglePassword}
          >
            {passwordVisible ? (
              <EyeIcon className="w-5 text-gray-500" />
            ) : (
              <EyeOffIcon className="w-5 text-gray-500" />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">
          Confirm Password
        </label>
        <div className="relative">
          <InputText
            type={toggleNewPassword ? "text" : "password"}
            placeholder="******"
            {...register("newpassword")}
            className="border-[#CDCED7] shadow-none rounded-[8px] w-full border px-1 py-1.5 placeholder:text-sm focus-within:border-[#6CAFE6]"
          />
          <span
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            onClick={togglePassword}
          >
            {toggleNewPassword ? (
              <EyeIcon className="w-5 text-gray-500" />
            ) : (
              <EyeOffIcon className="w-5 text-gray-500" />
            )}
          </span>
        </div>
        {errors.newpassword && (
          <p className="text-red-500 text-sm">{errors.newpassword.message}</p>
        )}
      </div>

      <div className="col-span-2 my-2">
        <Button
          type="submit"
          className="w-full bg-[#2F91D7] flex justify-center text-white rounded-[8px] py-1.5 font-semibold text-base"
        >
          Set Password
        </Button>
      </div>
    </form>
  );
}
