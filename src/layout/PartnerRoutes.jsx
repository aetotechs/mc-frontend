import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Overview from '../pages/partner-pages/Overview';
import Properties from '../pages/partner-pages/Properties';
import NewProperty from '../pages/partner-pages/NewProperty';
import Messages from '../pages/partner-pages/Messages';
import { getAuthUser, isAuthenticated, logout } from '../utilities/cookies/AuthCookiesManager';
import { useAuthDialog } from '../utilities/hooks/client/useAuthDialog';
import AccountSettings from '../pages/partner-pages/AccountSettings';
import Notifications from '../pages/partner-pages/Notifications';
import Tours from '../pages/partner-pages/Tours';
import _403NoKey from '../pages/global/_403NoKey';
import _404NoPage from '../pages/global/_404NoPage';

const PartnerRoutes = () => {
    const navigate = useNavigate();
    const location = window.location;
    const { role } = getAuthUser();
    console.log("user", getAuthUser());
  
    useEffect(() => {
      if (isAuthenticated() && (role === 'PARTNER' || role === 'ADMIN')) {
        return;
      } else {
        navigate('/403?redirected=true&redirectUrl=') + location.pathname;
      }
    }, [navigate, isAuthenticated()]);
  
    return (
      <Routes>
        <Route path="/?" element={<Overview />} />
        <Route path="/settings?" element={<AccountSettings />} />
        <Route path="/tours?" element={<Tours />} />
        <Route path="/notifications?" element={<Notifications />} />
        <Route path="/properties?" element={<Properties />} />
        <Route path="/new?" element={<NewProperty />} />
        <Route path="/messages?" element={<Messages />} />
        <Route path="/edit/:propertyId?" element={<NewProperty />} />
        <Route path="/403" element={<_403NoKey />} />
        <Route path="*" element={<_404NoPage />} />
      </Routes>
    );
}

export default PartnerRoutes
