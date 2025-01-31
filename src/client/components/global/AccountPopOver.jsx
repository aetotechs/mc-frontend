import {  useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useAuthDialog } from "../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../utils/constansts/DialogOperations";
import { getAuthUser, isAuthenticated, logout } from "../../utils/cookies/AuthCookiesManager";

export function AccountPopover() {
  const { openDialog } = useAuthDialog();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleLogout = () => {
    logout();
    toggleTooltip();
  }
  return (
    <>
      <div
        className="relative border rounded-[40px] flex items-center gap-1 px-3 py-1 border-[#CDCED7] cursor-pointer "
        onClick={toggleTooltip}
      >
        {" "}
        <span>
          <CircleUserRound className="h-5 w-5" />
        </span>
        <span>{ getAuthUser()?.username || "Account"}</span>
      </div>
      {isTooltipVisible && (
        <div className="absolute flex flex-col w-52 text-sm bg-white text-black rounded-md px-2 py-1 top-[60px] z-30  transform -translate-x-1/2 shadow-md">
          <div className="absolute -top-1 left-[80%] transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
          { !isAuthenticated() ? <div className="flex flex-col gap-1.5 font-normal p-2 text-sm">
            <span
              className="cursor-pointer "
              onClick={() => {
                openDialog(dialog_operations.signup);
                toggleTooltip();
              }}
            >
              SignUp
            </span>
            <span
              className="cursor-pointer "
              onClick={() => {
                openDialog(dialog_operations.login);
                toggleTooltip();
              }}
            >
              Login
            </span>
            <span>Help / Support</span>
          </div> 
          : 
          <div className="p-2 grid gap-4">
            <p className="">Hello {getAuthUser()?.lastName} 😊</p>
            <p className="flex justify-between bg-gray-100 hover:bg-gray-300 hover:text-blue-600 cursor-pointer p-2 rounded-md"
              onClick={handleLogout}
              >
                Logout 
              <span className="pi pi-sign-out text-sm"/>
            </p>
          </div>
          }
        </div>
      )}
    </>
  );
}
