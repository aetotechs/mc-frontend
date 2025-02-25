import { ArrowLeft01Icon, ArrowRight01Icon, Bathtub01Icon, BedIcon, FavouriteIcon } from "hugeicons-react";
import React, { useState } from "react";

const ListingCard = ({ item }) => {
  const [price, setPrice] = useState({ min_price: 90000.0, max_price: 230000.0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < item.media.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="w-full border rounded-xl">
      <section className="relative w-full h-[20vh] md:h-[26vh] bg-gray-200 rounded-t-xl">
        <img
          src={item?.media?.photos[currentImageIndex]?.url?? "/images/hero-image.png"}
          alt="Property"
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute flex items-center gap-2 left-4 text-sm md:text-[10px] top-4 ">
          { item.furnished && <p className="rounded-full bg-orange-300 px-2">Furnished</p>}
          { item.videoTour && <p className="whitespace-nowrap text-white top-4 rounded-full bg-blue-500 px-2">3D & Video Tour</p>}
        </div>
        <button className="absolute right-4 top-4 rounded-full bg-white p-1" title="Add to favourites list">
          <FavouriteIcon size={14}/>
        </button>
        {currentImageIndex < item?.media?.photos?.length - 1 && (
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1"
            title="View next photo"
          >
            <ArrowRight01Icon size={14} />
          </button>
        )}
        {currentImageIndex > 0 && (
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1"
            title="View previous photo"
          >
            <ArrowLeft01Icon size={14} />
          </button>
        )}
      </section>
      <section className="p-2 px-4">
        <section>
          <p className="font-bold text-xl md:text-lg whitespace-nowrap">
            UGX {price.min_price.toLocaleString() || "--"} - {price.max_price.toLocaleString() || "--"}{" "}
            <span className="font-thin text-sm">month</span>
          </p>
        </section>
        <section className="flex whitespace-nowrap text-sm font-thin gap-4 items-center">
          <p className="flex gap-2 items-center">
            <BedIcon size={14} />
            <span>{item.bedRange || "--"} Bed(s)</span>
          </p>
          <p className="flex gap-2 items-center">
            <Bathtub01Icon size={14} />
            <span>{item?.bathRange || "--"} Bath(s)</span>
          </p>
        </section>
        <section>
          <p className="truncate text-sm">{item?.address?.description || "--"}</p>
        </section>
        <section>
          <p className="truncate opacity-60 text-xs mt-2">{item.units.length || "--"} Units available</p>
        </section>
      </section>
    </div>
  );
};

export default ListingCard;