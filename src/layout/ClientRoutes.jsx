import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import("../client/pages/Home"));
const Listings = lazy(() => import("../client/pages/Listings"));
const AccountSettings = lazy(() => import("../client/pages/AccountSettings"));

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/account" element={<AccountSettings />} />
    </Routes>
  );
};

export default ClientRoutes;