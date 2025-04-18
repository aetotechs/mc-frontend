import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

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
    </Routes>
  );
};

export default ClientRoutes;