import { UserCircleIcon } from "hugeicons-react";
import { AccountPopover } from "./AccountPopOver";
import { NavLink, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Header = ({ bottomBorder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const handleUserIconClick = () => {
    setIsMobilePopoverOpen((prev) =>
      !prev
    );
  }

  return (
    <section>
      {/* Desktop header */}
      <div className={`hidden md:flex justify-between px-[8vw] py-2.5 bg-white ${ bottomBorder && "border-b "}`}>
        <NavLink to={'/'} className=" h-9 w-24 object-contain">
          <img src="/logos/mycrib.png" />
        </NavLink>

        <div>
          <ul className="flex gap-5 items-center">
            <NavLink to={'/listings'}>Explore</NavLink>

            <a href='https://partner.mycrib.ug/'>Manage Rentals</a>

            <li>
              <AccountPopover/>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center md:hidden px-5 py-2.5 bg-white">
        <button className="h-9 w-24 object-contain" onClick={handleMenuClick}>
          <img src="/svgs/Menu.svg" />
        </button>
        <NavLink to={'/'} className="h-9 w-24 object-contain">
          <img src="/logos/mycrib.png" />
        </NavLink>
        <div className="flex items-center border rounded-full p-2" onClick={handleUserIconClick}>
          <UserCircleIcon className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};

export default Header;
