import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useAxios } from '../../api/useAxios';
import { useCookies } from 'react-cookie';

export default function ProfileMenu() {
  const { handleLogout } = useAxios();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='max-w-[200px] truncate'>
          {user?.username}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem
          key='delete'
          className='hover:text-white'
          color='danger'
          onClick={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
