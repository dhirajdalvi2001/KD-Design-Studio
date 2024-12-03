import { Button } from '@nextui-org/react';
import classNames from 'classnames';
import { BsPlusCircle } from 'react-icons/bs';
import Typography from '../Typography/Typography';
import { useNavigate } from 'react-router-dom';

export default function AdminBodyLayout({
  children,
  className,
  title,
  addNewButton,
  addNewHRef,
  isFormPage,
}) {
  const navigate = useNavigate();

  function handleAddNew() {
    if (!addNewHRef) return;
    navigate(addNewHRef);
  }

  return (
    <div
      className={classNames(
        'h-[calc(100vh-120px)] bg-transparent flex flex-col gap-3',
        isFormPage ? 'overflow-y-auto' : null,
        className
      )}
    >
      <div className="flex justify-between items-center gap-3">
        {title && <Typography variant="title">{title}</Typography>}
        {addNewButton && (
          <Button
            className="!w-fit"
            startContent={<BsPlusCircle />}
            onClick={handleAddNew}
          >
            {addNewButton}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
