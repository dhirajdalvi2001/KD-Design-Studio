import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Navbar/TopNavbar';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import { useAtom } from 'jotai';
import { themeAtom } from '../../utils/globalAtom';
import Cookies from 'js-cookie'; // Import Cookies to get the token

const RootLayout = () => {
  const [theme] = useAtom(themeAtom);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if accessToken exists in cookies
  const accessToken = Cookies.get('accessToken');

  // Redirect to login page if token is missing and user is not on an auth route
  if (!accessToken && !location.pathname.startsWith('/auth')) {
    navigate('/auth/login');
  }

  const showFooter =
    !location.pathname.startsWith('/products/') && location.pathname !== '/';

  return (
    <div className={classNames(theme, 'min-h-screen')}>
      <ToastContainer theme={theme} position="top-right" className="z-[1000]" />
      <TopNavbar />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
