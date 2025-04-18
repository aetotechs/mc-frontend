import { InputSwitch } from "primereact/inputswitch";
import React, { useState } from "react";

export function NotificationSettings({ title }) {
  const [checkedStates, setCheckedStates] = useState({
    "Receive email notifications": false,
    "Receive SMS notifications": false,
    "Push notifications": false,
  });

  const handleChange = (label, value) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [label]: value, 
    }));
  };

  return (
    <div>
      <p className="text-left font-medium text-[#00000099] text-sm py-2">
        {title}
      </p>

      {Object.keys(checkedStates).map((label) => (
        <div key={label} className="flex justify-between space-y-2">
          <label className="block mb-1 font-medium text-sm">{label}</label>
          <InputSwitch
            checked={checkedStates[label]}
            onChange={(e) => handleChange(label, e.value)}
          />
        </div>
      ))}
    </div>
  );
}
