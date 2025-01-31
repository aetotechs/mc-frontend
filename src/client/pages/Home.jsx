import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ListingCard from "../components/global/ListingCard";
import { listings } from "../utils/resources/dummy_data";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ]);

  const handleClick = () => {
    
    navigate("/listings");
  };
  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header bottomBorder/>
      </section>
      <section className="bg-hero bg-cover relative bg-center h-[70vh] flex justify-center items-center flex-col gap-5">
        <h3 className="font-extrabold text-[50px] leading-[60px] text-white">
          Discover the Easiest Way to Rent
        </h3>

        <div className="bg-white hidden md:flex items-center justify-between rounded-[50px] py-3 px-4 divide-x gap-3">
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
            <div
              className="flex rounded-[48px] bg-[#2F91D7] p-3 px-5 text-white items-center gap-2 cursor-pointer"
              onClick={handleClick}
            >
              <span>
                <i className="pi pi-search" style={{ fontSize: "14px" }}></i>
              </span>
              <span>Search</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white grid md:flex gap-4 justify-center my-16">
        {categories.map((category, index) => (
          <p className="font-bold hover:text-white text-sm hover:bg-black border cursor-pointer border-gray-300 px-6 py-3 rounded-full">
            {category.label}
          </p>
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-[8vw]">
        {listings.map((item, index) => (
          <ListingCard key={index} item={item} />
        ))}
      </section>

      <section className="flex items-center justify-center my-16">
        <button className="px-8 py-4 text-blue-400 text-lg  border-2 border-blue-400 font-extrabold rounded-full" title="Load more items from the server">Load More</button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
