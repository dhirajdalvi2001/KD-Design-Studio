import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Table from '../../../../components/Table/Table';
import { useAxios } from '../../../../api/useAxios';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';
import { toast } from 'react-toastify';
import UserActions from './UserActions';
import Badge from '../../../../components/Badge/Badge';

export default function Users() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const usersTableHeaders = [
    { label: 'Sr. No.', className: 'w-[100px]' },
    { label: 'Username', className: 'w-[100px]' },
    { label: 'Full Name', className: 'w-full' },
    { label: 'Status', className: 'min-w-[100px]' },
    { label: 'Actions', className: 'w-[60px]' },
  ];

  // All Users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => {

      const response = await axiosInstance.get('/iam/user/');
      return response.data;
    },
    refetchOnMount: true,
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Change Status
  const { mutate: changeStatus, isLoading: changeStatusLoading } = useMutation({
    mutationFn: async ({ userId, value }) => {
      const response = await axiosInstance.post(
        `/iam/user/${userId}/active-status/`,
        {
          is_active: value,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('User status updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
  });

  // Delete User
  const { mutate: deleteUser, isLoading: deleteUserLoading } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.delete(`/iam/user/${userId}/`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
  });

  console.log(usersData, 'users DD');

  const usersTableBody = usersData?.data?.map((user, index) => [
    index + 1,
    user.username,
    user.full_name,
    <Badge key={user.id}>{user.is_active ? 'Active' : 'Inactive'}</Badge>,
    <UserActions
      key={user.id}
      user={user}
      deleteUser={deleteUser}
      deleteUserLoading={deleteUserLoading}
      changeStatus={changeStatus}
      changeStatusLoading={changeStatusLoading}
    />,
  ]);

  return (
    <AdminBodyLayout
      title='Users'
      addNewButton='Add New User'
      addNewHRef='/admin/manage-users/users/new'
    >
      <Table
        headers={usersTableHeaders}
        body={usersTableBody}
        isLoading={isLoading}
        isListPage
      />
    </AdminBodyLayout>
  );
}
