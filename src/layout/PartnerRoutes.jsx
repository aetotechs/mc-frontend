import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuthUser, isAuthenticated, logout } from '../client/utils/cookies/AuthCookiesManager';

const PartnerRoutes = () => {
    const navigate = useNavigate();
    const user = getAuthUser();
  
    useEffect(() => {
      if (!isAuthenticated() || user?.role !== 'PARTNER') {
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
}

export default PartnerRoutes
