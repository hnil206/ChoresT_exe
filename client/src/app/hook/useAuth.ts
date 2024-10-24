import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password }, {
        withCredentials: true
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  // const checkAdminStatus = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-admin`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setIsAdmin(response.data.isAdmin);
  //     }
  //   } catch (error) {
  //     console.error('Error checking admin status:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     checkAdminStatus();
  //   }
  // }, [isAuthenticated]);

  return { isAuthenticated, isAdmin, login, logout };
};

export default useAuth;
