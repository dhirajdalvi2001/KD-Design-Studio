import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BsBox, BsTags, BsPeople } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useAxios } from '../../api/useAxios';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function SideNavbar() {
  const { handleLogout } = useAxios();

  return (
    <div className='fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-background shadow-lg'>
      <nav className='flex flex-col h-full'>
        <div className='flex-1 !text-[11px] md:!text-[13px]'>
          <Link
            to='/admin'
            className='flex items-center gap-3 px-6 py-3 hover:bg-foreground-200 text-foreground-900 transition-all'
          >
            <RxDashboard className='text-lg' />
            <span>Dashboard</span>
          </Link>

          <Link
            to='/admin/manage-products'
            className='flex items-center gap-3 px-6 py-3 hover:bg-foreground-200 text-foreground-900 transition-all'
          >
            <BsBox className='text-lg' />
            <span>Manage Products</span>
          </Link>

          <Accordion
            isCompact
            fullWidth
            className='!text-[11px] md:!text-[13px]'
          >
            <AccordionItem
              key='manage-users'
              aria-label='Manage Users'
              title={
                <div className='flex items-center gap-3 !text-[11px] md:!text-[13px]'>
                  <BsPeople className='text-lg' />
                  <span>Manage Users</span>
                </div>
              }
              className='px-3 py-1 text-xs md:text-sm text-foreground-900 transition-all'
            >
              <div className='flex flex-col pl-4'>
                <Link
                  to='/admin/manage-users/users'
                  className='flex items-center gap-3 px-6 py-2 hover:bg-foreground-200 text-foreground-900 transition-all'
                >
                  <span>Users</span>
                </Link>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <button
          onClick={handleLogout}
          className='flex items-center gap-3 px-6 py-3 hover:bg-danger-500 text-[10px] md:text-xs text-foreground-900 hover:text-foreground-100 border-t transition-all duration-150'
        >
          <FiLogOut className='text-lg' />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
