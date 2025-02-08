import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAuthUser, isAuthenticated, logout } from '../client/utils/cookies/AuthCookiesManager';

const AdminRoutes = () => {
  const navigate = useNavigate();
  const user = getAuthUser();

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'ADMIN') {
      logout();
      navigate('/un-authorised');
    }
  }, [navigate, isAuthenticated()]);

  return (
    <Routes>
      {/* <Route path="*" element={<Dashboard />} />
      <Route path="/un-authorised" element={<UnauthorisedPage />} /> */}
    </Routes>
  );
};

export default AdminRoutes;