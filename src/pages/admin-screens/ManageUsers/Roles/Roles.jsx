import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import Table from '../../../../components/Table/Table';
import { useAxios } from '../../../../api/useAxios';
import { Button } from '@nextui-org/react';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';

export default function Roles() {
  const { axiosInstance } = useAxios();
  const roleTableHeaders = [
    { label: 'Sr. No.', className: 'w-[100px]' },
    { label: 'Name', className: 'w-full' },
    { label: 'Number of Users', className: 'w-[100px]' },
    { label: 'Actions', className: 'w-[60px]' },
  ];

  const { data: roles, isLoading } = useQuery({
    queryKey: ['getAllRoles'],
    queryFn: async () => {
      const response = await axiosInstance.get('/iam/role/');
      return response.data;
    },
    refetchOnMount: true,
  });

  console.log(roles, 'roles DD');

  const rolesTableBody = roles?.data?.roles?.map((role, index) => [
    index + 1,
    role.name,
    role.no_of_users,
    <div key={role.id} className="w-fit flex justify-center items-center gap-2">
      <Button variant="ghost" size="sm" className="!min-w-8 !w-8 !h-8 !p-0">
        <BsPencilSquare />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="!min-w-8 !w-8 !h-8 text-danger !p-0"
      >
        <BsTrash />
      </Button>
    </div>,
  ]);

  return (
    <AdminBodyLayout>
      <Table
        headers={roleTableHeaders}
        body={rolesTableBody}
        isLoading={isLoading}
      />
    </AdminBodyLayout>
  );
}
