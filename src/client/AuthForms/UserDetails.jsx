import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required." }),
  lastName: z.string().min(2, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export function UserDetailsForm({ handleClick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (handleClick) handleClick();
  };

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 gap-4"
    >
      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">First Name</label>
        <Input
          type="text"
          placeholder="Enter your first name"
          {...register("firstName")}
          className="border-[#DCE1EC] w-full"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block mb-1 font-medium text-sm">Last Name</label>
        <Input
          type="text"
          placeholder="Enter your last name"
          {...register("lastName")}
          className="border-[#DCE1EC] w-full"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="border-[#DCE1EC] w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium text-sm">Password</label>
        <div className="relative">
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="border-[#DCE1EC] w-full"
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
        <p className="text-sm text-gray-500">
          Must be at least 8 characters long, include a mix of letters, numbers,
          and symbols.
        </p>
      </div>

      <div className="col-span-2">
        <Button type="submit" className="w-full bg-[#C8CFDE] my-4">
          Next
        </Button>
        <p className="text-center text-sm text-gray-500">
          By clicking “Next,” I accept MyCrib's terms of use.
        </p>
      </div>
    </form>
  );
}
