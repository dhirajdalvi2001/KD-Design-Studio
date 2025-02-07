import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Navbar/TopNavbar';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import { useAtom, useSetAtom } from 'jotai';
import { authAtom, themeAtom } from '../../utils/globalAtom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const RootLayout = () => {
  const [theme] = useAtom(themeAtom);
  const setIsAuthenticated = useSetAtom(authAtom);
  const location = useLocation();
  const showFooter =
    !location.pathname.startsWith('/products/') && location.pathname !== '/';
  const [cookies] = useCookies();
  const isLoggedIn = !!cookies['accessToken'];

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isLoggedIn, setIsAuthenticated]);

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
