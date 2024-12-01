import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginFormSchema } from '../../../utils/validations/login-validations';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxios } from '../../../api/useAxios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/iam/login/', data);
      return response.data;
    },
    onSuccess: (data) => {
      const response = data.data;
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user_data));
      toast.success('Login successful!');
      navigate('/');
    },
    onError: (error) => {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        setError('password', { message: error?.detail });
      });
    },
  });

  function handleLogin(data) {
    loginUser(data);
  }
  return (
    <form
      className="h-[260px] flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Input
        label="Username"
        size="sm"
        variant="underlined"
        placeholder="Enter your username"
        disabled={isPending}
        {...register('username')}
        errorMessage={errors.username?.message}
        required
      />
      <Input
        label="Password"
        size="sm"
        variant="underlined"
        placeholder="Enter your password"
        disabled={isPending}
        {...register('password')}
        errorMessage={errors.password?.message}
        required
      />
      <Button
        type="submit"
        variant="solid"
        className="mt-4 h-8 rounded-none"
        disabled={isPending}
        isLoading={isPending}
      >
        Login
      </Button>
    </form>
  );
}
