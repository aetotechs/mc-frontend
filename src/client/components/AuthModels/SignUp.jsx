import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Progress } from "../../../components/ui/progress";
import { ArrowLeft } from "lucide-react";

import { UserDetailsForm } from "../../AuthForms/UserDetails";
// import { AdditionalUserDetails } from "../../AuthForms/AdditionalUserDetails";
// import VerifyEmail from "./VerifyEmail";
// import SuccessScreen from "./SuccessScreen";

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">SignUp</span>
      </DialogTrigger>

      <DialogContent className=" ">
        {currentStep > 1 && (
          <ArrowLeft
            className="h-4 w-4 cursor-pointer"
            onClick={handlePreviousStep}
          />
        )}

        <div className="">
        

          {currentStep === 1 && (
            <>
              <h5 className="text-left  font-semibold text-[22px]">
              Welcome to MyCrib
              </h5>
              <p className="flex  mb-2">
                <span>Already registered?</span>
                <span className="underline">Login here</span>
              </p>
              <div className="flex justify-between gap-5 my-3">
                <Progress value={100}/>
                <Progress/>
              </div>
              <UserDetailsForm handleClick={handleNextStep} />

            </>
          )}

          {currentStep === 2 && (
            <>
             
              {/* <AdditionalUserDetails handleClick={handleNextStep} /> */}
            </>
          )}

          {/* {currentStep === 3 && (
            <>
              <VerifyEmail handleClick={handleNextStep} />
            </>
          )} */}
          {/* 
          {currentStep === 4 && (
            <>
              <SuccessScreen />
            </>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
