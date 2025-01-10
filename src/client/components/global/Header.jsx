import React, { useState } from "react";




import { AccountPopover } from "./AccountPopOver";

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

          <li>
            <AccountPopover />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
