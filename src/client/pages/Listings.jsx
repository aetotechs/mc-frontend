import React from 'react'
import Header from '../components/global/Header'
import { listings } from '../utils/resources/dummy_data'
import ListingCard from '../components/global/ListingCard'
import Footer from '../components/global/Footer'
import ListingsFilterPanel from '../components/listings/ListingsFilterPanel'

const Listings = () => {
  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section className='border-b pb-3'>
        <ListingsFilterPanel />
      </section>

      <section className='px-[8vw] py-4'>
        <div className='grid md:flex justify-between'>
          <p className='font-[600]'>Available properties to rent in Kampala</p>
          <div className='flex gap-8'>
            <p>20 <span className='opacity-70'>of</span> 100 results</p>
            <section className=''>Sort: 
              <select name="" id="" className='bg-white text-blue-600 cursor-pointer min-w-text'>
                <option label='Recommended' value=""></option>
                <option label='A to Z' value="Recommended"></option>
                <option label='By price' value="Recommended"></option>
                <option label='By current location' value="Recommended"></option>
              </select>
            </section>
          </div>
        </div>
      </section>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 gap-6 px-[8vw]">
        {listings.map((item, index) => (
          <ListingCard key={index} item={item} />
        ))}
      </section>

      <section className="flex items-center justify-center my-24">
        <div className='flex gap-16 items-center'>
          <p>Page 1 <span className='opacity-60'>of</span> 5</p>
          <button className="px-8 py-2 bg-blue-400 text-white text-lg border-2 border-blue-400 font-extrabold rounded-lg" title="Get next items page from the server">Next Page</button>
        </div>
      </section>

      <section className='mt-16'>
        <Footer/>
      </section>
    </div>
  )
}

export default Listings
