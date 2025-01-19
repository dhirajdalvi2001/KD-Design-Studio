import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginFormSchema } from '../../../../utils/validations/login-validations';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxios } from '../../../../api/useAxios';
import { useNavigate } from 'react-router-dom';
import { themeAtom } from '../../../../utils/globalAtom';
import { useSetAtom } from 'jotai';
import Cookies from 'js-cookie';

export default function Login() {
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const setTheme = useSetAtom(themeAtom);
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
      setTheme('dark');

      // Access tokens from response data
      const accessToken = data.data.token.access_token;
      const refreshToken = data.data.token.refresh_token;

      // Store tokens in Cookies with 1-day expiry
      Cookies.set('accessToken', accessToken, { expires: 1});
      Cookies.set('refreshToken', refreshToken, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(data.data.user_data));

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
        errorMessage={errors?.username?.message}
        required
      />
      <Input
        label="Password"
        size="sm"
        variant="underlined"
        placeholder="Enter your password"
        disabled={isPending}
        type="password"
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
