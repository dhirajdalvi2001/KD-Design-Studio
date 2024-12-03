import { axiosInstance, customFetch } from './axios';
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
        // Get the latest access token on each request
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
            const response = await customFetch.post('/iam/login/refresh/', {
              refresh_token: refreshToken,
            });

            const newAccessToken = response?.data?.data?.access_token;
            const userInfo = response?.data?.data?.user_data;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('user', JSON.stringify(userInfo));

            // Update the Authorization header with new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // Update axiosInstance default headers
            axiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            localStorage.setItem('redirectPath', window.location.pathname);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
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
    localStorage.removeItem('user');
    navigate('/');
  }

  return { axiosInstance, handleLogout, accessToken, refreshToken, isLoggedIn };
};
