import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Overview from '../pages/partner-pages/Overview';
import Properties from '../pages/partner-pages/Properties';
import NewProperty from '../pages/partner-pages/NewProperty';
import Messages from '../pages/partner-pages/Messages';
import { getAuthUser, isAuthenticated, logout } from '../utilities/cookies/AuthCookiesManager';

const PartnerRoutes = () => {
    const navigate = useNavigate();
    const user = getAuthUser();
  
    useEffect(() => {
      if (!isAuthenticated() || user?.role !== 'PARTNER' || user?.role !== 'ADMIN'  ) {
        logout();
        navigate('/un-authorised');
      }
    }, [navigate, isAuthenticated()]);
  
    return (
      <Routes>
        <Route path="/?" element={<Overview />} />
        <Route path="/properties?" element={<Properties />} />
        <Route path="/new?" element={<NewProperty />} />
        <Route path="/messages?" element={<Messages />} />
        <Route path="/edit/:propertyId?" element={<NewProperty />} />
        {/* <Route path="/un-authorised" element={<UnauthorisedPage />} /> */}
      </Routes>
    );
}

export default PartnerRoutes
