import { useState, useEffect, useRef } from "react";
import { CircleUserRound } from "lucide-react";
import { useAuthDialog } from "../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../utils/constansts/DialogOperations";
import { getAuthUser, isAuthenticated, logout } from "../../utils/cookies/AuthCookiesManager";
import { NavLink } from "react-router-dom";

export function AccountPopover() {
  const { openDialog } = useAuthDialog();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const popoverRef = useRef(null);

  const toggleTooltip = () => {
    setIsTooltipVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsTooltipVisible(false);
      }
    }

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible]);

  return (
    <>
      <div
        className="relative border rounded-[40px] flex items-center gap-1 px-3 py-1 border-[#CDCED7] cursor-pointer"
        onClick={toggleTooltip}
        ref={popoverRef}
      >
        <span>
          <CircleUserRound className="h-5 w-5" />
        </span>
        <span>{getAuthUser()?.username || "Account"}</span>
      </div>

      {isTooltipVisible && (
        <div
          ref={popoverRef}
          className="absolute flex flex-col w-52 text-sm bg-white text-black rounded-md py-1 top-[60px] z-30 transform -translate-x-1/2 shadow-md"
        >
          <div className="absolute -top-1 left-[80%] transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
          <div className="flex flex-col font-normal py-2 text-sm">
            {!isAuthenticated() ? (
              <ul>
                <li
                  className="px-4 py-1.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    openDialog(dialog_operations.signup);
                    toggleTooltip();
                  }}
                >
                  SignUp
                </li>

                <li
                  className="px-4 py-1.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    openDialog(dialog_operations.login);
                    toggleTooltip();
                  }}
                >
                  Login
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/help"}>Help / Support</NavLink>
                </li>
              </ul>
            ) : (
              <>
                <li
                  className="px-4 py-1.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    openDialog(dialog_operations.messages);
                    toggleTooltip();
                  }}
                >
                  Messages
                </li>

                <li
                  className="px-4 py-1.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    openDialog(dialog_operations.login);
                    toggleTooltip();
                  }}
                >
                  My rental
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/"}>My Tours</NavLink>
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/notifications"}>Notifications</NavLink>
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/"}>Payment History</NavLink>
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/"}>Maintenance Requests</NavLink>
                </li>

                <NavLink to={"/account"} className="px-4 py-1.5 hover:bg-gray-200">
                  Settings
                </NavLink>
                <NavLink to={"/help"} className="px-4 py-1.5 hover:bg-gray-200">
                  Help / Support
                </NavLink>
                <hr />

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink onClick={handleLogout}>Sign out</NavLink>
                </li>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}