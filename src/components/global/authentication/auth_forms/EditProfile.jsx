import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../../../utilities/loaders/CardLoadingSpinner"
import { dialog_operations } from "../../../../utilities/constants/DialogOperations";
import { useAuthDialog } from "../../../../utilities/hooks/client/useAuthDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuthUser, isAuthenticated } from "../../../../utilities/cookies/AuthCookiesManager";

const user = getAuthUser() || {};
console.log(user);

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string(),
  username: z.string(),
  gender: z.string(),
  shippingAddress: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    zip: z.string().min(1, { message: "Postal Code is required." }),
  }),
});

export function EditProfile() {
  const navigate = useNavigate();
  const { openDialog } = useAuthDialog();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!isAuthenticated()){
      navigate('/');
    }
  },[isAuthenticated()])

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      phone: user.phone ?? "",
      gender: user.gender ?? "",
      shippingAddress: {
        country: user.shippingAddress?.country ?? "",
        state: "UG",
        street: user.shippingAddress?.street ?? "",
        city: user.shippingAddress?.city ?? "",
        zip: user.shippingAddress?.zip ?? "",
      },
    },    
  });

  const _handleSubmit = (data) => {
    console.log("Form Data:", data);
    openDialog(dialog_operations.verify);
  };

  const handleNextStep = async () => {
    const valid = await trigger(["firstName", "lastName", "email", "username", "phone"]);
    if (valid) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      <span className="text-left font-semibold text-xl">Edit Profile</span>

      <div className="relative">
        <div className="flex gap-10 text-[15px] py-1">
          {["User details", "Address"].map((tab, index) => (
            <div key={tab} className="relative">
              <h4
                className={`cursor-pointer ${
                  currentStep === index + 1 ? "text-[#2F91D7] font-semibold" : ""
                }`}
                onClick={() => setCurrentStep(index + 1)}
              >
                {tab}
              </h4>

              {currentStep === index + 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[2px] w-6 h-[3px] bg-[#2F91D7] rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {currentStep == 1 && (
        <div className="grid grid-cols-2 gap-6 gap-y-3 my-3">
     
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">
                First Name
              </label>
              <InputText
                type="text"
                placeholder="e.g. Mark"
                {...register("firstName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
       

         
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">
              Username
              </label>
              <InputText
                disabled
                type="text"
                placeholder="e.g. Mark"
                {...register("username")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">
              phone
              </label>
              <InputText
                type="text"
                placeholder="e.g. Mutwale"
                {...register("phone")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
      

          <div className="col-span-2">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <InputText
              disabled
              type="email"
              placeholder="doe@example.com"
              {...register("email")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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

          <div className="col-span-2 my-2">
            <Button
              onClick={handleNextStep}
              label="Update Profile"
              className="w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold"
            />
          </div>
        </div>
      )}

      {currentStep == 2 && (
        <div className="w-full grid grid-cols-2 gap-4 my-3">

          <div className="col-span-2">
            <label className="block mb-1 font-medium text-sm">Country</label>
            <InputText
              type="country"
              placeholder="e.g., Uganda"
              {...register("shippingAddress.country")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.country && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.country.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium text-sm">City</label>
            <InputText
              type="text"
              placeholder="e.g., Kampala"
              {...register("shippingAddress.city")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.city.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Street</label>
            <InputText
              type="text"
              placeholder="e.g., Plot 24 Kampala Rd"
              {...register("shippingAddress.street")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.street && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.street.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">
              Zip Code
            </label>
            <InputText
              type="text"
              placeholder="e.g., 256"
              {...register("shippingAddress.zip")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-1 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.zip && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.zip.message}
              </p>
            )}
          </div>


          <div className="col-span-2 flex justify-between my-2">
          
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[#2F91D7] text-white text-semibold rounded-[8px] py-2 w-full px-16`}
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
