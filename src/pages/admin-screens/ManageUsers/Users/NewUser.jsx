import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../../api/useAxios';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';
import { Button, Input, Switch } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { initialValue } from '../../../../utils/validations/user-validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import onError from '../../../../utils/onError';
import { userFormSchema } from '../../../../utils/validations/user-validations';
import Typography from '../../../../components/Typography/Typography';

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
      return response.data;
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
      const response = await axiosInstance.patch(`/iam/user/${userId}`, data);
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
      setValue('username', userDetails.data.username);
      setValue('first_name', userDetails.data.first_name);
      setValue('last_name', userDetails.data.last_name);
      setValue('email', userDetails.data.email);
      setValue('is_superuser', userDetails.data.is_superuser);
    }

    if (!userId) {
      reset({ ...initialValue });
    }
  }, [userId, userDetails, setValue, reset]);

  function onSubmit(data) {
    if (userId) {
      updateUser(data);
    } else {
      if (!data.password) {
        setError('password', { message: 'Password is required' });
        return;
      }
      createUser(data);
    }
  }

  const fieldsDisabled = userDetailsLoading;
  const buttonDisabled = createUserLoading || updateUserLoading;

  return (
    <AdminBodyLayout
      title='New User'
      isFormPage
      buttonDisabled={buttonDisabled}
    >
      <form
        className='flex flex-wrap gap-3 w-full md:w-[760px] text-foreground-900'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label='First Name'
          placeholder='Enter First Name'
          size='md'
          labelPlacement='outside'
          variant='bordered'
          className='w-[350px]'
          isDisabled={fieldsDisabled}
          value={watch('first_name')}
          errorMessage={errors.first_name?.message}
          {...register('first_name')}
        />
        <Input
          label='Last Name'
          placeholder='Enter Last Name'
          size='md'
          labelPlacement='outside'
          variant='bordered'
          className='w-[350px]'
          isDisabled={fieldsDisabled}
          value={watch('last_name')}
          errorMessage={errors.last_name?.message}
          {...register('last_name')}
        />
        <Input
          label='User Name'
          placeholder='Enter User Name'
          size='md'
          labelPlacement='outside'
          variant='bordered'
          className='w-[350px]'
          isDisabled={fieldsDisabled}
          value={watch('username')}
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <Input
          label='Email'
          placeholder='Enter Email'
          size='md'
          labelPlacement='outside'
          variant='bordered'
          className='w-[350px]'
          isDisabled={fieldsDisabled}
          value={watch('email')}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        {!userId && (
          <Input
            label='Password'
            placeholder='Enter Password'
            size='md'
            labelPlacement='outside'
            variant='bordered'
            className='w-[350px]'
            isDisabled={fieldsDisabled}
            value={watch('password')}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        )}

        <div className='flex flex-col gap-3'>
          <Typography variant='span' className='text-white text-sm'>
            Is Superuser?
          </Typography>
          <Switch
            size='sm'
            isDisabled={fieldsDisabled}
            isSelected={watch('is_superuser')}
            onValueChange={(value) => setValue('is_superuser', value)}
          />
        </div>
        <div className='w-full h-[60px] flex items-center justify-start gap-3'>
          <Button size='sm' variant='faded' onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            size='sm'
            variant='solid'
            type='submit'
            isDisabled={buttonDisabled}
            className='bg-primary-500 text-white'
          >
            Save
          </Button>
        </div>
      </form>
    </AdminBodyLayout>
  );
}
