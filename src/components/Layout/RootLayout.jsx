import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Navbar/TopNavbar';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import { useAtom } from 'jotai';
import { themeAtom } from '../../utils/globalAtom';

const RootLayout = () => {
  const [theme] = useAtom(themeAtom);
  const location = useLocation();
  const showFooter =
    !location.pathname.startsWith('/products/') && location.pathname !== '/';

  return (
    <div className={classNames(theme, 'min-h-screen')}>
      <ToastContainer theme={theme} />
      <TopNavbar />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
