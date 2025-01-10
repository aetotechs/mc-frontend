import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  
});

export function ForgotPasswordForm({ handleClick }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
     
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (handleClick) handleClick();
  };

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 gap-4 my-3"
    >
      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">Email</label>
        <InputText
          type="email"
          placeholder="doe@example.com"
          {...register("email")}
          className="border-[#CDCED7] shadow-none rounded-[8px] w-full border px-1 py-1.5 placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

     

      <div className="col-span-2">
        <Button
          type="submit"
          className="w-full bg-[#2F91D7] flex justify-center text-white rounded-[8px] py-1.5 font-semibold text-base"
        >
        Send Link
        </Button>
      </div>
    </form>
  );
}
