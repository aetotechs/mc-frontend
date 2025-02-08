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
import { useUsers } from "../../../utils/hooks/useUsers";
import CustomToast from "../../ui/CustomToast";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required." }),
  lastName: z.string().min(2, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  phone: z.string().min(10, { message: "Field is required." }),
  username: z.string().min(2, { message: "Field is required." }),
  gender: z.string().min({ message: "Field is required." }),
  shippingAddress: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    state: z.string().min(1, { message: "State is required." }),
    zip: z.string().min(1, { message: "Postal Code is required." }),
  }),
});

export function SignUp() {
  const { openDialog } = useAuthDialog();
  const { createUser, loading, error, setError } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      trigger,
    } = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: searchParams.get('u_email') || "",
        password: "",
        username: "",
        phone: "",
        gender: "",
        shippingAddress: {
          street: "",
          city: "",
          country: "",
          state: "",
          zip: ""
        }

      },
  });

  const _handleSubmit = async (data) => {
    if(!trigger()){
      return;
    }
    setError(""); setSuccess("");
    console.log("Form Data:", data);
    searchParams.set('u_email', data.email);
    const res = await createUser(data);
    console.info(res);
    if(res){
      setSuccess(res);
      reset();
    }
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
    <form onSubmit={handleSubmit(_handleSubmit)} className="overflow-y-auto no-scrollbar">
      <span className="text-left font-[600] text-xl">Welcome to MyCrib </span>
      <p className="flex">
        <p className="font-normal text-xs text-[#62636C] ">
          Already have an account?
        </p>
        <p onClick={() => openDialog(dialog_operations.login) } className="font-medium text-xs text-blue-400 ml-2 cursor-pointer">Signin</p>
      </p>

      <div className="grid grid-cols-2 gap-6 my-4">
        <p className="h-1 bg-[#6CAFE6] rounded-full"></p>
        <p className={`h-1 rounded-full ${currentStep == 2 ? 'bg-[#6CAFE6]' : 'bg-gray-300'}`}></p>
      </div>

      { currentStep == 1 && (
        <div className="grid grid-cols-1 gap-y-3">
          <section className="grid grid-cols-2 gap-6 w-[100%]">
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">First Name</label>
              <InputText 
                type="text"
                placeholder="e.g. Mark"
                {...register("firstName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">Last Name</label>
              <InputText 
                type="text"
                placeholder="e.g. Mutwale"
                {...register("lastName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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
            <p className="text-xs text-gray-500 mt-2 text-[15px] col-span-2">
            At least 8 characters, with an uppercase letter, a lowercase letter, and a number or symbol.
            </p>
          </div>
          <p className="text-xs text-gray-500 col-span-2">
            By clicking “Next,” I accept MyCrib's 
            <span className="font-bold text-black cursor-pointer"> terms of use</span>.
          </p>
          <div className="col-span-2">
            <Button onClick={handleNextStep} label="Next" className="w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold"/>      
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
              <span className="text-lg my-1 font-normal text-[#80828D]">
                or
              </span>
              <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
            </div>
            <button className="flex items-center border border-[#CDCED7] rounded-[8px] py-2 w-full">
              <div className="w-6 h-6 object-cover mx-6">
                <img src="/logos/google.png" alt="Google" />
              </div>
              <p className="font-medium flex-1 text-center">Continue with Google</p>
            </button>
          </div>
        </div>
      )}

      { currentStep == 2 && (
        <div className="w-full grid grid-cols-2 gap-3 my-3">
          
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Phone number</label>
            <InputText
              type="text"
              placeholder="+2567123456789"
              {...register("phone")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Username</label>
            <InputText
              type="text"
              placeholder="e.g. Mark"
              {...register("username")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
              {...register("shippingAddress.country")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.country && (
              <p className="text-red-500 text-sm">{errors.shippingAddress.country.message}</p>
            )}
          </div>
          
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">City</label>
            <InputText
              type="text"
              placeholder="e.g., Kampala"
              {...register("shippingAddress.city")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.city && (
              <p className="text-red-500 text-sm">{errors.shippingAddress.city.message}</p>
            )}
          </div>
          
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Street</label>
            <InputText
              type="text"
              placeholder="e.g., Plot 24 Kampala Rd"
              {...register("shippingAddress.street")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.street && (
              <p className="text-red-500 text-sm">{errors.shippingAddress.street.message}</p>
            )}
          </div>
    
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">Postal Code</label>
            <InputText
              type="text"
              placeholder="e.g., 256"
              {...register("shippingAddress.zip")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.zip && (
              <p className="text-red-500 text-sm">{errors.shippingAddress.zip.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium text-sm">State/ Region</label>
            <InputText
              type="text"
              placeholder="e.g., Central"
              {...register("shippingAddress.state")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.shippingAddress?.state && (
              <p className="text-red-500 text-sm">{errors.shippingAddress.state.message}</p>
            )}
          </div>
    
          <div className="">
            <label className="block mb-3 font-medium text-sm">Gender</label>
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
              {/* <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="OTHER"
                  {...register("gender")}
                  className="accent-blue-500"
                />
                Other
              </label> */}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="col-span-2 mt-4 flex justify-between">
            <Button
              disabled={loading}
              onClick={handlePreviousStep}
              label="Back"
              className="col-span-1 w-[25%] text-sm text-black text-left py-2"
            />
            <Button
              type="submit"
              disabled={loading}
              className={`col-span-1 ${ loading ? "bg-gray-300" : "bg-[#2F91D7]"} w-[25%] text-white rounded-lg py-2`}
              label={ loading ? <CardLoadingSpinner color={'black'}/> : "Sign up"}
            />
          </div>

          <div className="col-span-2">
           { success && <CustomToast 
              message={success} 
              type="success"
              autoHide
            />}
            { error && <CustomToast 
              message={error} 
              type="error"
              autoHide
            />}
          </div>
          
        </div>
      )}
    </form>
  );
}
