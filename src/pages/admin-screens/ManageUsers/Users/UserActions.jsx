import { Button, Switch } from '@nextui-org/react';
import { useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function UserActions({
  user,
  deleteUser,
  deleteUserLoading,
  changeStatus,
  changeStatusLoading,
}) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(user.is_active);

  function handleStatusChange(value) {
    changeStatus({ userId: user.id, value });
    setIsActive(value);
  }

  return (
    <div key={user.id} className="w-fit flex justify-center items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="!min-w-8 !w-8 !h-8 !p-0"
        onClick={() => navigate(`/admin/manage-users/users/${user.id}`)}
      >
        <BsPencilSquare />
      </Button>
      <Switch
        size="sm"
        isDisabled={changeStatusLoading}
        isSelected={isActive}
        onValueChange={handleStatusChange}
      />
      <Button
        variant="ghost"
        size="sm"
        isDisabled={deleteUserLoading}
        className="!min-w-8 !w-8 !h-8 text-danger !p-0"
        onClick={() => deleteUser(user.id)}
      >
        <BsTrash />
      </Button>
    </div>
  );
}
