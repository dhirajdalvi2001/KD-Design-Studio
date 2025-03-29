import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useAxios } from '../../api/useAxios';

export default function ProfileMenu() {
  const { handleLogout } = useAxios();
  const { username } = useAxios()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='max-w-[200px] truncate'>
          {username}
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
