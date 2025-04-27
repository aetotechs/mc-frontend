import React, { useRef, useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon, FavouriteCircleIcon, FavouriteIcon, Image02Icon, Share01Icon, Share05Icon, Video01Icon, VirtualRealityVr01Icon, VirtualRealityVr02Icon, VrGlassesIcon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';

const MobileDetails = ({ property }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    const sectionsRef = {
        "Overview": useRef(null),
        "Amenities": useRef(null),
        "Location": useRef(null),
        "Reviews": useRef(null),
    };

    const photos = property?.media?.photos || [];
    const totalImages = photos.length;

    // Navigation functions
    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === totalImages - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
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
                prevSlide(); // Swipe right
            } else if (swipeDistance < -50) {
                nextSlide(); // Swipe left
            }
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    const handleShare = () => {
        // Implement share functionality
        console.log("Share this property");
    }
    const handleAddToFavourites = () => {
        // Implement add to favourites functionality
        console.log("Add to favourites");
    };

    return (
        <div className="md:hidden">
            {/* Tabs */}
            <div className="flex justify-around py-3 items-center sticky top-0 bg-white z-10">
                {["Overview", "Amenities", "Location", "Reviews"].map((tab) => (
                    <div key={tab} className="relative">
                        <h4 
                            className={`cursor-pointer ${
                                activeTab === tab ? "text-primary font-semibold" : ""
                            }`}
                            onClick={() => {
                                sectionsRef[tab].current?.scrollIntoView({ behavior: "smooth" });
                                setActiveTab(tab);
                            }}
                        >
                            {tab}
                        </h4>
                        {activeTab === tab && (
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-6 h-[3px] bg-primary rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>  

            {/* Image Carousel */}
            <div className="relative w-full h-[50vh] bg-gray-100 overflow-hidden">
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
                                    alt={`${property?.name} - Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <img
                                src="/images/placeholder.png"
                                alt="No images available"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <>
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 top-6 bg-white text-black p-2 rounded-full"
                    >
                        <ArrowLeft01Icon size={14} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="absolute right-16 top-6 bg-white text-black p-2 rounded-full"
                    >
                        <Share05Icon size={14} />
                    </button>
                    <button
                        onClick={handleAddToFavourites}
                        className="absolute right-4 top-6 bg-white text-black p-2 rounded-full"
                    >
                        <FavouriteIcon size={14} />
                    </button>
                </>

                {/* Badges: Furnished and 3D & Video Tour */}
                <div className="absolute flex items-center gap-2 left-4 bottom-4 text-xs">
                    {property?.furnishing === "FURNISHED" && (
                        <p className="rounded-full bg-[#FFC107] bg-opacity-70 text-black px-2 py-1 font-medium">
                        Furnished
                        </p>
                    )}
                    {(property?.media?.threeDTourLink || property?.media?.threeDTour) && (
                        <p className="whitespace-nowrap text-white rounded-full bg-blue-500 px-2 py-1 font-medium">
                        3D & Video Tour
                        </p>
                    )}
                </div>

                {/* Image Counter */}
                {totalImages > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black rounded-full px-4 py-1 text-xs flex items-center gap-1">
                        <span className='text-white'>{currentImageIndex + 1}/{totalImages}</span>
                    </div>
                )}
            </div>

            <section className="flex items-center gap-2 px-3 py-2">
                <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-md py-2 px-4 text-md">
                    <Image02Icon size={18} className='text-gray-400'/>
                    <span>{property?.media?.photos?.length}</span>
                    <span>photos</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-sm py-2 px-4 text-md">
                    <Video01Icon size={18} className='text-gray-400'/>
                    <span>video</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-sm py-2 px-4 text-md">
                    <VirtualRealityVr02Icon size={18} className='text-gray-400'/>
                    <span>video</span>
                </div>
            </section>
        </div>
    );
};

export default MobileDetails;