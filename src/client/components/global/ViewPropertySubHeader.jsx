import { Cancel01Icon, FilterVerticalIcon, MapsIcon } from "hugeicons-react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

import { Button } from "primereact/button";

import { Dropdown } from "primereact/dropdown";

const SubHeader = () => {
  const [value, setValue] = useState("Kampala");
  const [selectedCity, setSelectedCity] = useState(null);
  const [categories, setCategories] = useState([
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ]);

  return (
    <div className="flex justify-between items-center px-[8vw]">
      <div className="flex items-center gap-2">
        <div>
          <span>Location</span>

          <div className="flex items-center border w-36 rounded-md p-1 ">
            <InputText
              className="border-none focus:ring-0 max-w-28"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Cancel01Icon className="h-3 w-3" />
          </div>
        </div>

        <div>
          <span>Property Type</span>

          <div className="flex items-center border h-[34px]  rounded-md px-1 ">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={categories.map((category) => category.name)}
              optionLabel="name"
              placeholder="Rental"
              className="h-[30px] text-sm focus:right-0"
            />
          </div>
        </div>
        <div>
          <span>Price</span>

          <div className="flex items-center border rounded-md p-1 ">
            <InputText
              className="border-none focus:ring-0 max-w-28"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Cancel01Icon className="h-3 w-3" />
          </div>
        </div>
        <div>
          <div className="flex items-center border rounded-md p-1 mt-6">
            <FilterVerticalIcon className="h-4 w-4" />
            <span>Filters</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button className="border-[#2F91D7] bg-white text-[#2F91D7] flex items-center gap-1 border p-1 rounded-[10px]">
          <MapsIcon className="h-4 w-4" />
          <span>Show map</span>
        </Button>
        <Button className="bg-[#2F91D7] text-white rounded-[10px] text-sm p-2">
          Save search
        </Button>
      </div>
    </div>
  );
};
export default SubHeader;
