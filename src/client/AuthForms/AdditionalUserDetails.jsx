import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";

const FormSchema = z.object({
  phoneNumber: z.string().min(10, { message: "Field is required." }),
  username: z.string().min(2, { message: "Field is required." }),
  country: z.string().min({ message: "Field is required." }),
  city: z.string().min({ message: "Field is required." }),
  street: z.string().min({ message: "Field is required." }),
  postalCode: z.string().min({ message: "Field is required." }),
  gender: z.string().min({ message: "Field is required." }),
});

export function AdditionalUserDetailsForm({ handleClick }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      username: "",
      country: "",
      city: "",
      country: "",
      postalCode: "",
      street: "",
      gender: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
   
  };

 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 gap-4 my-3"
    >
      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Phone number</label>
        <InputText
          type="text"
          placeholder="+256708210793"
          {...register("phoneNumber")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Username</label>
        <InputText
          type="text"
          placeholder="Mark"
          {...register("username")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Country</label>
        <InputText
          type="country"
          placeholder="e.g., Uganda"
          {...register("country")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">City</label>
        <InputText
          type="text"
          placeholder="e.g., Kampala"
          {...register("city")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Street</label>
        <InputText
          type="text"
          placeholder="e.g., Plot 24 Kampala Rd"
          {...register("street")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.street.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Postal Code</label>
        <InputText
          type="text"
          placeholder="e.g., 256"
          {...register("postalCode")}
          className="border-[#CDCED7] rounded-[8px] w-full border px-1 py-1.5 shadow-none  placeholder:text-sm focus-within:border-[#6CAFE6]"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Male"
              {...register("gender")}
              className="accent-blue-500"
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Female"
              {...register("gender")}
               className="accent-blue-500"
            />
            Female
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Other"
              {...register("gender")}
              className="accent-blue-500"
            />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      <div className="col-span-2 flex justify-between my-10">

      <Button
      onClick={handleClick}
          type="submit"
          className="  flex justify-center text-black font-medium  text-[15px] rounded-[8px] px-1.5 py-1 "
        >
        Back
        </Button>
        <Button
          type="submit"
          className=" bg-[#2F91D7] flex justify-center text-white rounded-[8px] py-1 px-2"
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
