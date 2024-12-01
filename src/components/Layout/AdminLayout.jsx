import AdminNavbar from '../Navbar/AdminNavbar';
import { useAtom } from 'jotai';
import { themeAtom } from '../../utils/globalAtom';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../Navbar/SideNavbar';

export default function AdminLayout() {
  const [theme] = useAtom(themeAtom);
  return (
    <div className={classNames(theme, 'min-h-screen min-w-screen')}>
      <AdminNavbar />
      <SideNavbar />
      <div className="ml-64 pt-[78px] px-3 w-[calc(100%-256px)] h-[calc(100vh)] bg-foreground-50">
        <Outlet />
      </div>
    </div>
  );
}
