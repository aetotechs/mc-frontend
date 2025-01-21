import React from 'react'
import Header from '../components/global/Header'

const Listings = () => {
  return (
    <div className="relative h-screen overflow-auto">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section>
        {/* Filter panel */}
      </section>

      <section>
        <div>
          <p>Available properties in Kampala</p>
          <div>
            <p>20 of 100 results</p>
            Sort
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Listings
