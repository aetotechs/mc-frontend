import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import _404NoProperty from '../pages/global/_404NoProperty';

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
    </Routes>
  );
};

export default ClientRoutes;