import { AccountPopover } from "./AccountPopOver";
import { NavLink } from "react-router-dom";

const Header = ({ bottomBorder }) => {
  return (
    <div className={`flex justify-between px-[8vw] py-2.5 bg-white ${ bottomBorder && "border-b "}`}>
      <NavLink to={'/'} className=" h-9 w-24 object-contain">
        <img src="/logos/mycrib.png" />
      </NavLink>

      <div>
        <ul className="flex gap-5 items-center">
          {/* Uncomment when listings page is active with endpoints */}
          <NavLink to={'/listings'}>Explore</NavLink>

          <a href='https://partner.mycrib.ug/'>Manage Rentals</a>

          <li>
            <AccountPopover />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
