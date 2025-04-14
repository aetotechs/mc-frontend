import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories = [
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ];

  const availableLocations = [
    "Kampala",
    "Entebbe",
    "Jinja",
    "Mbale",
    "Gulu",
    "Mbarara",
    "Fort Portal",
    "Arua",
    "Lira",
    "Soroti",
  ];

  return (
    <footer className="bg-[#F9FAFB] text-black">
      {/* Mobile Footer (<md) */}
      <div className="md:hidden px-4 py-6">
        <h1 className="font-bold text-lg mb-6">Find Homes Faster</h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column: Find Homes Faster + Find Us */}
          <div className="flex flex-col gap-6">
            {/* Find Homes Faster */}
            <div className="flex flex-col gap-3">
              <ul className="flex flex-col gap-3">
                <li className="flex items-center bg-black rounded-lg text-white w-40 h-12">
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 w-full h-full"
                  >
                    <div className="h-6 w-6">
                      <img src="/logos/apple-logo.png" alt="Apple Logo" />
                    </div>
                    <span className="text-sm">
                      Download on the
                      <br />
                      App Store
                    </span>
                  </a>
                </li>
                <li className="flex items-center bg-black rounded-lg text-white w-40 h-12">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 w-full h-full"
                  >
                    <div className="h-6 w-6">
                      <img src="/logos/playstore.png" alt="Google Play Logo" />
                    </div>
                    <span className="text-sm">
                      Get it on
                      <br />
                      Google Play
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Find Us */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg">Find Us</span>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm no-underline hover:underline">
                  Contact Us
                </Link>
                <Link to="/" className="text-sm no-underline hover:underline">
                  Help Center
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Company + Social + Copyright */}
          <div className="flex flex-col gap-6">
            {/* Company */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg">Company</span>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm no-underline hover:underline">
                  Why MyCrib?
                </Link>
                <Link to="/" className="text-sm no-underline hover:underline">
                  Careers
                </Link>
                <Link to="/" className="text-sm no-underline hover:underline">
                  Blog
                </Link>
                <Link to="/" className="text-sm no-underline hover:underline">
                  Terms
                </Link>
                <Link to="/" className="text-sm no-underline hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Social Icons and Copyright */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="pi pi-instagram text-xl"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="pi pi-linkedin text-xl"></i>
                </a>
              </div>
              <div className="text-sm">
                <span>{new Date().getFullYear()} © MyCrib. </span>
                <span>All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Footer (md and above) */}
      <div className="hidden md:block px-6 py-8">
        <div className="flex flex-row justify-between gap-8">
          {/* Find Homes Faster */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-lg">Find Homes Faster</span>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center bg-black rounded-lg text-white w-48 h-12">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 w-full h-full"
                >
                  <div className="h-6 w-6">
                    <img src="/logos/apple-logo.png" alt="Apple Logo" />
                  </div>
                  <span className="text-sm">
                    Download on the
                    <br />
                    App Store
                  </span>
                </a>
              </li>
              <li className="flex items-center bg-black rounded-lg text-white w-48 h-12">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 w-full h-full"
                >
                  <div className="h-6 w-6">
                    <img src="/logos/playstore.png" alt="Google Play Logo" />
                  </div>
                  <span className="text-sm">
                    Get it on
                    <br />
                    Google Play
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Company</span>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm no-underline hover:underline">
                Why MyCrib?
              </Link>
              <Link to="/" className="text-sm no-underline hover:underline">
                Careers
              </Link>
              <Link to="/" className="text-sm no-underline hover:underline">
                Blog
              </Link>
              <Link to="/" className="text-sm no-underline hover:underline">
                Terms
              </Link>
              <Link to="/" className="text-sm no-underline hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Find Us */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Find Us</span>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm no-underline hover:underline">
                Contact Us
              </Link>
              <Link to="/" className="text-sm no-underline hover:underline">
                Help Center
              </Link>
            </div>
          </div>

          {/* Social Icons and Copyright */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="pi pi-instagram text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="pi pi-linkedin text-xl"></i>
              </a>
            </div>
            <div className="text-sm">
              <span>{new Date().getFullYear()} © MyCrib. </span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;