import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";

import { UserDetailsForm } from "../../AuthForms/UserDetails";
import { AdditionalUserDetailsForm } from "../../AuthForms/AdditionalUserDetails";
// import VerifyEmail from "./VerifyEmail";
// import SuccessScreen from "./SuccessScreen";

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [AdditionalDetailsForm, showAdditionalDetailsForm] = useState(false);
  const handleNextStep = () => {
    console.log("handleNextStep");
    showAdditionalDetailsForm(!AdditionalDetailsForm);
  };

  const handlePreviousStep = () => {
    showAdditionalDetailsForm(!AdditionalDetailsForm);
  };



  return (
    <>
    
    <span className="text-left font-bold text-[24px]">
              Welcome to MyCrib
            </span>
            <p className="flex text-base  ">
              <span className="font-normal text-[#62636C] ">
                Already have an account?
              </span>
              <span className="font-medium">Signin</span>
            </p>

            <div className="flex justify-between gap-5 my-3 ">
              <ProgressBar value={100} className="h-2 grow bg-[#6CAFE6]" showValue={false}></ProgressBar>
              <ProgressBar
              className="h-2 grow "
                showValue={false}
                value={`${AdditionalDetailsForm ? "100" : "0"}`}
              ></ProgressBar>
            </div>
            {!AdditionalDetailsForm ? (
              <>
                <UserDetailsForm handleClick={handleNextStep} />

                <div className="flex items-center gap-5">
                  <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                  <span className="text-lg my-1 font-normal text-[#80828D]">
                    or
                  </span>
                  <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                </div>

                <div className="flex border border-[#CDCED7] rounded-[8px] justify-around py-2 ">
                  <div className="w-5 h-5 object-cover">
                    <img src="/logos/google.png" alt="Google" />
                  </div>
                  <span className="font-medium">Continue with Google</span>
                </div>
              </>
            ) : (
              <>
                <AdditionalUserDetailsForm handleClick={handlePreviousStep} />
              </>
            )}
    </>
  );
}
