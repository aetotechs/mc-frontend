import React, { useState } from "react";
import { NotificationSettings } from "./NotificationSettings";

export function ManageNotifications() {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="rounded-sm">
      <span className="font-bold text-base">Manage Notifications</span>

      
      <div className="relative">
        <div className="flex gap-10 text-[15px] py-2">
          {["Account", "Property", "Offers"].map((tab) => (
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
        <hr className="border-gray-300 " />
      </div>

     
      <div>
        {activeTab === "Account" && (
          <NotificationSettings title="Manage notifications for security, payments, and account updates." />
        )}
        {activeTab === "Property" && (
          <NotificationSettings title="Get updates on your tours, picks, rentals, and properties." />
        )}
        {activeTab === "Offers" && (
          <NotificationSettings title="Get updates on exclusive offers, new properties, and the latest features." />
        )}
      </div>
    </div>
  );
}
