import { Cancel01Icon, FilterVerticalIcon, MapsIcon } from "hugeicons-react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const ListingsFilterPanel = () => {
  const [value, setValue] = useState("Kampala");
  const [selectedCity, setSelectedCity] = useState(null);
  const [categories, setCategories] = useState([
    { name: "RENTALS", label: "Rentals" },
    { name: "HOSTELS", label: "Hostels" },
    { name: "LODGES", label: "Lodges" },
    { name: "APARTMENTS", label: "Apartments" },
  ]);

  const [prices, setPrices] = useState([
    { value: "500000UGX - 1000000UGX" },
    { value: "500000UGX - 1000000UGX" },
    { value: "500000UGX - 1000000UGX" },
    { value: "500000UGX - 1000000UGX" },
  ]);

  return (
    <div className="flex justify-between items-center px-[8vw]">
      <div className="flex items-center gap-3">
        <div>
          <label>Location</label>
          <div className="flex items-center border rounded-md px-2">
            <InputText
              className="max-w-32 p-1"
              value={value}
              placeholder="Location"
              showClear
              onChange={(e) => setValue(e.target.value)}
            />
            <Cancel01Icon className="h-3 w-3 font-bold opacity-60" />
          </div>
        </div>

        <div>
          <label>Property Type</label>
          <div className="flex items-center border rounded-md px-1">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={categories.map((category) => category.name)}
              optionLabel="name"
              placeholder="Rental"
              showClear
              className="text-xs h-8 flex items-center"
              panelClassName="text-xs"
            />
          </div>
        </div>
        <div>
          <label className="font-[500]">Price</label>
          <div className="flex items-center border rounded-md px-1">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={prices.map((price) => price.value)}
              optionLabel="name"
              placeholder="500,000Ugx-100,00..."
              panelClassName="text-xs"
              className="text-xs h-8 flex items-center max-w-32 truncate"
            />
          </div>
        </div>
        <div>
          <label className="text-white">.</label>
          <div>
            <Button 
              label="Filters"
              icon={<FilterVerticalIcon className="h-4 w-4" />}
              outlined
              className="text-gray-700 w-24 border h-8 px-2 float-bottom"
              />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button label="Show map" icon={<MapsIcon className="h-4 w-4" />} className="border-[#2F91D7] bg-white text-[#2F91D7] border py-1 px-2 gap-2 rounded-md"/>        
        <Button label="Save search" className="bg-[#2F91D7] text-white rounded-md text-sm py-2 px-3"/>
      </div>
    </div>
  );
};
export default ListingsFilterPanel;
