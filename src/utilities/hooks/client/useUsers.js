import { useState, useEffect, useCallback } from 'react';
import api_urls from '../../constants/api_urls';
import { getUserToken, isAuthenticated, setAuthUser, setUserToken } from '../../cookies/AuthCookiesManager';

const token = getUserToken();

export function useUsers(reload, admin) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAllUsers = useCallback(async () => {
    if (!isAuthenticated() || !admin) return;
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.get_all_users, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        setUsers(await response.json());
      };
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserById = async (userId) => {
    if (!isAuthenticated()) return;
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.get_user(userId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.json();
      };
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userPayload) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const updateUser = async (userId, userPayload) => {
    if (!isAuthenticated()) return;
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.update_account(userId), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(userPayload),
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.json();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!isAuthenticated()) return;
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.delete(userId), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.verify, {
        method: 'PATCH',
        headers: { 'Verification-Token': token },
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.reset_operation(newPassword), {
        method: 'PATCH',
        headers: { 'Verification-Token': token },
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationToken = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.regenerate_verification_token(email), {
        method: 'POST'
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const sendPasswordResetToken = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.generate_reset_token(email), {
        method: 'POST'
      });
      if (!response.ok) {
        setError(await response.text())
      } else {
        return await response.text();
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.users.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
          setError(await response.text())
        } else {
          const data = await response.json();
          setAuthUser(data.user);
          setUserToken(data.token);
        return "success";
      };
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers, reload]);

  return {
    users,
    currentUser,
    loading,
    error,
    success, 
    setSuccess,
    setError,
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    verifyUser,
    resetPassword,
    sendPasswordResetToken,
    resendVerificationToken,
    loginUser,
  };
}