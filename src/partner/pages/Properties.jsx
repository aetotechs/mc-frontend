import React, { useState } from 'react'
import PartnerHeader from '../components/PartnerHeader'
import { Button } from 'primereact/button'
import { Home11Icon, PlusSignIcon, Search01Icon } from 'hugeicons-react'
import Footer from '../../client/components/global/Footer'
import AetoGrid from '../../globals/ui/AetoGrid'
import { useNavigate } from 'react-router-dom'

const Properties = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const columns = [
        { label: "Property", key: "propertyName" },
        { label: "Location", key: "address.street" },
        { label: "Rental Terms", key: "price" },
        { label: "Availability", key: "available" },
      ]
  return (
    <div className='h-screen'>
      <section className='sticky top-0 z-50'>
        <PartnerHeader bottomBorder />
      </section>

      <section className='px-[8vw] py-[2vw] flex justify-between'>
        <article className='font-bold text-lg'>properties</article>
        <section className='flex gap-4'>
            <article className='flex items-center border rounded-lg'>
                <Search01Icon size={32} className='p-2' onClick={() => {console.log("Triger search event here")}}/>
                <input type="search" name="" placeholder='Search' id="" className='flex-1 h-full rounded-r-lg focus:border-0'/>
            </article>
            <Button onClick={() => navigate('/new') } className='bg-primary text-white gap-2 font-semibold p-2 text-xs'>
                <PlusSignIcon size={14} />
                New
            </Button>
        </section>
      </section>

        {/* Empty property list */}
      <section className={`${data.length > 0 && "hidden"} px-[8vw] py-[2vw] h-56 flex items-center justify-center`}>
        <article className=''>
            <section className='flex itemx-center justify-center pb-3'>
                <Home11Icon size={52} className='text-center bg-blue-100 p-2 rounded-full text-primary'/>
            </section>
            <p className='font-bold text-center text-sm'>No properties added yet</p>
            <p className='text-xs text-center text-gray-500'>Click '+ New' to get started</p>
        </article>
      </section>

        {/* Available property list */}
      <section className={`${data.length < 1 && "hidden"} px-[8vw]`}>
        <AetoGrid columns={columns} isLoading={false} data={[]} />
      </section>

      <section className='pt-[4vh]'>
        <Footer/>
      </section>
    </div>
  )
}

export default Properties
