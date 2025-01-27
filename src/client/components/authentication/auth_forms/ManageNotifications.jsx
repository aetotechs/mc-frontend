import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TabView, TabPanel } from "primereact/tabview";

import { InputSwitch } from "primereact/inputswitch";

import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";

// const accountSchema = z.object({
//   emailnotifications: z.boolean,
//   smsnotifications: z.boolean(),
//   pushnotifications: z.boolean(),
// });

// const propertySchema = z.object({
//   emailnotifications: z.boolean,
//   smsnotifications: z.boolean(),
//   pushnotifications: z.boolean(),
// });
// const offersSchema = z.object({
//   emailnotifications: z.boolean,
//   smsnotifications: z.boolean(),
//   pushnotifications: z.boolean(),
// });

export function ManageNotifications() {


  const [error, setError] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
    
    },
  });

  const _handleSubmit = (data) => {
    if (!trigger()) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 3000);
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
      <div className="card">
        <TabView>
          <TabPanel header="Account">
            <div className="">
              <p className="text-left font-[600] text-xl">
                Manage notifications for security, payments, and account
                updates.
              </p>
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive email notifications
              </label>

              <InputSwitch />
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive SMS notifications
              </label>

              <InputSwitch />
            </div>

            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Push notifications
              </label>

              <InputSwitch />
            </div>
          </TabPanel>
          <TabPanel header="Property">
            <div className="">
              <p className="text-left font-[600] text-xl">
                Get updates on your tours, picks, rentals, and properties.
              </p>
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive email notifications
              </label>

              <InputSwitch />
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive SMS notifications
              </label>

              <InputSwitch />
            </div>

            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Push notifications
              </label>

              <InputSwitch />
            </div>
          </TabPanel>
          <TabPanel header="Offers">
            <div className="">
              <p className="text-left font-[600] text-xl">
                Get updates on exclusive offers, new properties and the latest
                features
              </p>
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive email notifications
              </label>

              <InputSwitch />
            </div>
            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Receive SMS notifications
              </label>

              <InputSwitch />
            </div>

            <div className="flex justify-between">
              <label className="block mb-1 font-medium text-sm">
                Push notifications
              </label>

              <InputSwitch />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </form>
  );
}
