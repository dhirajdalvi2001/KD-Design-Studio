import { axiosInstance } from './axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAxios = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  // Add interceptor to handle token refresh
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Skip refresh token attempt for login endpoint errors
        if (originalRequest.url === '/iam/login/') {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axiosInstance.post('/iam/login/refresh/', {
              refreshToken,
            });

            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure (e.g., logout user)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            return Promise.reject(refreshError.response.data);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');
  }

  return { axiosInstance, handleLogout, accessToken, refreshToken, isLoggedIn };
};
