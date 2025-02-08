import { Alert01Icon, CheckmarkCircle01Icon, HelpCircleIcon, InformationCircleIcon } from 'hugeicons-react'
import React, { useEffect, useState } from 'react'

const CustomToast = ({ message, type, autoHide = false, duration = 4000 }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        if(autoHide){
            setTimeout(() => {
                // setVisible(false);
            }, duration)
        }
    })
  return visible && (
    <div className={`${ type === "error" ? "border-red-500 bg-red-50" : type === "success" ? "border-green-500 bg-green-50" : type === "warn" ? "border-gray-500 bg-gray-50" : type === "info" && "border-blue-500 bg-blue-50" } w-full py-3 flex justify-between border px-2 rounded-lg`}>
        <div className='w-[8%]'>
            { type === "error" ?
                <HelpCircleIcon className='text-red-500'/> : type === "success" ?
                    <CheckmarkCircle01Icon variant="solid" className='text-green-600'/> : type === "warn" ? 
                        <Alert01Icon className='text-gray-500'/> : type === "info" && <InformationCircleIcon className='text-blue-500'/>
            }
            
        </div>
        <p className='w-[80%] text-xs overflow-clip flex'>{message}</p>
        <i className='pi pi-times text-xs cursor-pointer' onClick={() => setVisible(false)}/> 
    </div>
  )
}

export default CustomToast
