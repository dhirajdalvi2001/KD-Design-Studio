import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Table from '../../../../components/Table/Table';
import { useAxios } from '../../../../api/useAxios';
import { Button } from '@nextui-org/react';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Roles() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const roleTableHeaders = [
    { label: 'Sr. No.', className: 'w-[100px]' },
    { label: 'Name', className: 'w-full' },
    { label: 'Number of Users', className: 'w-[100px]' },
    { label: 'Actions', className: 'w-[60px]' },
  ];

  // All Roles
  const { data: roles, isLoading } = useQuery({
    queryKey: ['getAllRoles'],
    queryFn: async () => {
      const response = await axiosInstance.get('/iam/role/');
      return response.data;
    },
    refetchOnMount: true,
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Delete Role
  const { mutate: deleteRole, isLoading: deleteRoleLoading } = useMutation({
    mutationFn: async (roleId) => {
      const response = await axiosInstance.delete(`/iam/role/${roleId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Role deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['getAllRoles'] });
    },
  });

  const rolesTableBody = roles?.data?.roles?.map((role, index) => [
    index + 1,
    role.name,
    role.no_of_users,
    <div key={role.id} className="w-fit flex justify-center items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="!min-w-8 !w-8 !h-8 !p-0"
        onClick={() => navigate(`/admin/manage-users/roles/${role.id}`)}
      >
        <BsPencilSquare />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        isDisabled={deleteRoleLoading}
        className="!min-w-8 !w-8 !h-8 text-danger !p-0"
        onClick={() => deleteRole(role.id)}
      >
        <BsTrash />
      </Button>
    </div>,
  ]);

  return (
    <AdminBodyLayout
      title="Roles"
      addNewButton="Add New Role"
      addNewHRef="/admin/manage-users/roles/new"
    >
      <Table
        headers={roleTableHeaders}
        body={rolesTableBody}
        isLoading={isLoading}
        isListPage
      />
    </AdminBodyLayout>
  );
}
