import { axiosInstance, customFetch } from './axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const useAxios = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const accessToken = cookies['accessToken'];
  const refreshToken = cookies['refreshToken'];
  const stringUser = cookies['user'];
  const user = stringUser ? JSON.parse(stringUser) : null;
  const userId = user?.id;

  // Add interceptor to handle token refresh
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        // Get the latest access token on each request
        const token = cookies['accessToken'];
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
            const refreshToken = cookies['refreshToken'];
            const response = await customFetch.post('/iam/login/refresh/', {
              refresh_token: refreshToken,
            });

            const newAccessToken = response?.data?.data?.access_token;
            const userInfo = response?.data?.data?.user_data;
            cookies.set('accessToken', newAccessToken);
            cookies.set('user', JSON.stringify(userInfo));

            // Update the Authorization header with new access token
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            // Update axiosInstance default headers
            axiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;

            // Ensure the Authorization header is added to the request
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            localStorage.setItem('redirectPath', window.location.pathname);
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
            cookies.remove('user');
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
    localStorage.removeItem('user');
    setCookies('accessToken', null);
    setCookies('refreshToken', null);
    navigate('/');
  }

  return {
    axiosInstance,
    handleLogout,
    accessToken,
    refreshToken,
    user,
    userId,
  };
};
