import { lazy, Suspense } from 'react'
import PageLoadingSpinner from './client/components/global/PageLoadingSpinner'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./client/pages/Home'))
const Listings = lazy(() => import('./client/pages/Listings'))

function App() {

  return (
    <Suspense fallback={ <PageLoadingSpinner/> }>
      <Routes>
          <Route index element={ <Home/> } />
          <Route path='/listings' element={ <Listings/> } />
      </Routes>
    </Suspense>
  )
}

export default App
