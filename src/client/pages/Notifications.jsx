import React, { useState } from "react";
import Header from "../components/global/Header";
import { useAuthDialog } from "../utils/hooks/useAuthDialog";

import Footer from "../components/global/Footer";
import { Button } from "primereact/button";
import { Calendar03Icon, Cancel01Icon, FavouriteIcon, NotificationOff01Icon } from "hugeicons-react";

const Notifications = () => {
  const { openDialog } = useAuthDialog();

  const [notifications, setNotifications] = useState(true);

  const ClientNotifications = [
    {
      message:
        "Your tour for Uniport Garden Apartments is confirmed for Friday, 06 Dec 2024.",
      time: "10:31 PM",
      icon:<Calendar03Icon className="h-4 w-4 text-[#0077BB]"/>

    },
    {
      message:
        "Thank you! Your payment of UGX 50,000 for the booking fee at Uniport Garden Apartments has been successfully processed.",
      time: "10:31 PM",
      icon:<Calendar03Icon className="h-4 w-4 text-[#0077BB]"/>

    },

    {
      message: "Kampala Height Apartments has been added to your favorites. ",
      time: "Nov 30",
      icon:<FavouriteIcon className="h-4 w-4 text-[#0077BB]"/>
    },

    {
      message:
        "Your tour for Uniport Garden Apartments is confirmed for Friday, 06 Dec 2024. ",
      time: "Nov 30",
      icon:<Calendar03Icon className="h-4 w-4 text-[#0077BB]"/>

    },
  ];


  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section className="border-b pb-3 px-[8vw] my-5">
        <span className="text-xl font-semibold text-[#000000E5]">
          Notifications
        </span>
      </section>

      <section className="px-[8vw]  ">
        {!notifications ? (
          <>
            <div className="flex justify-center flex-col items-center gap-1 py-4 my-40   w-full">
              <div className="rounded-full bg-[#E6F3FF] p-2 h-10 w-10">
                <NotificationOff01Icon className="h-6 w-6 text-[#0077BB]" />
              </div>
              <p className="font-bold">No notifications to show</p>
              <span className="text-[#80828D]">
                All clear! We’ll notify you here about any updates or
                activities.
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="">
              {ClientNotifications.map((ClientNotification,index ) => (
                <div
                  className="flex items-center justify-between border-b border-[#D8D9E0] py-4"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#EFF0F3] flex justify-center items-center h-7 w-7">

                      {ClientNotification.icon}
                    </div>
                    <div className="flex flex-col">
                     
                      <p className="text-base font-normal">
                        {ClientNotification.message}
                      </p>
                      <p className="text-[#62636C] text-xs">{ClientNotification.time}</p>
                    </div>
                  </div>

                  <span><Cancel01Icon className="h-5 w-5"/></span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* <section className="bottom-0 fixed w-full">
        <Footer />
      </section> */}
    </div>
  );
};

export default Notifications;
