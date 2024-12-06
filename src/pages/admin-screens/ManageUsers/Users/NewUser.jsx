import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../../api/useAxios';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { initialValue } from '../../../../utils/validations/user-validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import onError from '../../../../utils/onError';
import { userFormSchema } from '../../../../utils/validations/user-validations';

export default function NewUser() {
  const { userId } = useParams();
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const {
    setValue,
    setError,
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(userFormSchema),
  });

  // User Details
  const { data: userDetails, isLoading: userDetailsLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/iam/user/${userId}`);
      return response.data.data.user;
    },
    enabled: !!userId,
    refetchOnMount: true,
  });

  // Create User
  const { mutate: createUser, isLoading: createUserLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/iam/user/', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('User created successfully!');
      navigate('/admin/manage-users/users');
    },
    onError: (error) => {
      onError(error, setError);
    },
  });

  // Update User
  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(`/iam/user/${userId}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('User updated successfully!');
      navigate('/admin/manage-users/users');
    },
    onError: (error) => {
      onError(error, setError);
    },
  });

  useEffect(() => {
    if (userDetails) {
      setValue('username', userDetails.username);
      setValue('email', userDetails.email);
      setValue('role', userDetails.role);
    }
    if (!userId) {
      reset({ ...initialValue });
    }
  }, [userId, userDetails, setValue, reset]);

  function onSubmit(data) {
    if (userId) {
      updateUser(data);
    } else {
      createUser(data);
    }
  }

  console.log(userDetails, 'userDetails DD');

  const fieldsDisabled = userDetailsLoading;
  const buttonDisabled = createUserLoading || updateUserLoading;

  return (
    <AdminBodyLayout
      title="New User"
      isFormPage
      buttonDisabled={buttonDisabled}
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="User Name"
          placeholder="Enter User Name"
          size="md"
          labelPlacement="outside"
          variant="bordered"
          className="w-[350px]"
          isDisabled={fieldsDisabled}
          value={watch('username')}
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <div className="w-full h-[60px] flex items-center justify-start gap-3">
          <Button size="sm" variant="faded" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            type="submit"
            isDisabled={buttonDisabled}
            className="bg-primary-500 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </AdminBodyLayout>
  );
}
