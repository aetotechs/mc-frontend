import { Suspense, useEffect } from "react";
import PageLoadingSpinner from "./client/components/global/PageLoadingSpinner";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./client/utils/context/AuthContext";
import AuthModel from "./client/components/authentication/AuthModel";
import { isAuthenticated, logout } from "./client/utils/cookies/AuthCookiesManager";
import AdminRoutes from "./layout/AdminRoutes";
import ClientRoutes from "./layout/ClientRoutes";
import PartnerRoutes from "./layout/PartnerRoutes";

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
