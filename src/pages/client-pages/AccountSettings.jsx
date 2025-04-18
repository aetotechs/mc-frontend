import React from "react";
import { useAuthDialog } from "../../utilities/hooks/client/useAuthDialog";
import { dialog_operations } from "../../utilities/constants/DialogOperations";
import { Button } from "primereact/button";
import {
  Call02Icon,
  Edit02Icon,
  Location01Icon,
  Notification01Icon,
  PaymentSuccess02Icon,
  SquareLock01Icon,
  UserCircle02Icon,
} from "hugeicons-react";
import Footer from "../../components/global/footer/Footer";
import Header from "../../components/client/header/Header";
import { getAuthUser } from "../../utilities/cookies/AuthCookiesManager";

const user = getAuthUser();

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
            <div className="flex items-center justify-center bg-gray-100 h-24 w-24 rounded-full object-cover overflow-hidden relative">
              <UserCircle02Icon size={45} className="text-gray-400"/>
            </div>
            <div className="absolute border translate-x-20 translate-y-7 border-white rounded-full p-1 bg-[#2F91D7] cursor-pointer" title="Picture update function not available">
              <Edit02Icon className="h-3 w-3 text-white" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[20px]">{ user.firstName + " " + user.lastName || "--"}</p>
              <p className="text-[#62636C] text-[15px]">@{ user.username}</p>
              <p className="text-[#62636C] text-[15px]">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Location01Icon className="h-4 w-4" />
              { user.shippingAddress ? 
                <span className="truncate">{user?.shippingAddress?.country || "--"}, {user?.shippingAddress?.street || "--"}, {user?.shippingAddress?.city || "--"}, {user?.shippingAddress?.zip || "--"}</span>
              : 
                <p>No Address</p>
              }
            </div>

            <div className="flex items-center gap-2">
              <Call02Icon className="h-4 w-4" />
              <span>{user.phone ? user.phone || "--" : "No Phone number"}</span>
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
