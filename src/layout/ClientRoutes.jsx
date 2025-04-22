import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import _404NoProperty from '../pages/global/_404NoProperty';
import _500ServerError from '../pages/global/_500ServerError';
import _404NoPage from '../pages/global/_404NoPage';

const Home = lazy(() => import("../pages/client-pages/Home"));
const Listings = lazy(() => import("../pages/client-pages/Listings"));
const AccountSettings = lazy(() => import("../pages/client-pages/AccountSettings"));
const DetailsPage = lazy(() => import("../pages/client-pages/DetailsPage"));
const Notifications = lazy(() => import("../pages/client-pages/Notifications"));

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/listings?" element={<Listings />} />
      <Route path="/account?" element={<AccountSettings />} />
      <Route path="/details/:propertyId?" element={<DetailsPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/404NoProperty" element={<_404NoProperty />} />
      <Route path="/500" element={<_500ServerError />} />
      <Route path="*" element={<_404NoPage />} />
    </Routes>
  );
};

export default ClientRoutes;