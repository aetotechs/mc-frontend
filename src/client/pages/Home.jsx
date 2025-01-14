import React, { useEffect } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-hero bg-cover relative  bg-center h-[70vh] flex justify-center items-center flex-col gap-5">
        <h3 className="font-extrabold text-[50px] leading-[60px] text-white">
          Discover the Easiest Way to Rent
        </h3>

        <div className="bg-white flex items-center justify-between rounded-[50px] py-3 px-4 divide-x gap-3">
          <div className="flex flex-col px-4">
            <span className="font-medium text-sm">Location</span>
            <span className="flex items-center gap-1">
              <span>
                <i
                  className="pi pi-map-marker "
                  style={{ fontSize: "12px" }}
                ></i>
              </span>
              <span className="font-medium text-[15px] text-[#8B8D98]">
                Search city or area
              </span>
            </span>
          </div>
          <div className="flex flex-col px-4">
            <span className="font-medium text-sm">Property</span>
            <span className="flex items-center gap-1">
              <span>
                <i className="pi pi-building " style={{ fontSize: "12px" }}></i>
              </span>
              <span className="font-medium text-[15px] text-[#8B8D98]">
                Search property type
              </span>
            </span>
          </div>
          <div className="flex flex-col px-4">
            <span className="font-medium text-sm">Price</span>
            <span className="flex items-center gap-1">
              <span>
                <i
                  className="pi pi-tag transform rotate-90"
                  style={{ fontSize: "12px" }}
                ></i>
              </span>
              <span className="font-medium text-[15px] text-[#8B8D98]">
                Choose price range
              </span>
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div className="flex rounded-[48px] bg-[#2F91D7] p-3 px-5 text-white items-center gap-2">
              <span>
                <i className="pi pi-search" style={{ fontSize: "14px" }}></i>
              </span>
              <span>Search</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
