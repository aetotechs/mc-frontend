import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import { SignUp } from "../AuthModels/SignUp";

import { CircleUserRound } from "lucide-react";

export function AccountPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative  border rounded-[40px] flex items-center gap-1 px-3 py-1 border-[#CDCED7] cursor-pointer ">
          {" "}
          <span>
            <CircleUserRound className="h-5 w-5" />
          </span>
          <span>Account</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="  absolute flex flex-col w-48 text-sm bg-white text-black rounded-md px-2 py-1 top-[14px] z-10 left-1/2 transform -translate-x-1/2 shadow-md">
      <div className="absolute -top-1 left-3/4 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>

      <div className="flex flex-col gap-1.5 font-normal p-2 text-sm ">
        <SignUp />
        <span>Login</span>
        <span>Help / Support</span>
      </div>
      </PopoverContent>
    </Popover>
  );
}
