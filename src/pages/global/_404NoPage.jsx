import React from 'react'
import Footer from '../../components/global/footer/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ArrowLeftIcon } from 'lucide-react'

const _404NoPage = () => {
    const navigate = useNavigate();
  return (
    <div className='relative h-screen'>
      <div className='sticky top-0 z-50 flex items-center justify-between px-[8vw] py-4 bg-white'>
            <NavLink to={'/'} className="h-12 object-contain">
                <img src="/logos/mycrib.png" className="h-full" />
            </NavLink>
        </div>
        <section className='bg-[url("/images/403.png")] bg-cover mx-[16vw] bg-no-repeat bg-center min-h-[80vh] flex items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-[2rem] font-extrabold'>No Page Here</h1>
                <p className='text-md text-[#62636C]'>Don't worry, nothing broke. The page is just off for now.</p>
                <Button className='bg-primary text-white rounded-full px-6 py-3 mt-4' onClick={() => navigate('/')}>
                    <ArrowLeftIcon className='mr-2'/>
                    Go back
                </Button>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default _404NoPage
