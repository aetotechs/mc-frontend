
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

import { CircleUserRound } from "lucide-react";
import { useAuth } from "../../utils/context/AuthContext";





export function AccountPopover() {
  const op = useRef(null);
  const { showAuth, dispatchAuth } = useAuth();
  return (
    <>
      <div
        className="relative border rounded-[40px] flex items-center gap-1 px-3 py-1 border-[#CDCED7] cursor-pointer "
        onClick={(e) => op.current.toggle(e)}
      >
        {" "}
        <span>
          <CircleUserRound className="h-5 w-5" />
        </span>
        <span>Account</span>
      </div>

      
      <div ref={op} className="absolute flex flex-col  text-sm text-black rounded-md px-2  top-[50%]  left-1/2 transform  shadow-md">
        <div className="absolute -top-1 left-3/4 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>

        <div className="flex flex-col gap-1.5 font-normal p-2 text-sm ">
       
          <span  onClick={() => dispatchAuth(true)} className="cursor-pointer">SignUp</span>
          <span>Login</span>
          <span>Help / Support</span>
        </div>
      </div>
    </>
    // <Popover>
    //   <PopoverTrigger asChild>

    //   </PopoverTrigger>
    //   <PopoverContent className="  absolute flex flex-col w-48 text-sm bg-white text-black rounded-md px-2 py-1 top-[14px] z-10 left-1/2 transform -translate-x-1/2 shadow-md">
    //   <div className="absolute -top-1 left-3/4 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>

    //   </PopoverContent>
    // </Popover>
  );
}
