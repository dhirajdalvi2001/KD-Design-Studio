import AdminNavbar from '../Navbar/AdminNavbar';
import { useAtom, useAtomValue } from 'jotai';
import { authAtom, themeAtom } from '../../utils/globalAtom';
import classNames from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';
import SideNavbar from '../Navbar/SideNavbar';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [theme] = useAtom(themeAtom);
  const isAuthenticated = useAtomValue(authAtom);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/auth/login');
    }

  }, [isAuthenticated, navigate]);

  return (
    <div className={classNames(theme, 'min-h-screen min-w-screen')}>
      <AdminNavbar />
      <SideNavbar />
      <div className='ml-64 pt-[78px] px-3 w-[calc(100%-256px)] h-[calc(100vh)] bg-foreground-50'>
        <Outlet />
      </div>
    </div>
  );
}
