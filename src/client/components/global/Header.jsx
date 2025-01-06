import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between px-[8vw] py-4">
      <div>
        <img src="/logos/mycrib.png" width={100} />
      </div>

      <div>
        <ul className="flex gap-5 items-center">
          <li>Explore</li>

          <li>Manage Rentals</li>

          <li>Explore</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
