import React from 'react'
import PartnerHeader from '../components/PartnerHeader'
import Footer from '../../client/components/global/Footer'
import { ArrowLeft02Icon } from 'hugeicons-react'

const NewProperty = () => {
  return (
    <div>
      <section className='sticky top-0 z-50'>
        <PartnerHeader bottomBorder />
      </section>

      <section className='px-[8vw] py-[2vw] flex items-center gap-6'>
        <ArrowLeft02Icon/>
        <article className='font-bold text-lg'>Add property</article>
      </section>

      {/* Forms and size bar */}

      <section className='pt-[4vh]'>
        <Footer/>
      </section>
    </div>
  )
}

export default NewProperty
