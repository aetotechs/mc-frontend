import { Alert01Icon, CheckmarkCircle01Icon, HelpCircleIcon, InformationCircleIcon } from 'hugeicons-react';
import React, { useEffect } from 'react';

const CustomToast = ({ message, type, fillWidth, autoHide = false, duration = 4000, visible, onHide }) => {
  useEffect(() => {
    if (visible && autoHide) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, autoHide, duration, onHide]);

  return visible && message && (
    <div className={`${type === "error" ? "border-red-500 bg-red-50" : type === "success" ? "border-green-500 bg-green-50" : type === "warn" ? "border-gray-500 bg-gray-50" : type === "info" && "border-blue-500 bg-blue-50"} ${fillWidth && 'w-full'} py-3 flex justify-between border px-2 rounded-lg`}>
      <div className='w-[8%]'>
        {type === "error" ? (
          <HelpCircleIcon className='text-red-500' />
        ) : type === "success" ? (
          <CheckmarkCircle01Icon variant="solid" className='text-green-600' />
        ) : type === "warn" ? (
          <Alert01Icon className='text-gray-500' />
        ) : type === "info" && (
          <InformationCircleIcon className='text-blue-500' />
        )}
      </div>
      <p className={`${type === "error" ? 'text-red-500' : type === 'success' ? 'text-green-600' : type === 'info' ? 'text-blue-500' : 'text-gray-500'} w-[80%] text-sm overflow-clip flex`}>
        {message}
      </p>
      <i className='pi pi-times text-xs cursor-pointer' onClick={onHide} />
    </div>
  );
};

export default CustomToast;