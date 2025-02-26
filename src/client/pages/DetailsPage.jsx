import React, { useState } from "react";
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
  ShieldKeyIcon,
  SlowWindsIcon,
  Sofa01Icon,
  BubbleChatIcon,
  CalendarAdd01Icon,
  Dumbbell01Icon,
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
  const [activeTab, setActiveTab] = useState("Over view");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsPerPage = 3;

  const totalSlides = Math.ceil(reviews.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const images = ["images/ap6.jpeg", "images/ap3.jpeg", "images/ap5.jpeg"];
  const fullText =
    "Uniport Garden Apartments in Wakiso, Uganda, offers modern and spacious rental units in a serene environment. Conveniently located near key amenities, these apartments feature comfortable living spaces with essential facilities, perfect for families and professionals. Enjoy a peaceful commun";
  const shortText = fullText.slice(0, 120) + "...";

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header bottomBorder={true}/>
      </section>

      <section className="pb- pt-5 px-[8vw] flex justify-between">
        <div className="relative">
          <div className="flex gap-10 text-[15px] py-2">
            {["Over view", "Amenities", "Location", "Reviews"].map((tab) => (
              <div key={tab} className="relative">
                <h4
                  className={`cursor-pointer ${
                    activeTab === tab ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
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
        <div className="col-span-4">
          <div className="rounded-md  w-full ">
            <div className="relative w-full h-[65vh] overflow-hidden rounded-2xl">
              <div className="absolute bg-[#FFC654] rounded-lg py-1 px-2 m-2 text-sm">
                Furnished
              </div>
              <img
                src={ '/images/ap6.jpeg' || images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ArrowLeft01Icon size={14} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ArrowRight01Icon size={14} />
              </button>

              <div className="absolute bottom-4 px-4 w-full flex justify-end gap-2">
                <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 text-sm">
                  <span>
                    <Image02Icon className="h-3 w-3" />
                  </span>
                  <span>{images.length}</span>
                  <span>photos</span>
                </div>

                <div className="flex items-center gap-1 bg-white rounded-sm px-2 py-1 text-sm">
                  <span>
                    <Video01Icon className="h-3 w-3" />
                  </span>
                  <span>video</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mt-4">
              <i className="rounded-full bg-[#006AB5] h-2 w-2"/>
              <p className="text-sm">Rental</p>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl">Uniport Garden Apartments</h1>
              <article>
                <h1 className="font-bold text-2xl">UGX 800,000 - UGX 1,000,000 <span className="text-sm font-normal">month</span></h1>
              </article>
            </div>
            <p className="text-gray-500">
              Sunrise rest, Bombo, Luweero
            </p>
            
            <div className="flex items-center gap-6 my-2">
              <div className="flex items-center gap-1">
                <BedIcon/>
                <span className="">1-2 Beds</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Bathtub01Icon/>
                <span className="">1-2 Baths</span>
              </div>

              <div className="flex items-center gap-1">
                <TapeMeasureIcon/>
                <span className="">410 sqft</span>
              </div>

              <div className="flex items-center gap-1">
                <ParkingAreaCircleIcon/>
                <span className="">4 Parking Spaces</span>
              </div>
            </div>

            <div className="my-6">
              <h1 className="font-normal text-xl mb-2">About this property</h1>
              <div>
                <p className="text-gray-600 text-lg">{ isExpanded ? fullText : shortText }</p>
                <button
                  className="flex items-center gap-1 text-primary font-medium mt-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read Less" : "Read full description"}
                  {isExpanded ? (
                    <ArrowUp01Icon size={18} />
                  ) : (
                    <ArrowDown01Icon size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <span>What’s Available (4 units)</span>
          </div>

          <div className="my-3">
            <p className="">Amenities</p>
            
            <div className="grid grid-cols-3 ">
              <div className="space-y-4">
                
                <div className="flex items-center gap-1">
                  <Sofa01Icon />
                  <p>Furnished</p>
                </div>

                <div className="flex items-center gap-1">
                  <ShieldKeyIcon />
                  <p>Security</p>
                </div>

                <div className="flex items-center gap-1">
                  <SlowWindsIcon />
                  <p>Air conditioning</p>
                </div>

                <div className="flex items-center gap-1">
                  <Dumbbell01Icon />
                  <p>Gym</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <Sofa01Icon />
                  <p>Furnished</p>
                </div>

                <div className="flex items-center gap-1">
                  <ShieldKeyIcon />
                  <p>Security</p>
                </div>

                <div className="flex items-center gap-1">
                  <SlowWindsIcon />
                  <p>Air conditioning</p>
                </div>

                <div className="flex items-center gap-1">
                  <Dumbbell01Icon />
                  <p>Gym</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <Sofa01Icon />
                  <p>Furnished</p>
                </div>

                <div className="flex items-center gap-1">
                  <ShieldKeyIcon />
                  <p>Security</p>
                </div>

                <div className="flex items-center gap-1">
                  <SlowWindsIcon />
                  <p>Air conditioning</p>
                </div>

                <div className="flex items-center gap-1">
                  <Dumbbell01Icon />
                  <p>Gym</p>
                </div>

              </div>
            </div>
          </div>

          <div className="w-[50%]">
            <p>Features</p>

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
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-10">
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
        </div>
      </section>

      <section className="px-[8vw]">
        <div className="flex flex-col ">
          <span className="font-semibold">Explore the area</span>
          <span className="text-sm">Wakiso, Uganda</span>

          <div className="border rounded-lg my-2 h-[40vh]">
            <Map/>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.13613198205!2d32.49461968053299!3d0.2905604467530591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177da322867754d1%3A0x56da7cad63130f35!2sWakiso%2C%20Kampala!5e0!3m2!1sen!2sug!4v1739857757719!5m2!1sen!2sug"
              style={{ width: "100%", height: "250px", border: "none" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
        </div>

        <div className="my-4 flex  flex-col ">
          <span>Reviews</span>

          <div className=" gap-5 items-center  grid grid-cols-5">
            <div className="border shadow-md rounded-md col-span-1  p-3 my-3">
              <span className="font-bold">Ratings</span>

              <div className="flex justify-between my-1 gap-2">
                <span className=" text-2xl font-bold">4.1</span>

                <div className="flex flex-col">
                  <div className="flex text-yellow-500 ">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={14} fill="yellow" />
                    ))}
                  </div>
                  <span className="text-[#62636C] text-sm">
                    Based on 80 ratings
                  </span>
                </div>
              </div>
              <div className="border h-1 my-3 w-full bg-slate-400"></div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="w-4 text-sm font-medium">{rating}</span>
                    <div className="w-full bg-gray-200 rounded-full overflow-hidden h-1">
                      <div
                        className="h-full bg-[#FFAA00] transition-all"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" relative col-span-4 ">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 gap-5"
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
                <ArrowLeft02Icon size={20} />
              </button>
              <button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                onClick={nextReview}
              >
                <ArrowRight02Icon size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
};

export default DetailsPage;
