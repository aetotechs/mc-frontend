import { ArrowLeft01Icon, ArrowRight01Icon, Bathtub01Icon, BedIcon, FavouriteIcon } from "hugeicons-react";
import React, { useState } from "react";

const ListingCard = ({ item }) => {
  const [price, setPrice] = useState({ min_price: 90000.0, max_price: 230000.0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < item.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="w-[350px] border rounded-xl">
      <section className="relative h-56 w-full bg-gray-200 rounded-t-xl">
        <img
          src={item.photos[currentImageIndex]?.url || "public/images/hero-image.png"}
          alt=""
          className="object-cover w-full h-full rounded-t-xl opacity-90"
        />
        <div className="absolute flex items-center gap-2 left-4 text-sm top-4 ">
          { item.furnished && <p className="rounded-full bg-orange-300 px-3 py-1">Furnished</p>}
          { item.videoTour && <p className="text-white top-4 rounded-full bg-blue-500 px-3 py-1">3D & Video Tour</p>}
        </div>
        <button className="absolute right-4 top-4 rounded-full bg-white p-1" title="Add to favourites list">
          <FavouriteIcon size={18}/>
        </button>
        {currentImageIndex < item.photos.length - 1 && (
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1"
            title="View next photo"
          >
            <ArrowRight01Icon />
          </button>
        )}
        {currentImageIndex > 0 && (
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1"
            title="View previous photo"
          >
            <ArrowLeft01Icon />
          </button>
        )}
      </section>
      <section className="p-2">
        <section>
          <p className="font-bold text-2xl">
            UGX {price.min_price.toLocaleString() || "--"} - {price.max_price.toLocaleString() || "--"}{" "}
            <span className="font-thin text-xl">month</span>
          </p>
        </section>
        <section className="flex gap-4 items-center">
          <p className="flex gap-2">
            <BedIcon />
            <span>{2 || "--"} Bed(s)</span>
          </p>
          <p className="flex gap-2">
            <Bathtub01Icon />
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