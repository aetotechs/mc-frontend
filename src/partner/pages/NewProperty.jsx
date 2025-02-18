import React, { useState } from 'react'
import PartnerHeader from '../components/PartnerHeader'
import Footer from '../../client/components/global/Footer'
import { ArrowLeft02Icon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'

const NewProperty = () => {
  const navogate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if(step < 5) setStep(step + 1);
  }

  const handlePrevious = () => {
    if(step > 1) setStep(step - 1);
  }

  return (
    <div className='relative h-screen'>
      <section className='sticky top-0 z-50'>
        <PartnerHeader bottomBorder />
      </section>

      <section className='px-[8vw] py-[2vw] flex items-center gap-6'>
        <Link to={-1}>
          <ArrowLeft02Icon/>
        </Link>
        <article className='font-bold text-xl'>Add property</article>
      </section>

      {/* Forms and size bar */}
      <section className='mx-[8vw] flex gap-8'>
        <section className='bg-blue-50 p-6 text-sm w-[20vw] space-y-6 rounded-lg'>
          <div className={`text-gray-400`}>
            <p className={`${step === 1 && 'text-primary'}`}>Step 1/5</p>
            <p className={`${step === 1 && 'text-black'}`}>Basic information</p>
          </div>
          <div className={`text-gray-400`}>
            <p className={`${step === 2 && 'text-primary'}`}>Step 2/5</p>
            <p className={`${step === 2 && 'text-black'}`}>Add Units</p>
          </div>
          <div className={`text-gray-400`}>
            <p className={`${step === 3 && 'text-primary'}`}>Step 3/5</p>
            <p className={`${step === 3 && 'text-black'}`}>Property Features</p>
          </div>
          <div className={`text-gray-400`}>
            <p className={`${step === 4 && 'text-primary'}`}>Step 4/5</p>
            <p className={`${step === 4 && 'text-black'}`}>Upload Media</p>
          </div>
          <div className={`text-gray-400`}>
            <p className={`${step === 5 && 'text-primary'}`}>Step 5/5</p>
            <p className={`${step === 5 && 'text-black'}`}>Preview</p>
          </div>
        </section>
        <section className=''>
          section 2
        </section>
      </section>

      <section className='pt-[4vh]'>
        <Footer/>
      </section>
    </div>
  )
}

export default NewProperty
