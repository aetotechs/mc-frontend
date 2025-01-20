import React, { useState } from "react";

import { AccountPopover } from "./AccountPopOver";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const {pathname} = location;

  return (
    <div className={`flex justify-between px-[8vw] py-2.5 bg-white ${pathname==='/' &&'border-b'} `}>
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
