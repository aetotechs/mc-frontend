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
      <div className={`hidden md:flex justify-between items-center px-[8vw] py-2.5 bg-white ${ bottomBorder && "border-b "}`}>
        <NavLink to={'/'} className=" h-12 object-contain">
          <img src="/logos/mycrib.png" className="h-full" />
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
      <div className="md:hidden flex justify-between items-center md:hidden px-5 py-4 bg-white">
        <button className="h-12 object-cover" onClick={handleMenuClick}>
          <img src="/svgs/Menu.svg" className="" />
        </button>
        <NavLink to={'/'} className="h-9">
          <img src="/logos/mycrib.png" className="h-full" />
        </NavLink>
        <div className="flex items-center border-2 border-gray-400 rounded-full px-2 py-2.5" onClick={handleUserIconClick}>
          <UserCircleIcon className="h-5" />
        </div>
      </div>
    </section>
  );
};

export default Header;
