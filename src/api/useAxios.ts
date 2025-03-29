import { axiosInstance, customFetch } from "./axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useAxios = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const access = cookies["access"];
  const refresh = cookies["refresh"];
  const firstName = cookies["first_name"];
  const lastName = cookies["last_name"];
  const isSuperadmin = cookies["is_superadmin"];
  const email = cookies["email"];
  const username = cookies["username"];
  const userId = cookies["id"];
  const isAuthenticated = !!access;

  // Add interceptor to handle token refresh
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        // Get the latest access token on each request
        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
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
        if (originalRequest.url === "/iam/login/") {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await customFetch.post("/iam/refresh/", {
              refresh_token: refresh,
            });

            const newAccessToken = response?.data?.access;
            setCookies("access", newAccessToken);

            // Update the Authorization header with new access token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            // Update axiosInstance default headers
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // Ensure the Authorization header is added to the request
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            localStorage.setItem("redirectPath", window.location.pathname);
            handleLogout();
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
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
  }, [access]);

  function handleLogout() {
    setCookies("access", null);
    setCookies("refresh", null);
    setCookies("first_name", null);
    setCookies("last_name", null);
    setCookies("is_superadmin", null);
    setCookies("email", null);
    setCookies("username", null);
    setCookies("id", null);
    navigate("/");
  }

  return {
    axiosInstance,
    handleLogout,
    access,
    refresh,
    userId,
    firstName,
    lastName,
    username,
    email,
    isSuperadmin,
    isAuthenticated,
  };
};
