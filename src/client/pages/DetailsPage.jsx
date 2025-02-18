import React, { useState } from "react";
import Header from "../components/global/Header";
import { useAuthDialog } from "../utils/hooks/useAuthDialog";
import { dialog_operations } from "../utils/constansts/DialogOperations";
import Footer from "../components/global/Footer";
import { Button } from "primereact/button";
import {
  Call02Icon,
  Dumbbell01Icon,
  Edit02Icon,
  Location01Icon,
  Notification01Icon,
  PaymentSuccess02Icon,
  ShieldKeyIcon,
  SlowWindsIcon,
  Sofa01Icon,
  SquareLock01Icon,
  UserCircle02Icon,
} from "hugeicons-react";
import { getAuthUser } from "../utils/cookies/AuthCookiesManager";

const user = getAuthUser();

const DetailsPage = () => {
  const { openDialog } = useAuthDialog();
  const [activeTab, setActiveTab] = useState("Over view");

  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section className="b-3 px-[8vw] flex justify-between">
        <div className="relative">
          <div className="flex gap-10 text-[15px] py-2">
            {["Over view", "Amenities", "Location", "Reviews"].map((tab) => (
              <div key={tab} className="relative">
                <h4
                  className={`cursor-pointer ${
                    activeTab === tab ? "text-[#2F91D7] font-semibold" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </h4>

                {activeTab === tab && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-6 h-[3px] bg-[#2F91D7] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10 ">
          <div>
            <span>Share</span>
          </div>

          <div>
            <span>Favorite</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-6 px-[8vw] my-4 ">
        <div className="col-span-4">
          <div className="rounded-md  w-full ">
            <img src="/images/ap1.jpeg" alt="Image" className="object-cover" />
          </div>
          <div>
            <span>Rental</span>

            <div className="flex justify-between">
              <span>Uniport Garden Apartments</span>

              <span>UGX 800,000 - UGX 1,000,000 month</span>
            </div>
            <span>Sunrise rest, Bombo, Luweero</span>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              omnis aliquid consequuntur!
            </div>
            <div>
              <span>About this property</span>
              <p>
                Uniport Garden Apartments in Wakiso, Uganda, offers modern and
                spacious rental units in a serene environment. Conveniently
                located near key amenities, these apartments feature comfortable
                living spaces with essential facilities, perfect for families
                and professionals. Enjoy a peaceful commun...
              </p>
            </div>
          </div>

          <div>
            <span>What’s Available (4 units)</span>
          </div>

          <div>
            <span>Amenities</span>

            <div className="grid grid-cols-3 ">
              <div>
                <div className="flex items-center gap-1">
                  <span>
                    <Sofa01Icon />
                  </span>

                  <span>Furnished</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <ShieldKeyIcon />
                  </span>

                  <span>Security</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <SlowWindsIcon />
                  </span>

                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <Dumbbell01Icon />
                  </span>

                  <span>Gym</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span>
                    <Sofa01Icon />
                  </span>

                  <span>Furnished</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <ShieldKeyIcon />
                  </span>

                  <span>Security</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <SlowWindsIcon />
                  </span>

                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <Dumbbell01Icon />
                  </span>

                  <span>Gym</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span>
                    <Sofa01Icon />
                  </span>

                  <span>Furnished</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <ShieldKeyIcon />
                  </span>

                  <span>Security</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <SlowWindsIcon />
                  </span>

                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <Dumbbell01Icon />
                  </span>

                  <span>Gym</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </section>

      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
};

export default DetailsPage;
