import React, { useState } from "react";

import { CircleUserRound } from "lucide-react";

const Header = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };
  return (
    <div className="flex justify-between px-[8vw] py-2.5">
      <div className=" h-9 w-24 object-contain">
        <img src="/logos/mycrib.png" />
      </div>

      <div>
        <ul className="flex gap-5 items-center">
          <li>Explore</li>

          <li>Manage Rentals</li>

          <li
            className="relative group border rounded-[40px] flex items-center gap-1 px-3 py-1 border-[#CDCED7] cursor-pointer"
            onClick={toggleTooltip}
          >
            <span>
              <CircleUserRound className="h-5 w-5" />
            </span>
            <span>Account</span>

            {isTooltipVisible && (
              <div className="absolute flex flex-col w-48 text-sm bg-white text-black rounded-md px-2 py-1 top-[50px] z-30 left-1/2 transform -translate-x-1/2 shadow-md">
                <div className="absolute -top-1 left-3/4 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
                <div className="flex flex-col gap-1.5 font-normal p-2 text-sm">
                  <span>SignUp</span>
                  <span>Login</span>
                  <span>Help / Support</span>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
