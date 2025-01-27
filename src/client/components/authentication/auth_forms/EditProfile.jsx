import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { useSearchParams } from "react-router-dom";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required." }),
  lastName: z.string().min(2, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),

  phoneNumber: z.string().min(10, { message: "Field is required." }),
  username: z.string().min(2, { message: "Field is required." }),
  gender: z.string().min({ message: "Field is required." }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    postalCode: z.string().min(1, { message: "Postal Code is required." }),
  }),
});

export function EditProfile() {
  const { openDialog } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: searchParams.get("u_email") || "",
      password: "",
      username: "",
      phoneNumber: "",
      gender: "",
      address: {
        street: "",
        city: "",
        country: "",
        postalCode: "",
      },
    },
  });

  const _handleSubmit = (data) => {
    console.log("Form Data:", data);
    searchParams.set("u_email", data.email);
    openDialog(dialog_operations.verify);
    // setIsLoading(true);
  };

  const handleNextStep = async () => {
    const valid = await trigger(["firstName", "lastName", "email", "password"]);
    if (valid) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      <span className="text-left font-[600] text-xl">Edit Profile </span>

      <div className="grid grid-cols-2 gap-6 my-4">
        <p>User details</p>
        <p>Address</p>
      </div>

      {currentStep == 1 && (
        <div className="grid grid-cols-1 gap-y-3">
          <section className="grid grid-cols-2 gap-6 w-[100%]">
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">
                First Name
              </label>
              <InputText
                type="text"
                placeholder="e.g. Mark"
                {...register("firstName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">
                Last Name
              </label>
              <InputText
                type="text"
                placeholder="e.g. Mutwale"
                {...register("lastName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </section>

          <div className="col-span-2">
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


          
          <div className="col-span-2">
            <label className="block mb-1 font-medium text-sm">Gender</label>
            <div className="flex gap-4">
              <label className="text-md flex items-center gap-2">
                <input
                  type="radio"
                  value="MALE"
                  {...register("gender")}
                  className="accent-blue-500"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="FEMALE"
                  {...register("gender")}
                  className="accent-blue-500"
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="OTHER"
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

          <div className="col-span-2">
            <Button
              onClick={handleNextStep}
              label="Update Profile"
              className="w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold"
            />
          </div>
        </div>
      )}

      {currentStep == 2 && (
        <div className="w-full grid grid-cols-2 gap-6 my-3">
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">
              Phone number
            </label>
            <InputText
              type="text"
              placeholder="+2567123456789"
              {...register("phoneNumber")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Username</label>
            <InputText
              type="text"
              placeholder="e.g. Mark"
              {...register("username")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
              {...register("address.country")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm">
                {errors.address.country.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">City</label>
            <InputText
              type="text"
              placeholder="e.g., Kampala"
              {...register("address.city")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Street</label>
            <InputText
              type="text"
              placeholder="e.g., Plot 24 Kampala Rd"
              {...register("address.street")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.address?.street && (
              <p className="text-red-500 text-sm">
                {errors.address.street.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">
              Postal Code
            </label>
            <InputText
              type="text"
              placeholder="e.g., 256"
              {...register("address.postalCode")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-3 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.address?.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.address.postalCode.message}
              </p>
            )}
          </div>


          <div className="col-span-2 flex justify-between my-10">
            <Button
              disabled={isLoading}
              onClick={handlePreviousStep}
              label="Back"
              className="text-black font-medium rounded-[8px] px-4 py-4 "
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[#2F91D7] text-white rounded-[8px] py-4 px-16`}
              label={
                isLoading ? <CardLoadingSpinner color={"black"} /> : "Update Profile"
              }
            />
          </div>
        </div>
      )}
    </form>
  );
}
