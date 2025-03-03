import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex bg-[#EFF0F3] bottom-0  justify-around p-10">
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-[15px] ">Find Homes Faster</span>

        <ul className="flex flex-col gap-3">
          <li className="flex items-center bg-black rounded-md gap-2 px-2 py-1 text-white">
            <div className="h-4 w-4 object-cover">
              <img src="/logos/apple-logo.png" alt="Apple Logo" />
            </div>
            <span className="text-xs">
              Download On the
              <br />
              <span>App Store</span>
            </span>
          </li>

          <li className="flex items-center bg-black gap-2 px-2 py-1 rounded-md text-white">
            <div className="h- w-4 object-cover">
              <img src="/logos/playstore.png" alt="Apple Logo" />
            </div>
            <span className="text-xs">
           Get it On
              <br />
              <span>Google Play</span>
            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base">Company</span>
        <div className="flex flex-col gap-1">
          <Link to='/' className="cursor-pointer">Why MyCrib?</Link>
          <Link to='/' className="cursor-pointer">Careers</Link>
          <Link to='/' className="cursor-pointer">Blog</Link>
          <Link to='/' className="cursor-pointer">Terms</Link>
          <Link to='/' className="cursor-pointer">Privacy Policy</Link>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base">Find Us</span>
        <div className="flex flex-col gap-1">
          <Link to='/' className="cursor-pointer">Contact Us</Link>
          <Link to='/' className="cursor-pointer">Help Center</Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <i className="pi pi-twitter" ></i>
          <i className="pi pi-instagram" ></i>
          <i className="pi pi-linkedin" ></i>
        </div>
        <div>
          <span>{new Date().getFullYear()}</span>
          <span> &copy; MyCrib. </span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
