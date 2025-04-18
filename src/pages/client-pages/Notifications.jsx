import React, { useEffect, useState } from "react";
import { Calendar03Icon, Cancel01Icon, FavouriteIcon, NotificationOff01Icon, UserAccountIcon } from "hugeicons-react";
import { useAuthDialog } from "../../utilities/hooks/client/useAuthDialog";
import Header from "../../components/client/header/Header";

const Notifications = () => {
  const { openDialog } = useAuthDialog();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    
  }, []);

  const getNotificationIcon = (type) => {
    const iconClass = "h-6 w-6 text-[#0077BB]";

    switch (type) {
      case "TOUR":
        return <Calendar03Icon className={iconClass} />;
      case "PAYMENT":
        return <Calendar03Icon className={iconClass} />;
      case "ACCOUNT":
        return <UserAccountIcon className={iconClass} />;
      case "FAVORITE":
        return <FavouriteIcon className={iconClass} />;
      default:
        return <NotificationOff01Icon className={iconClass} />;
    }
  };


  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10 bg-white">
        <Header />

      <section className="border-b pb-3 px-[8vw] my-5">
        <span className="text-xl font-semibold text-[#000000E5]">
          Notifications
        </span>
      </section>
      </section>

      <section className="px-[8vw]  ">
        {!notifications.length > 0 ? (
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
              {notifications.map((notification,index ) => (
                <div
                  className="flex items-center justify-between border-b border-[#D8D9E0] py-4 hover:bg-gray-100 cursor-pointer"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#EFF0F3] flex justify-center items-center h-7 w-7">
                    {getNotificationIcon(notification?.type)}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-base font-normal">{notification.message}</p>
                      <p className="text-[#62636C] text-xs">{notification.time}</p>
                    </div>
                  </div>
                  <span><Cancel01Icon className="h-5 w-5"/></span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Notifications;
