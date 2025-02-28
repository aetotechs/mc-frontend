import React, { useEffect, useRef, useState } from "react";
import Header from "../components/global/Header";
import { Button } from "primereact/button";
import { useAuthDialog } from "../utils/hooks/useAuthDialog";
import Footer from "../components/global/Footer";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  Bathtub01Icon,
  BedIcon,
  BubbleChatIcon,
  CalendarAdd01Icon,
  FavouriteIcon,
  Image02Icon,
  ParkingAreaCircleIcon,
  Share05Icon,
  ShieldUserIcon,
  StarIcon,
  TapeMeasureIcon,
  Video01Icon,
  Key01Icon,
} from "hugeicons-react";
import Map from "../components/details/Map";
import useProperties from "../utils/hooks/useProperties";
import { useParams } from "react-router-dom";
import Spinner from "../../globals/ui/Spinner";
import { amenitiesList } from "../utils/constansts/AmenitiesList";
import RatingStars from "../components/ui/RatingStars";

const reviews = [
  {
    name: "Alice Johnson",
    comment: "Great experience! The place was clean and very comfortable.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "John Doe",
    comment: "Loved the environment. Definitely coming back!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Emma Brown",
    comment: "The service was top-notch, and the location is perfect.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },

  {
    name: "Alice Johnson",
    comment: "Great experience! The place was clean and very comfortable.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "John Doe",
    comment: "Loved the environment. Definitely coming back!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Emma Brown",
    comment: "The service was top-notch, and the location is perfect.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const DetailsPage = () => {
  const { openDialog } = useAuthDialog();
  const [property, setProperty] = useState({});
  const { propertyId } = useParams();
  const { fetchPropertyById, loading } = useProperties();
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggleAllAmenities, setToggleAllAmenities] = useState(false);
  const itemsPerPage = 3;
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    ...new Set(
      property?.units?.map((unit) => `${unit.bedRooms} Bed(${unit.bedRooms})`)
    ),
  ];

  const filteredUnits =
    selectedFilter === "All"
      ? property?.units
      : property?.units?.filter(
          (unit) => `${unit.bedRooms} Bed(${unit.bedRooms})` === selectedFilter
  );

  const sectionsRef = {
    "Overview": useRef(null),
    "Amenities": useRef(null),
    "Location": useRef(null),
    "Reviews": useRef(null),
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0)/reviews?.length;

  useEffect(() => {
    const fetchItem = async () => {
      setProperty(await fetchPropertyById(propertyId) || {});
    }
    fetchItem();
  }, [propertyId]);

  const totalSlides = Math.ceil(reviews.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const images = ["images/ap6.jpeg", "images/ap3.jpeg", "images/ap5.jpeg"];
  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const [toggledUnitDetails, setToggledUnitDetails] = useState(false);

  const toggleUnitDetails = (unit, toggled) => {
    setToggledUnitDetails(!toggled);
    return(
      <Dialog/>
    )
  }

  return (
    <div className="relative h-screen overflow-auto">
      
      <div className={`fixed h-[100vh] w-[100vw] flex justify-center items-center bg-black/30 z-50 ${loading ? "block" : "hidden"}`}>
        <Spinner/>
      </div>

      <section>
        <Header bottomBorder={true}/>
      </section>

      <section className={`pb-4 pt-5 px-[8vw] flex justify-between ${""} sticky -top-2 z-10 bg-white`}>
        <div className="relative">
          <div className="flex gap-10 text-[15px] py-2">
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
        </div>

        <div className="flex items-center gap-10 ">
          <div className="flex items-center gap-1">
            <span>
              <Share05Icon className="h-4 w-4" />
            </span>

            <span>Share</span>
          </div>

          <div className="flex items-center gap-1">
            <span>
              <FavouriteIcon className="h-4 w-4" />
            </span>
            <span>Favorite</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-6 px-[8vw] my-4 gap-10">
        <section className="col-span-4">
          <div className="rounded-md w-full" ref={sectionsRef["Overview"]}>
            <div className="relative w-full h-[65vh] overflow-hidden rounded-2xl">
              <div className="absolute bg-[#FFC654] rounded-lg py-1 px-2 m-4 text-sm">
                Furnished
              </div>
              <img
                src={ '/images/ap6.jpeg' || images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-2 rounded-full"
              >
                <ArrowLeft01Icon size={14} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-2 rounded-full"
              >
                <ArrowRight01Icon size={14} />
              </button>

              <div className="absolute bottom-4 right-4 w-full flex justify-end gap-2">
                <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 text-sm">
                  <Image02Icon className="h-3 w-3" />
                  <span>{images.length}</span>
                  <span>photos</span>
                </div>

                <div className="flex items-center gap-1 bg-white rounded-sm px-2 py-1 text-sm">
                  <Video01Icon className="h-3 w-3" />
                  <span>video</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mt-4">
              <i className="rounded-full bg-[#006AB5] h-2 w-2"/>
              <p className="text-sm">{ property?.propertyType?.toString() }</p>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl">{ property?.name}</h1>
              <article>
                <h1 className="font-bold text-2xl">UGX { property?.priceRange } <span className="text-sm font-normal">month</span></h1>
              </article>
            </div>
            <p className="text-gray-500">
              { property?.address?.description || "No address provided, contact support for details" }
            </p>
            
            <div className="flex items-center gap-6 my-2">
              <div className="flex items-center gap-1">
                <BedIcon/>
                <span className="">{property?.bedRange || "0"} Beds</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Bathtub01Icon/>
                <span className="">{property?.bathRange || "0"} Baths</span>
              </div>

              <div className="flex items-center gap-1">
                <TapeMeasureIcon/>
                <span className="">{property?.propertyArea || "--"} sqft</span>
              </div>

              <div className="flex items-center gap-1">
                <ParkingAreaCircleIcon/>
                <span className="">{property?.parkingCapacity || "--"} Parking Spaces</span>
              </div>
            </div>

            <div className="my-6">
              <h1 className="font-normal text-[1.2rem] mb-2">About this property</h1>
              <div>
                <p className="text-gray-600 text-lg">{ isExpanded ? 
                  property?.description : property?.description?.slice(0, 150) + "..." }
                </p>
                <button
                  disabled={property?.description?.length <= 150}
                  type="button"
                  className="flex items-center gap-1 text-primary font-medium mt-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  { property?.description?.length <= 150 ? 
                      "All set" : isExpanded ? 
                          "Read Less" : "Read full description"
                  }
                  { property?.description?.length <= 150 ? 
                      null : isExpanded ? 
                        <ArrowUp01Icon size={18} /> : <ArrowDown01Icon size={18} />
                  }
                </button>
              </div>
            </div>
          </div>

          <section className="my-8">
            <h1 className="font-normal text-[1.2rem] mb-4">
              What’s Available ({filteredUnits?.length} units)
            </h1>
            
            {/* Tabs */}
            <section className="flex mb-4 border rounded-lg w-content">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  className={`px-2 py-1 w-[10%] text-center ${selectedFilter === filter ? "border-2 border-primary" : ""}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </section>

            {/* Units Display */}
            <section className="grid gap-4">
              {filteredUnits?.map((unit, i) => (
                <article key={unit.unitId} className="flex items-center gap-2 w-full border rounded-xl">
                  <div className="w-[20%] m-2 h-[90%] bg-gray-200 rounded-lg">
                    <img src={ unit?.media?.photos[0] || "/images/ap2.jpeg"} alt={unit?.name} className="w-full h-full object-cover rounded-lg"/>
                  </div>
                  <article className="p-5 rounded-lg flex justify-between items-center w-full">
                    <div className="flex gap-3 text-[1.2rem]">
                      <p onClick={ () => toggleUnitDetails(unit, !toggledUnitDetails) } className="cursor-pointer hover:underline font-semibold text-primary">{"Unit " + i}</p>
                      <p className="text-gray-500">{unit.bedRooms} Bed • {unit.bathRooms} Baths • {unit.size} sqft</p>
                      <p className="font-bold">UGX {unit.price.toLocaleString()} month</p>
                    </div>
                    <p className="flex gap-2 items-center px-4 py-2 border-2 border-primary bg-blue-100 text-primary font-semibold rounded-xl"><span className="bg-primary w-2 h-2 rounded-full"/>Available</p>
                  </article>
                </article>
              ))}
            </section>
          </section>

          <section className="my-8" ref={sectionsRef["Amenities"]}>
            <h1 className="font-normal text-[1.2rem] mb-2">Amenities</h1>

            <div className="grid grid-cols-3 gap-4 text-[0.8rem]">
              {property?.amenities && (
                console.log(property.amenities),
                Object.keys(property.amenities)
                  .filter((key) => property.amenities[key])
                  .slice(1, toggleAllAmenities ? undefined : 6)
                  .map((key, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {amenitiesList[key]?.icon && React.createElement(amenitiesList[key].icon)}
                      <span>{amenitiesList[key]?.name || key}</span>
                    </div>
                  ))
              )}
            </div>

            <button
              disabled={Object.values(property?.amenities || {}).filter(Boolean).length <= 6}
              type="button"
              className="bg-white text-primary font-semibold mt-2 border rounded-lg py-2 px-4"
              onClick={() => setToggleAllAmenities(!toggleAllAmenities)}
            >
              { Object.values(property?.amenities || {}).filter(Boolean).length <= 6 ? "All shown" : toggleAllAmenities ? "Show less amenities" : "See all amenities"}
            </button>
          </section>

          <section className="w-[50%] ">
            <h1 className="font-normal text-[1.2rem] mb-2">Features</h1>

            <div className="flex justify-between">
              <div>
                <span>View</span>
                <ol className="list-disc list-inside">
                  <li>Water</li>
                  <li>Mountain</li>
                </ol>
              </div>

              <div>
                <span>Pets</span>
                <ol className="list-disc">
                  <li>Dogs allowed</li>
                  <li>Cats allowed</li>
                </ol>
              </div>
            </div>
          </section>

        </section>

        <section className="col-span-2 flex flex-col gap-10">
          <div className="rounded-2xl object-cover overflow-hidden bg-red-700 h-[65vh]">
            <img
              src="/images/ap6.jpeg"
              alt="House"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-xl flex flex-col gap-4 p-5 shadow-md border">
            <span className="text-xl font-medium">Tour Property</span>
            
            <Button className="py-3 flex items-center bg-primary justify-center gap-2 text-white text-sm font-normal rounded-md p-2">
              <Key01Icon className="h-4 w-4" />
              <span>Request to rent</span>
            </Button>

            <Button className="py-3 flex items-center bg-primary bg-opacity-20 justify-center gap-2 text-primary text-sm font-semibold rounded-md p-2">
              <CalendarAdd01Icon className="h-4 w-4" />
              <span>Schedule tour</span>
            </Button>

            <Button className="py-3 mt-3 flex items-center justify-center gap-1 text-sm font-semibold rounded-md border p-2">
              <BubbleChatIcon className="h-4 w-4" />
              <span>Chat with Owner </span>
            </Button>

            <div className="flex items-center gap-2 mt-5">
              <span>
                <ShieldUserIcon className="h-6 w-6 text-[#80828D]" />
              </span>
              <span className="text-xs">
                For your safety, always complete transactions and communicate
                through the MyCrib website.
              </span>
            </div>
          </div>
        </section>

      </section>

      <section className="px-[8vw]" ref={sectionsRef["Location"]}>
        <section className="flex flex-col ">
          <h1 className="font-normal text-[1.2rem] mb-2">Explore the area</h1>
          <span className="text-sm text-gray-500">{ property?.address?.description || "Exact address not available"}</span>

          <div className="border rounded-lg my-2 h-[40vh]">
            <Map/>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.13613198205!2d32.49461968053299!3d0.2905604467530591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177da322867754d1%3A0x56da7cad63130f35!2sWakiso%2C%20Kampala!5e0!3m2!1sen!2sug!4v1739857757719!5m2!1sen!2sug"
              // style={{ width: "100%", height: "250px", border: "none" }}
              className="w-full h-full"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            /> */}
          </div>
        </section>

        <section className="my-4 flex flex-col" ref={sectionsRef["Reviews"]}>
          <h1 className="font-normal text-[1.2rem] mb-1">Reviews</h1>

          <div className="flex gap-8 w-full my-1">
            <div className="border shadow-md rounded-md col-span-1 p-3 w-[25%]">
              <span className="font-bold">Ratings</span>

              <div className="flex my-1 gap-2 border-b pb-2">
                <span className="text-2xl font-bold">{averageRating?.toFixed(1) || "0.0"}</span>

                <div className="flex flex-col">
                  <RatingStars rating={averageRating}/>

                  <span className="text-[#62636C] text-[0.8rem]">
                    Based on {reviews?.length || 0} ratings
                  </span>
                </div>
              </div>

              {/* <div className="border h-1/2 my-3 w-full bg-slate-400"></div> */}

              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const totalReviews = reviews?.length || 1;
                  const ratePercentages = {
                    _5: reviews?.filter((review) => review?.rating === 5)?.length / totalReviews * 100,
                    _4: reviews?.filter((review) => review?.rating === 4)?.length / totalReviews * 100,
                    _3: reviews?.filter((review) => review?.rating === 3)?.length / totalReviews * 100,
                    _2: reviews?.filter((review) => review?.rating === 2)?.length / totalReviews * 100,
                    _1: reviews?.filter((review) => review?.rating === 1)?.length / totalReviews * 100, 
                  }
                  console.log(JSON.stringify(ratePercentages));
                  return (
                    <div key={rating} className="flex items-center gap-1">
                      <span className="w-4 text-sm font-medium">{rating}</span>
                      <div className="w-full bg-gray-200 rounded-full overflow-hidden h-1">
                        <div className={`h-full bg-[#FFAA00] transition-all`}
                        style={{ width: `${ratePercentages['_' + rating]?.toFixed(0)}%` }}></div>
                      </div>
                    </div>
                )})}
              </div>
            </div>

            <section className="w-full overflow-hidden space-y-3 flex flex-col">
              <section className="relative flex-1">
                <button className="absolute top-1/2 -left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                  onClick={prevReview}
                >
                  <ArrowLeft01Icon size={14} />
                </button>
                <button
                  className="absolute top-1/2 -right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                  onClick={nextReview}
                >
                  <ArrowRight01Icon size={14} />
                </button>
                <section className="flex w-full gap-4 overflow-auto no-scrollbar ">
                  {
                    reviews?.map((review, i) => (
                      <article className="p-3 bg-gray-100 rounded-lg">
                        <section className="flex gap-4">
                          <div className="rounded-full w-[3rem] h-[3rem]">
                            <img src={review?.image} alt={review?.name + "'s image"} className="object-cover rounded-full" />
                          </div>
                          <div>
                            <p className="text-[1rem] font-nromal whitespace-nowrap">{review?.name}</p>
                            <div className="flex gap-4 items-center">
                              <RatingStars rating={review?.rating}/>
                              <p>{Date.now().toPrecision()}</p>
                            </div>
                          </div>
                        </section>
                        <section className="pt-4 text-[1rem] text-gray-500">
                          <p>{review?.comment}</p>
                        </section>
                        
                      </article>
                    ))
                  }
                </section>

              </section>
              <section className="flex justify-end">
                <button className="text-primary border px-4 py-2 rounded-lg font-semibold">See all reviews</button>
              </section>
            </section>

            <div className="relative col-span-4 hidden">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 gap-5"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="grid grid-cols-3 gap-5 min-w-full"
                    >
                      {reviews
                        .slice(
                          slideIndex * itemsPerPage,
                          (slideIndex + 1) * itemsPerPage
                        )
                        .map((review, index) => (
                          <div
                            key={index}
                            className="flex flex-col px-3 bg-[#eff0f3e0] py-6 rounded-lg shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={review.image}
                                alt={review.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="flex flex-col">
                                <h4 className="mt-3 font-semibold">
                                  {review.name}
                                </h4>
                                <div className="flex text-yellow-500 mt-2">
                                  {Array.from({ length: review.rating }).map(
                                    (_, i) => (
                                      <StarIcon
                                        key={i}
                                        size={16}
                                        fill="yellow"
                                      />
                                    )
                                  )}
                                </div>
                                <span>Feb 3, 2024</span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-center mt-2">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                onClick={prevReview}
              >
                <ArrowLeft01Icon size={14} />
              </button>
              <button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                onClick={nextReview}
              >
                <ArrowRight01Icon size={14} />
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
};

export default DetailsPage;
