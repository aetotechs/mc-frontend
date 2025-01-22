import React from "react";
import Header from "../components/global/Header";

import Footer from "../components/global/Footer";
import { Button } from "primereact/button";
import {
  Call02Icon,
  Edit02Icon,
  Location01Icon,
  Notification01Icon,
  PaymentSuccess01Icon,
  PaymentSuccess02Icon,
  SquareLock01Icon,
} from "hugeicons-react";

const AccountSettings = () => {
  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section className="border-b pb-3 px-[8vw] my-5">
        <span className="text-xl font-semibold text-[#000000E5]">Account</span>
      </section>

      <section className="grid grid-cols-2 px-[8vw] gap-5">
        <div className="border col-span-2 py-6 flex items-center justify-around border-[#D8D9E0] rounded-xl">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full object-cover overflow-hidden relative">
              <img src="/images/user.png" alt="User" />
            </div>
            <div className="absolute border translate-x-20 translate-y-7 border-white rounded-full p-1 bg-[#2F91D7]">
              <Edit02Icon className="h-3 w-3 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[20px]">John Doe</span>
              <span className="text-[#62636C] text-[15px]">@john123</span>
              <span className="text-[#62636C] text-[15px]">
                johndoe@gmail.com
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Location01Icon className="h-4 w-4" />
              <span>Uganda, Entebbe Road, Entebbe, 47533</span>
            </div>

            <div className="flex items-center gap-2">
              <Call02Icon className="h-4 w-4" />
              <span>+256708210793</span>
            </div>
          </div>
          <div>
            <Button className="bg-[#2F91D7] text-white text-sm p-1 gap-1">
              <span>
                <Edit02Icon className="h-3 w-3" />
              </span>
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="border col-span-1 py-6 flex justify-between px-3 border-[#D8D9E0] rounded-xl">
          <div className="flex items-center gap-1">
            <SquareLock01Icon className="h-9 w-9" />

            <div className="flex flex-col">
              <span className="font-semibold">Security and Login</span>
              <span className="text-[#62636C]">Manage your password</span>
            </div>
          </div>

          <div>
            <Button className="bg-[#2F91D7] text-white text-sm p-1 gap-1">
              <span>
                <Edit02Icon className="h-3 w-3" />
              </span>
              Update
            </Button>
          </div>
        </div>
        <div className="border col-span-1 py-6 flex justify-between px-3 border-[#D8D9E0] rounded-xl">
          <div className="flex items-center gap-1">
            <PaymentSuccess02Icon className="h-9 w-9" />

            <div className="flex flex-col">
              <span className="font-semibold">Payment Methods</span>
              <span className="text-[#62636C]">
                Securely manage your preferred payment methods.
              </span>
            </div>
          </div>
          <div>
            <Button className="bg-[#2F91D7] text-white text-sm p-1 gap-1">
              <span>
                <Edit02Icon className="h-3 w-3" />
              </span>
              Add
            </Button>
          </div>
        </div>
        <div className="border col-span-1 py-6 flex justify-between px-3 border-[#D8D9E0] rounded-xl">
          <div className="flex items-center gap-1">
            <Notification01Icon className="h-9 w-9" />

            <div className="flex flex-col">
              <span className="font-semibold">Notifications</span>
              <span className="text-[#62636C]">
                All your important updates in one place.
              </span>
            </div>
          </div>

          <div>
            <Button className="bg-[#2F91D7] text-white text-sm p-1 gap-1">
              <span>
                <Edit02Icon className="h-3 w-3" />
              </span>
              Manage
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
};

export default AccountSettings;
