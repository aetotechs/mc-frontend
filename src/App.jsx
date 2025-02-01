import { lazy, Suspense, useEffect } from "react";
import PageLoadingSpinner from "./client/components/global/PageLoadingSpinner";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./client/utils/context/AuthContext";
import AuthModel from "./client/components/authentication/AuthModel";
import { isAuthenticated, logout } from "./client/utils/cookies/AuthCookiesManager";
const Home = lazy(() => import("./client/pages/Home"));
const Listings = lazy(() => import("./client/pages/Listings"));
const AccountSettings = lazy(() => import("./client/pages/AccountSettings"));

function App() {
  
  useEffect(() => {
    if(!isAuthenticated()) logout();
  },[])
  
  return (
    <>
      <AuthProvider>
        <AuthModel />
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/account" element={<AccountSettings />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
