import React, { useState } from "react";




import { AccountPopover } from "./AccountPopOver";
import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <div className="flex justify-between px-[8vw] py-2.5 bg-white border-b">
      <div className=" h-9 w-24 object-contain">
        <img src="/logos/mycrib.png" />
      </div>

      <div>
        <ul className="flex gap-5 items-center">
          <NavLink to={'/listings'}>Explore</NavLink>

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
