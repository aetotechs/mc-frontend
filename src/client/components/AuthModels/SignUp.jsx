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

  // Only have one Auth model and then One component for login 'LoginForm.jsx' in the /components/auth_models and the others too for signup and verify 'Signup.jsx and Verify.jsx' 
  // Have a state variable handling operation const [operation, setOperation] = useState({ login: true, signup: false, verify: false }). with login, register, signup and conditionally render form fields for all these based on the state operation
  // I have attached example in examples folder. 
  
  // You can utilise the already set up Auth mddel because i already set up its global triggers via context API
  // Take time to put this together and let's have a simple codebase.
  return (
    <Dialog> // Check in components/examples for a better implementation here. And ask where you need help 
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
                <Progress value={100}/>  // Simply conditionally render flexed lines here shading them a color based on current step. We don't need any complex layer of libraries to do this
                <Progress/>
              </div>
              <UserDetailsForm handleClick={handleNextStep} />

              // 

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
              <SuccessScreen />  // NOTE: We don't need a separate success screen, simply conditionally render all the screen content and activate this when the success message is set
            </>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
