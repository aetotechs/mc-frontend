import { useState, useEffect, useRef } from "react";
import { CircleUserRound } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useAuthDialog } from "../../../utilities/hooks/client/useAuthDialog";
import { dialog_operations } from "../../../utilities/constants/DialogOperations";
import { UserCircle02Icon } from "hugeicons-react";
import { getAuthUser, isAuthenticated, logout } from "../../../utilities/cookies/AuthCookiesManager";

const user = getAuthUser() || {};

export function PartnerAccountPopover() {
  const { openDialog } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
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
        className="relative rounded-full flex items-center gap-1 cursor-pointer"
        onClick={toggleTooltip}
        ref={popoverRef}
      >
        <span>
          { !user ? 
            <CircleUserRound className="h-8 w-8 text-gray-400"/> : 
              <div className="relative">
                <UserCircle02Icon className="h-8 w-8 text-gray-500"/>
                { isAuthenticated() && <i className="w-2 h-2 absolute rounded-full -right-1 top-0 bg-green-600" title="You are active"/>}
              </div>
          }
        </span>
      </div>

      {isTooltipVisible && (
        <div
          ref={popoverRef}
          className="absolute flex flex-col w-52 text-sm bg-white border text-black rounded-md py-1 top-[60px] z-30 transform -translate-x-1/2 shadow-md"
        >
          <div className="flex flex-col font-normal py-2 text-sm rounded-lg">
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
              <ul>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/settings"}>
                    Settings
                  </NavLink>
                </li>

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink to={"/help"}>
                    Help / Support
                  </NavLink>
                </li>
                
                <hr />

                <li className="px-4 py-1.5 hover:bg-gray-200">
                  <NavLink onClick={handleLogout}>Sign out</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}