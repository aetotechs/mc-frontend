import React from "react";
import Header from "../components/global/Header";
import { useAuthDialog } from "../utils/hooks/useAuthDialog";
import { dialog_operations } from "../utils/constansts/DialogOperations";
import Footer from "../components/global/Footer";
import { Button } from "primereact/button";
import {
  Call02Icon,
  Edit02Icon,
  Location01Icon,
  Notification01Icon,
  PaymentSuccess02Icon,
  SquareLock01Icon,
} from "hugeicons-react";

const AccountSettings = () => {
  const { openDialog } = useAuthDialog();

  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section className="border-b pb-3 px-[8vw] my-5">
        <span className="text-xl font-semibold text-[#000000E5]">Account</span>
      </section>

      <section className="grid grid-cols-2 px-[8vw] gap-5">
        <div className="border col-span-2 py-6 flex items-center justify-between px-8 border-[#D8D9E0] rounded-xl">
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
            <Button
              icon={<Edit02Icon size={14} />}
              label="Edit Profile"
              onClick={() => {
                openDialog(dialog_operations.edit_profile);
              }}
              className="bg-[#2F91D7] text-xs text-white px-4 py-2 gap-2"
            />
          </div>
        </div>

        <div className="border col-span-1 py-6 flex items-center justify-between px-8 border-[#D8D9E0] rounded-xl">
          <div className="flex items-center gap-1">
            <SquareLock01Icon className="h-9 w-9" />

            <div className="flex flex-col">
              <span className="font-semibold">Security and Login</span>
              <span className="text-[#62636C]">Manage your password</span>
            </div>
          </div>

          <div>
            <Button
              label="Update"
              onClick={() => {
                openDialog(dialog_operations.change_password);
              }}
              icon={<Edit02Icon size={14} />}
              className="bg-[#2F91D7] text-xs text-white  px-4 py-2 gap-1"
            />
          </div>
        </div>
        <div className="border col-span-1 py-6 flex items-center justify-between px-8 border-[#D8D9E0] rounded-xl">
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
            <Button
              icon={<Edit02Icon size={14} />}
              label="Add"
              className="bg-[#2F91D7] text-xs text-white  px-4 py-2 gap-2"
            />
          </div>
        </div>
        <div className="border col-span-1 py-6 flex items-center justify-between px-8 border-[#D8D9E0] rounded-xl">
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
            <Button
              icon={<Edit02Icon size={14} />}
              onClick={() => {
                openDialog(dialog_operations.manage_notifications);
              }}
              label="Manage"
              className="bg-[#2F91D7] text-xs text-white  px-4 py-2 gap-2"
            />
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
