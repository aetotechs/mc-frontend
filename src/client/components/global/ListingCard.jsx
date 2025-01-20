import { ArrowLeft01Icon, ArrowRight01Icon, Bathtub01Icon, BedIcon, FavouriteIcon } from "hugeicons-react";
import React, { useState } from "react";

const ListingCard = ({ item }) => {
  const [price, setprice] = useState({ min_price: 90000.0, max_price: 230000.0});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="w-[350px] border rounded-xl">
      <section className="relative h-56 w-full bg-gray-200 rounded-t-xl">
        <img src={item.image || "public/images/hero-image.png"} alt="" className="object-cover w-[100%] h-[100%] rounded-t-xl" />
        <p className="absolute left-4 top-4 rounded-full bg-orange-300 px-3 py-1">Furnished</p>
        <button className="absolute right-4 top-4 rounded-full bg-white p-1"><FavouriteIcon size={18}/></button>
        <button className="absolute right-4 top-[50%] bg-white rounded-full p-1"><ArrowRight01Icon/></button>
        <button className="absolute left-4 top-[50%] bg-white rounded-full p-1"><ArrowLeft01Icon/></button>

      </section>
      <section className="p-2">
        <section>
            <p className="font-bold text-2xl">UGX {price.min_price.toLocaleString() || "--"} - {price.max_price.toLocaleString() || "--"} <span className="font-thin text-xl">month</span></p>
        </section>
        <section className="flex gap-4 itens-center">
          <p className="flex gap-2">
            <BedIcon/>
            <span>{2 || "--"} Bed(s)</span>
          </p>
          <p className="flex gap-2">
            <Bathtub01Icon/>
            <span>{3 || "--"} Bath(s)</span>
          </p>
        </section>
        <section>
          <p className="truncate">{item.location || "--"}</p>
        </section>
        <section>
          <p className="truncate opacity-60 mt-2">{item.units.length || "--"} Units available</p>
        </section>
      </section>
    </div>
  );
};

export default ListingCard;
