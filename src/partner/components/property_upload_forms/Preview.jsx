import { ArrowDown01Icon, ArrowUp01Icon, Bathtub01Icon, BedIcon, ParkingAreaCircleIcon, TapeMeasureIcon } from 'hugeicons-react';
import { Button } from 'primereact/button';
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { amenitiesList } from '../../../client/utils/constansts/AmenitiesList';
import { getBathroomRange, getBedroomRange, getPriceRange } from '../../utilities/getRanges';
import AvailabilityBadge from '../../../client/components/ui/AvailabilityBadge';

const Preview = ({ control, errors, setValue }) => {
  const [activeTab, setActiveTab] = useState('Basic');
  const { watch } = useFormContext();
  const property = watch();
  const tabs = ['Basic', 'Units', 'Amenities', 'Features', 'Media'];
  const [collapsedUnits, setCollapsedUnits] = useState(property?.units?.map(() => true));
  
  const toggleUnitCollapse = (index) => {
    const newCollapsedUnits = [...collapsedUnits];
    newCollapsedUnits[index] = !newCollapsedUnits[index];
    setCollapsedUnits(newCollapsedUnits);
  };

  const priceRange = property?.unitsAvailable ?
    getPriceRange(property?.units) : property.unitlessDetails.price;
  
  const bathroomRange = property?.unitsAvailable ?
    getBathroomRange(property?.units) : property.unitlessDetails.bathRooms;

  const bedroomRange = property?.unitsAvailable ?
    getBedroomRange(property?.units) : property.unitlessDetails.bedRooms;

  const sectionsRef = {
    Basic: useRef(),
    Units: useRef(),
    Amenities: useRef(),
    Features: useRef(),
    Media: useRef(),
  };

  useEffect(() => {
    document.title = `Preview - ${property?.name || "Property"}`;
  })

  return (
    <div className="space-y-4">
      <h1 className='text-[1.2rem] font-[500]'>Preview</h1>
      <p className='font-normal text-gray-500'>Ensure all details are correct before submission</p>

      <div className="flex gap-10 py-2">
        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <h4 className={`cursor-pointer ${ activeTab === tab ? "text-primary font-semibold" : "" }`}
              onClick={() => {
                sectionsRef[tab].current?.scrollIntoView({ behavior: "smooth" });
                setActiveTab(tab);
              }}
            >
              {tab}
            </h4>
            {activeTab === tab && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-6 h-[3px] bg-primary rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <section className='rounded-lg border-2 border-gray-300 py-4 px-8' ref={sectionsRef.Basic}>
        <div className='flex items-center gap-2 py-2'>
          <p className='w-2 h-2 bg-green-600 rounded-full'/>
          <p className='text-[.8rem]'>{ property?.propertyType?.slice(0, 1).toUpperCase() + property?.propertyType?.slice(1)?.toLowerCase()}</p>
          { !property?.unitsAvailable && <AvailabilityBadge status={property?.unitlessDetails?.available} />}
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[1.3rem] truncate'>{property?.name}</p>
          <p className='font-bold text-[1.4rem]'>UGX { priceRange } <span className='text-sm font-normal'>month</span></p>
        </div>
        <p className='text-gray-500 text-[.8rem]'>{ property?.address?.zip + " " + property?.address?.street + ", " + property?.address?.city }</p>

        <div className="flex items-center gap-6 my-2 text-[.9rem]">
          <div className="flex items-center gap-1">
            <BedIcon/>
            <span className="">{bedroomRange || "0"} Beds</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Bathtub01Icon/>
            <span className="">{bathroomRange || "0"} Baths</span>
          </div>

          <div className="flex items-center gap-1">
            <TapeMeasureIcon/>
            <span className="">{property?.propertyArea || "--"} sqft</span>
          </div>

          <div className="flex items-center gap-1">
            <ParkingAreaCircleIcon/>
            <span className="">{property?.parkingCapacity || "--"} Parking Spaces</span>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-normal text-[1.1rem] mb-2">About this property</h1>
          <div>
            <p className="text-gray-800 text-[.9rem]">
              { property?.description }
            </p>
          </div>
        </div>
      </section>

      <section className={`${ !property?.unitsAvailable && 'hidden'}`} ref={sectionsRef.Units}>
        <h1 className="truncate font-normal text-[1.1rem] mb-2 mt-2">Units</h1>
        <div className='space-y-4'>
          { property?.units?.length > 0 && property?.unitsAvailable && property?.units?.map((unit, index) => (
            <div key={index} className="relative border border-gray-300 rounded-lg cursor-pointer">
              <div className="flex justify-between items-center py-4 px-6" onClick={() => toggleUnitCollapse(index)}>
                <h2 className="truncate min-w-[10%] max-w-[20%] text-[1rem] font-medium text-primary">{unit?.name} </h2>
                <p className="text-gray-500 text-[.9rem]">{unit.bedRooms} Bed • {unit.bathRooms} Baths • {unit.size} sqft</p>
                <p className="font-bold text-lg">UGX {unit?.price?.toLocaleString()} <span className='text-sm font-[400]'>month</span></p>
                <AvailabilityBadge status={unit?.available} />
                <div className="flex gap-2">
                  <Button
                    icon={collapsedUnits[index] ? <ArrowDown01Icon/> : <ArrowUp01Icon/>}
                    onClick={() => toggleUnitCollapse(index)}
                    className="text-xs"
                  />
                </div>
              </div>
              {!collapsedUnits[index] && (
                <div className="p-4 space-y-4">
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {unit?.media?.photos?.map((photo, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={photo instanceof File || photo instanceof Blob ? URL.createObjectURL(photo) : photo}
                          alt="Uploaded"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                    {unit?.media?.videos?.map((video, idx) => (
                      <div key={idx} className="relative">
                        <video
                          src={video instanceof File || video instanceof Blob ? URL.createObjectURL(video) : video}
                          controls
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}   
        </div>
      </section>

      <section className="my-8" ref={sectionsRef.Amenities}>
        <h1 className="truncate font-normal text-[1.1rem] mb-2 my-2">Amenities</h1>
        <div className="grid grid-cols-3 gap-4 text-[0.8rem] border-2 border-gray-300 rounded-lg py-4 px-8">
          {property?.amenities && (
            console.log(property.amenities),
            Object.keys(property.amenities)
              .filter((key) => property.amenities[key])
              .map((key, i) => (
                <div key={i} className="flex items-center gap-3">
                  {amenitiesList[key]?.icon && React.createElement(amenitiesList[key].icon)}
                  <span>{amenitiesList[key]?.name || key}</span>
                </div>
              ))
          )}
        </div>
      </section>

      { property?.customFeatures?.length > 0 && 
        <section className="my-8" ref={sectionsRef.Features}>
          <h1 className="truncate font-normal text-[1.1rem] mb-2 my-4">Custom Features</h1>
          <div className="space-y-2">
            {property?.customFeatures?.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 border-2 border-gray-300 rounded-lg py-4 px-8">
                <p className='w-[30%] font-semibold'>{feature?.name}</p>
                <p className=''>{feature?.description}</p>
              </div>
            ))}
          </div>
        </section>
      }

      <section className="" ref={sectionsRef.Media}>
        <h1 className="truncate font-normal text-[1.1rem] mb-2 mt-2">General Media(Photos, Videos, 3D Tour)</h1>
        <div className="mt-2 w-full flex gap-2 overflow-x-scroll no-scrollbar mb-6">
          {property?.media?.photos?.map((photo, idx) => (
            <div key={idx} className="relative">
              <img
                src={photo instanceof File || photo instanceof Blob ? URL.createObjectURL(photo) : photo}
                alt="Uploaded"
                className="min-w-44 w-44 h-36 object-cover rounded-3xl "
              />
            </div>
          ))}
          {property?.media?.videos?.map((video, idx) => (
            <div key={idx} className="relative">
              <video
                src={video instanceof File || video instanceof Blob ? URL.createObjectURL(video) : video}
                controls
                className="min-w-44 w-44 h-36 object-cover rounded-3xl "
              />
            </div>
          ))}
        </div>
        <a href={property?.media?.threeDTourLink} target='_blank' className='text-primary underline mt-6'>{property?.media?.threeDTourLink}</a>
      </section>

    </div>
  )
}

export default Preview
