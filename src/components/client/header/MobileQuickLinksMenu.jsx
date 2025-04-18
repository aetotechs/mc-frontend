import { Sidebar } from 'primereact/sidebar'
import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileQuickLinksMenu = ({ isVisible, setIsVisible }) => {
  return (
    <div>
      <Sidebar
        visible={isVisible}
        className='w-full block md:hidden bg-white'
        content={({ hide }) => (
            <section>
                <div className='flex justify-between items-center px-3 py-4 border-b'>
                    <button className="h-8 object-cover">
                        <img src="/logos/mycrib.png" className="h-full" />
                    </button>
                    <i className='pi pi-times text-lg text-gray-500' onClick={setIsVisible}/>
                </div>

                <div className='grid gap-y-6 px-3 py-6'>
                    <NavLink to="/" className="font-semibold" onClick={setIsVisible}>
                        Home
                    </NavLink>
                    <a href="https://partner.mycrib.ug/" className="font-semibold" onClick={setIsVisible}>
                        Manage Rentals
                    </a>
                </div>
            </section>
        )}
      />
    </div>
  )
}

export default MobileQuickLinksMenu
