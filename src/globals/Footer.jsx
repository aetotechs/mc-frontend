import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#EFF0F3] bottom-0 px-5 md:px-10 py-10">
      <section className="hidden md:grid grid-cols-4 gap-10 md:px-[8vw] ">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-[15px] ">Find Homes Faster</h1>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center bg-black rounded-md gap-2 p-2 text-white w-[70%] ">
              <div className="h-4 w-4 object-cover">
                <img src="/logos/apple-logo.png" alt="Apple Logo" />
              </div>
              <span className="text-xs">
                Download On the
                <br />
                <span>App Store</span>
              </span>
            </li>

            <li className="flex items-center bg-black gap-2 p-2 rounded-md text-white w-[70%]">
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
      </section>
      <section className="md:hidden grid grid-cols-2 space-y-6">
        <section className="col-span-2 space-y-2">
          <h1 className="font-semibold text-[15px] ">Find Homes Faster</h1>
          <ul className="flex gap-3 ">
            <li className="flex items-center bg-black rounded-md gap-2 p-2 text-white w-[70%] ">
              <div className="h-4 w-4 object-cover">
                <img src="/logos/apple-logo.png" alt="Apple Logo" />
              </div>
              <span className="text-xs">
                Download On the
                <br />
                <span>App Store</span>
              </span>
            </li>

            <li className="flex items-center bg-black gap-2 p-2 rounded-md text-white w-[70%]">
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

        </section>
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

        <div className="flex flex-col gap-2 col-span-2 space-y-4">
          <div className="flex gap-2">
            <i className="text-xl pi pi-twitter" ></i>
            <i className="text-xl pi pi-instagram" ></i>
            <i className="text-xl pi pi-linkedin" ></i>
          </div>
          <div>
            <span>{new Date().getFullYear()}</span>
            <span> &copy; MyCrib. </span>
            <span>All rights reserved.</span>
          </div>
        </div>

      </section>
    </footer>
  );
};

export default Footer;
