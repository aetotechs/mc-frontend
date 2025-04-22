import React from 'react'
import PartnerHeader from '../../components/partner/header/PartnerHeader'
import Footer from '../../components/global/footer/Footer'
import { Search01Icon } from 'hugeicons-react'

const Tours = () => {
  return (
    <div className='relative h-screen font-sen'>
      <section className='sticky top-0 z-50'>
        <PartnerHeader bottomBorder />
      </section>
      <section className="px-[8vw] py-[2vw] flex justify-between">
        <h1 className="font-bold text-xl">Tours</h1>
        <section className="flex gap-4">
            <article className="flex items-center border rounded-lg">
                <Search01Icon
                    size={38}
                    className="p-3"
                    onClick={() => console.log("Trigger search event here")}
                />
                <input
                    type="search"
                    name=""
                    placeholder="Search tours..."
                    id=""
                    className="flex-1 pr-2 py-3 h-full rounded-r-lg focus:border-0 outline-none"
                />
            </article>
        </section>
      </section>
      
      <section className=''>
        <Footer/>
      </section>
    </div>
  )
}

export default Tours
