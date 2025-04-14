import { ArrowDown01Icon, Cancel01Icon, FilterVerticalIcon, MapsIcon } from "hugeicons-react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useSearchParams } from "react-router-dom";

const ListingsFilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    price: searchParams.get("price") || "",
  });

  const categories = [
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ];

  const prices = [
    { value: "<500000", label: "Below 500,000 UGX" },
    { value: "500000-1000000", label: "500,000 - 1,000,000 UGX" },
    { value: "1000000-2000000", label: "1,000,000 - 2,000,000 UGX" },
    { value: ">2000000", label: "Above 2,000,000 UGX" },
  ];

  const applyFilters = () => {
    const query = new URLSearchParams();
    if (filters.location) query.set("location", filters.location);
    if (filters.propertyType) query.set("propertyType", filters.propertyType);
    if (filters.price) query.set("price", filters.price);
    setSearchParams(query);
  };

  const clearFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
    const query = new URLSearchParams(searchParams);
    query.delete(key);
    setSearchParams(query);
  };

  const hasActiveFilters = filters.location || filters.propertyType || filters.price;

  return (
    <div className="flex justify-between items-stretch px-[8vw] pt-2 pb-4">
      <div className="flex items-start gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-0.5">
            Location
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg w-40 px-2 h-10">
            <InputText
              className="p-1 text-base w-[90%]"
              value={filters.location}
              placeholder="Location"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
            />
            {filters.location && (
              <Cancel01Icon
                size={12}
                className="text-gray-400 cursor-pointer ml-2"
                onClick={() => clearFilter("location")}
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-0.5">
            Property Type
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg w-40 h-10">
            <Dropdown
              value={filters.propertyType}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, propertyType: e.value }));
                applyFilters();
              }}
              options={categories}
              optionLabel="label"
              optionValue="name"
              placeholder="Select type"
              dropdownIcon={<ArrowDown01Icon className="h-5 w-5 text-gray-400" />}
              className="w-40 h-9 flex items-center text-base"
              panelClassName="text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-0.5">
            Price
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg w-40 h-10">
            <Dropdown
              value={filters.price}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, price: e.value }));
                applyFilters();
              }}
              options={prices}
              optionLabel="label"
              optionValue="value"
              placeholder="Price range"
              dropdownIcon={<ArrowDown01Icon className="h-5 w-5 text-gray-400" />}
              className="w-40 h-9 flex items-center text-base truncate"
              panelClassName="text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-transparent mb-0.5">
            .
          </label>
          <Button
            label="Filter"
            icon={<FilterVerticalIcon className="h-5 w-5 mr-2" />}
            outlined
            className="relative text-gray-700 border border-gray-200 h-10 px-4 text-base rounded-lg"
          >
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                {Object.keys(filters).filter((key) => filters[key]).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-end">
        <Button
          label="Show map"
          icon={<MapsIcon className="h-5 w-5 mr-2" />}
          className="border-[#2F91D7] bg-white text-[#2F91D7] border h-10 px-4 text-base rounded-lg"
        />
        <Button
          label="Save search"
          className="bg-[#2F91D7] text-white h-10 px-4 text-base rounded-lg"
        />
      </div>
    </div>
  );
};

export default ListingsFilterPanel;