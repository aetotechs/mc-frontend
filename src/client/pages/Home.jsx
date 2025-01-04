import React from 'react'
import CardLoadingSpinner from '../components/global/CardLoadingSpinner'
import api_urls from '../utils/resources/api_urls'
import dummy_data from '../utils/resources/dummy_data'

const Home = () => {
  return (
    <div className='text-black text-xl'>
      This is Home
      <p>{JSON.stringify(api_urls)}</p>
      <p>{JSON.stringify(dummy_data)}</p>
    </div>
  )
}

export default Home
