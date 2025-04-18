import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Suspense, useEffect } from "react";
import PageLoadingSpinner from "./utilities/loaders/PageLoadingSpinner";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./layout/AdminRoutes";
import ClientRoutes from "./layout/ClientRoutes";
import PartnerRoutes from "./layout/PartnerRoutes";
import { isAuthenticated, logout } from './utilities/cookies/AuthCookiesManager';
import { AuthProvider } from './utilities/context/AuthContext';
import AuthModel from './components/global/authentication/AuthModel';

function App() {
  const hostname = window.location.hostname;
  const isAdminSubdomain = hostname.startsWith('admin');
  const isPartnerSubdomain = hostname.startsWith('partner');
  useEffect(() => {
    if(!isAuthenticated()) logout();
  },[])
  
  return (
    <>
      <AuthProvider>
        <AuthModel />
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            <Route path="*" element={ isAdminSubdomain ? <AdminRoutes/> : isPartnerSubdomain ? <PartnerRoutes/> : <ClientRoutes /> } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
