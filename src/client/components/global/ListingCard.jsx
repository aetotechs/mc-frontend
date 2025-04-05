import { ArrowLeft01Icon, ArrowRight01Icon, Bathtub01Icon, BedIcon, FavouriteIcon } from "hugeicons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ item }) => {
  const navigate = useNavigate();
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
    <div className="w-full border rounded-xl shadow-sm overflow-hidden">
      {/* Image Section */}
      <section className="relative w-full h-[30vh] md:h-[26vh] bg-gray-200 rounded-t-xl">
        <img
          src={item?.media?.photos[currentImageIndex]?.url ?? "/images/placeholder.png"}
          alt={item?.name}
          className="w-full h-full object-cover rounded-t-xl"
          onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
        />

        {/* Badges: Furnished and 3D & Video Tour */}
        <div className="absolute flex items-center gap-2 left-4 top-4 text-xs">
          {item.furnishing === "FURNISHED" && (
            <p className="rounded-lg bg-[#FFC107] text-black px-2 py-1 font-medium">
              Furnished
            </p>
          )}
          {(item?.media?.threeDTourLink || item?.media?.threeDTour) && (
            <p className="whitespace-nowrap text-white rounded-lg bg-blue-500 px-2 py-1 font-medium">
              3D & Video Tour
            </p>
          )}
        </div>

        {/* Favourite Icon */}
        <button
          className="absolute right-4 top-4 rounded-full bg-white p-1.5 shadow-sm"
          title="Add to favourites list"
        >
          <FavouriteIcon size={14} className="text-gray-600" />
        </button>

        {/* Navigation Arrows */}
        {currentImageIndex > 0 && (
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1.5 shadow-sm"
            title="View previous photo"
          >
            <ArrowLeft01Icon size={14} className="text-gray-600" />
          </button>
        )}
        {currentImageIndex < item?.media?.photos?.length - 1 && (
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1.5 shadow-sm"
            title="View next photo"
          >
            <ArrowRight01Icon size={14} className="text-gray-600" />
          </button>
        )}

        {/* Pagination Dots */}
        {item?.media?.photos?.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
            {item?.media?.photos?.map((_, index) => (
              <span
                key={index}
                className={`rounded-full ${
                  currentImageIndex === index ? "bg-white h-2 w-2" : "bg-gray-300 h-1.5 w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Text Section */}
      <section
        className="p-4 cursor-pointer"
        title="Property details"
        onClick={() => navigate(`/details/${item?.propertyId}`)}
      >
        {/* Price */}
        <p className="font-bold text-lg md:text-xl text-gray-800">
          UGX {item?.priceRange}{" "}
          <span className="font-normal text-sm text-gray-600">month</span>
        </p>

        {/* Beds and Baths */}
        <div className="flex items-center gap-4 text-sm text-gray-700 mt-1">
          <p className="flex items-center gap-1.5">
            <BedIcon size={14} className="text-gray-600" />
            <span>{item?.bedRange || "--"} Beds</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Bathtub01Icon size={14} className="text-gray-600" />
            <span>{item?.bathRange || "--"} Baths</span>
          </p>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-600 truncate mt-1">
          {item?.address?.description || "--"}
        </p>

        {/* Units Available */}
        { item?.unitsAvailable &&
          <p className="text-xs text-gray-500 mt-1">
            {item?.units?.length || "--"} unit(s) available
          </p>
        }
      </section>
    </div>
  );
};

export default ListingCard;