import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Navbar/TopNavbar';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import { useAtom } from 'jotai';
import { authAtom, themeAtom } from '../../utils/globalAtom';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../api/useAxios';
import { useEffect } from 'react';

const RootLayout = () => {
  const [theme] = useAtom(themeAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(authAtom);
  const location = useLocation();
  const { axiosInstance, userId, handleLogout } = useAxios();
  const showFooter =
    !location.pathname.startsWith('/products/') && location.pathname !== '/';

  // User Config
  const { data: userData } = useQuery({
    queryKey: ['userConfig'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/iam/user/${userId}/`);
      return response.data;
    },
    enabled: !!userId,
    refetchOnMount: true,
  });

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     handleLogout();
  //   }
  // }, [isAuthenticated, handleLogout]);

  // useEffect(() => {
  //   if (userData) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [userData, setIsAuthenticated]);

  return (
    <div className={classNames(theme, 'min-h-screen')}>
      <ToastContainer theme={theme} position='top-right' className='z-[1000]' />
      <TopNavbar />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
