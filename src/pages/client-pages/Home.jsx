import React, { useEffect, useState } from "react";
import ListingCard from "../../components/client/listings/ListingCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../utilities/loaders/Spinner";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from 'primereact/autocomplete';
import Footer from "../../components/global/footer/Footer";
import useProperties from "../../utilities/hooks/client/useProperties";
import Header from "../../components/client/header/Header";
import MobileSearchPanel from "../../components/client/home/MobileSearchPanel";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState({ page: 0, size: 20 });
  const { properties, loading } = useProperties(pages.page, pages.size);
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    propertyType: "",
    price: "",
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleMobileSearchClick = () => {
    searchParams.set("mSearchPanelOpen", "1");
    setSearchParams(searchParams);
  }

  const categories = [
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ];

  // Predefined list of Ugandan locations for suggestions
  const availableLocations = [
    "Kyanja, Kampala, UG, 0000",
    "Entebbe road, Kampala, UG, 0000",
    "Jinja",
    "Mbale",
    "Gulu",
    "Mbarara",
    "Fort Portal",
    "Arua",
    "Lira",
    "Soroti city, Soroti, UG, 0000",
  ];

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, location: value }));

    if (value) {
      const filtered = availableLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location) => {
    setFilters((prev) => ({ ...prev, location }));
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (filters.searchTerm) query.set("searchTerm", filters.searchTerm);
    if (filters.location) query.set("location", filters.location);
    if (filters.propertyType) query.set("propertyType", filters.propertyType);
    if (filters.price) query.set("price", filters.price);

    navigate(`/listings?${query.toString()}`);
  };

  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header bottomBorder />
      </section>

      {/* Desktop */}
      <section className="bg-hero_mobile md:bg-hero_desktop bg-opacity-40 bg-cover relative bg-center h-[70vh] flex justify-center items-center flex-col gap-5">
        <h3 className="text-center font-bold text-[3rem] bg-black bg-opacity-5 leading-[60px] text-white">
          Discover the Easiest Way to Rent
        </h3>

        <div className="bg-white hidden md:flex items-center justify-between rounded-[50px] py-3 px-4 divide-x gap-3">
          <div className="flex flex-col px-4 relative">
            <span className="font-medium text-sm">Location</span>
            <span className="flex items-center gap-1">
              <i className="pi pi-map-marker text-[12px]" />
              <AutoComplete
                type="text"
                suggestions={availableLocations}
                value={filters.location}
                completeMethod={handleLocationChange}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="Search city or area"
                className="w-[100%] outline-none"
                autoComplete="off"
              />
            </span>
          </div>
          <div className="flex flex-col px-4">
            <span className="font-medium text-sm">Property Type</span>
            <span className="flex items-center gap-1">
              <i className="pi pi-building text-[12px]" />
              <Dropdown
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    propertyType: e.target.value,
                  }))
                }
                options={categories}
                placeholder="Select property type"
                key="name"
                className="w-[100%] outline-none bg-transparent"
              />
            </span>
          </div>
          <div className="flex flex-col px-4">
            <span className="font-medium text-sm">Price</span>
            <span className="flex items-center gap-1">
              <i className="pi pi-tag transform rotate-90 text-[12px]" />
              <input
                type="text"
                value={filters.price}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="Choose price range"
                className="w-[100%] outline-none"
              />
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div
              className="flex rounded-[48px] bg-[#2F91D7] p-3 px-5 text-white items-center gap-2 cursor-pointer"
              onClick={handleSearch}
            >
              <span>
                <i className="pi pi-search text-[14px]" />
              </span>
              <span>Search</span>
            </div>
          </div>
        </div>

        {/* Mobile Search bar */}
        <section className="md:hidden flex items-center bg-white border rounded-full p-1 w-[90%]">
          <input
            type="text"
            onFocus={handleMobileSearchClick}
            className="ml-4 mr-2 px-2 flex-1 outline-none"
            placeholder="Find your next crib"
          />
          <i
            className="pi pi-search font-bold rounded-full p-4 bg-primary text-white"
            onClick={handleSearch}
          />
        </section>
      </section>

      <section className="bg-white flex gap-3 md:gap-4 md:justify-center px-[8vw] my-[4vh] md:my-16 overflow-x-auto no-scrollbar">
        {categories.map((category, index) => (
          <p
            className="font-bold hover:text-white text-sm hover:bg-black border-2 border-gray-400 cursor-pointer px-6 py-2 rounded-full"
            key={index}
            onClick={() =>
              setFilters((prev) => ({ ...prev, propertyType: category.name }))
            }
          >
            {category.label}
          </p>
        ))}
      </section>

      <section className={`${!loading && "hidden"} px-[8vw] py-4`}>
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      </section>

      <section
        className={`${
          loading && "hidden"
        } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 md:px-[8vw]`}
      >
        {properties.map((item, index) => (
          <ListingCard key={index} item={item} />
        ))}
      </section>

      <section className="flex items-center justify-center my-24">
        <div className="flex gap-16 items-center">
          <p>Page {pages?.page ?? 0}</p>
        </div>
      </section>

      <Footer />
      <MobileSearchPanel/>
    </div>
  );
};

export default Home;