import { City02Icon, Clock01Icon, LabelIcon, LabelImportantIcon, Location01Icon, Search01Icon, Tag01Icon } from 'hugeicons-react'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const MobileSearchPanel = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [propertyCategories, setPropertyCategories] = useState([
        { label: "Rentals", value: "RENTALS", checked: false },
        { label: "Apartments", value: "APARTMENTS", checked: false },
        { label: "Hostels", value: "HOSTELS", checked: false },
        { label: "Lodges", value: "LODGES", checked: false },
        { label: "Hotels", value: "HOTELS", checked: false },
    ]);

    const [expandedSection, setExpandedSection] = useState({ location: true, propertyType: false, price: false});

    const handleClosePanel = () => {
        searchParams.delete("mSearchPanelOpen");
        setSearchParams(searchParams);
    }

    const handleSearch = () => {

    }
  return (
    <div>
      <Sidebar
        visible={ searchParams.get("mSearchPanelOpen") === "1" }
        className='w-full block md:hidden bg-white'
        content={({ hide }) => (
            <section className='h-full relative'>
                <div className='flex justify-between items-center px-3 py-5 border-b fixed top-0 w-full'>
                    <p className='font-bold text-lg'>Find your next crib</p>
                    <i className='pi pi-times text-lg text-gray-500' onClick={handleClosePanel}/>
                </div>

                <div className='grid px-4 py-6 my-14 overflow-y-auto'>
                    <section className='space-y-4 border-b-2 py-6'>
                        <div className='flex justify-between items-center' onClick={
                            () => setExpandedSection((prev) => ({...prev, location: !prev.location}))
                        }>
                            <p className='font-semibold'>Location</p>
                            <p className='text-gray-400 flex items-center gap-2 font-bold'><Location01Icon size={16}/>Search</p>
                        </div>
                        { expandedSection.location && 
                        <article className='space-y-4'>
                            <section className="md:hidden flex items-center bg-white border rounded-full p-1 w-full">
                                <input
                                    type="text"
                                    autoFocus
                                    className="ml-4 mr-2 px-2 flex-1 outline-none"
                                    placeholder="Type here"
                                />
                                <i
                                    className="pi pi-search font-bold rounded-full p-3 bg-primary text-white"
                                    onClick={handleSearch}
                                />
                            </section>
                            <button disabled className='text-gray-400 flex items-center gap-2 font-bold'><Location01Icon size={16}/> Current location</button>
                            <p className='font-bold'>Recent searches</p>
                            <p className='text-gray-400 flex items-center gap-2'><City02Icon size={16}/> Wandegeya</p>
                        </article>
                        }
                    </section>

                    <section className='space-y-4 border-b-2 py-6'>
                        <div className='flex justify-between items-center' onClick={
                            () => setExpandedSection((prev) => ({...prev, propertyType: !prev.propertyType}))
                        }>
                            <p className='font-semibold'>Property Type</p>
                            <p className='text-gray-400 flex items-center gap-2 font-bold'><Location01Icon size={16}/>Select</p>
                        </div>
                        { expandedSection.propertyType && 
                        <article className='space-y-4'>
                            { propertyCategories.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => setPropertyCategories((prev) => ({...prev, checked: e.target.checked}))}
                                    className="w-4 h-4"
                                />
                                <label className='text-sm text-gray-600'>{item.label}</label>
                            </div>
                            ))}
                        </article>
                        }
                    </section>

                    <section className='space-y-4 py-6'>
                        <div className='flex justify-between items-center' onClick={
                            () => setExpandedSection((prev) => ({...prev, price: !prev.price}))
                        }>
                            <p className='font-semibold'>Price</p>
                            <p className='text-gray-400 flex items-center gap-2 font-bold'><Tag01Icon size={16}/>Choose</p>
                        </div>
                        { expandedSection.price && 
                        <article className='space-y-4'>
                           Pending dev...
                        </article>
                        }
                    </section>
                
                </div>

                <div className='flex justify-between items-center px-3 font-semibold fixed w-full bottom-4'>
                    <Button className='font-bold' onClick={handleClosePanel}>Close</Button>
                    <Button className='bg-primary flex gap-2 rounded-xl text-opacity-80 text-white px-8 py-3'>
                        <Search01Icon size={18}/>
                        Search
                    </Button>
                </div>
            </section>
        )}
      />
    </div>
  )
}

export default MobileSearchPanel
