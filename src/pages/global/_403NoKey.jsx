import React from 'react'
import Header from '../../components/client/header/Header'
import Footer from '../../components/global/footer/Footer'
import { Button } from 'primereact/button'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { NavLink } from 'react-router-dom'

const _403NoKey = () => {
  return (
    <div className='relative h-screen'>
        <div className='sticky top-0 z-50 flex items-center justify-between px-[8vw] py-4 bg-white'>
            <NavLink to={'/'} className="h-12 object-contain">
                <img src="/logos/mycrib.png" className="h-full" />
            </NavLink>
        </div>
        <section className='bg-[url("/images/403.png")] bg-cover mx-[16vw] bg-no-repeat bg-center min-h-[80vh] flex items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-[2rem] font-extrabold'>Oops! No Key</h1>
                <p className='text-md text-[#62636C]'>It seems you don't have permission to enter this page.</p>
                <Button className='bg-primary text-white rounded-full px-6 py-3 mt-4' onClick={() => window.location.href = '/'}>
                    Go to homepage
                    <ArrowUpRight01Icon/>
                </Button>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default _403NoKey
