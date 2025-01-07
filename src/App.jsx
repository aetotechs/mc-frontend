import { lazy, Suspense } from "react";
import PageLoadingSpinner from "./client/components/global/PageLoadingSpinner";
import { Route, Routes } from "react-router-dom";
import AuthModel from "./client/components/global/AuthModel";
import { AuthProvider } from "./client/utils/context/AuthContext";
const Home = lazy(() => import("./client/pages/Home"));
const Listings = lazy(() => import("./client/pages/Listings"));

function App() {
  return (
    <>
      <AuthProvider>
        <AuthModel />
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/listings" element={<Listings />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
