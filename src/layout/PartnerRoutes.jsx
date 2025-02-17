import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAuthUser, isAuthenticated, logout } from '../client/utils/cookies/AuthCookiesManager';
import Overview from '../partner/pages/Overview';
import Properties from '../partner/pages/Properties';
import NewProperty from '../partner/pages/NewProperty';

const PartnerRoutes = () => {
    const navigate = useNavigate();
    const user = getAuthUser();
  
    // useEffect(() => {
    //   if (!isAuthenticated() || user?.role !== 'PARTNER') {
    //     logout();
    //     navigate('/un-authorised');
    //   }
    // }, [navigate, isAuthenticated()]);
  
    return (
      <Routes>
        <Route path="/?" element={<Overview />} />
        <Route path="/properties?" element={<Properties />} />
        <Route path="/new?" element={<NewProperty />} />
        {/* <Route path="/un-authorised" element={<UnauthorisedPage />} /> */}
      </Routes>
    );
}

export default PartnerRoutes
