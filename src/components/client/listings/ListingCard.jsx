import { ArrowLeft01Icon, ArrowRight01Icon, Bathtub01Icon, BedIcon, FavouriteIcon, Image02Icon } from "hugeicons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ item }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const photos = item?.media?.photos || [];
  const totalImages = photos.length;

  // Navigation functions with infinite loop
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  // Swipe handling
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 50) {
        handlePrevImage(); // Swipe right
      } else if (swipeDistance < -50) {
        handleNextImage(); // Swipe left
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="w-full border rounded-xl shadow-sm overflow-hidden">
      {/* Image Section */}
      <section className="relative w-full h-[30vh] md:h-[30vh] overflow-hidden rounded-t-xl">
        <div
          className="flex w-full h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div key={index} className="min-w-full h-full">
                <img
                  src={photo}
                  alt={`${item?.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-t-xl"
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img
                src="/images/placeholder.png"
                alt="No images available"
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
          )}
        </div>

        {/* Badges: Furnished and 3D & Video Tour */}
        <div className="absolute flex items-center gap-2 left-4 top-4 text-xs">
          {item.furnishing === "FURNISHED" && (
            <p className="rounded-full bg-[#FFC107] bg-opacity-70 text-black px-2 py-1 font-medium">
              Furnished
            </p>
          )}
          {(item?.media?.threeDTourLink || item?.media?.threeDTour) && (
            <p className="whitespace-nowrap text-white rounded-full bg-blue-500 px-2 py-1 font-medium">
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
        {totalImages > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1.5 shadow-sm"
              title="View previous photo"
            >
              <ArrowLeft01Icon size={14} className="text-gray-600" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-[50%] translate-y-[-50%] bg-white rounded-full p-1.5 shadow-sm"
              title="View next photo"
            >
              <ArrowRight01Icon size={14} className="text-gray-600" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {totalImages > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
            {photos.map((_, index) => (
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
        <p className="font-bold text-lg md:text-xl text-gray-800 truncate">
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
        {item?.unitsAvailable && (
          <p className="text-xs text-gray-500 mt-1">
            {item?.units?.length || "--"} unit(s) available
          </p>
        )}
      </section>
    </div>
  );
};

export default ListingCard;