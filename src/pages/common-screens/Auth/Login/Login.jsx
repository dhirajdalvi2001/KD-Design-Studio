import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginFormSchema } from "../../../../utils/validations/login-validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAxios } from "../../../../api/useAxios";
import { useNavigate } from "react-router-dom";
import { themeAtom } from "../../../../utils/globalAtom";
import { useSetAtom } from "jotai";
import { useCookies } from "react-cookie";

export default function Login() {
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const setTheme = useSetAtom(themeAtom);
  const [cookies, setCookies] = useCookies();

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
      const response = await axiosInstance.post("/iam/login/", data);
      return response.data;
    },
    onSuccess: (data) => {
      setTheme("dark");
      const isSuperAdmin = data?.user?.is_superadmin;
      Object.entries(data).forEach(([key, value]) => {
        Object.entries(value).forEach(([k, val]) => {
          setCookies(k, val);
        });
      });
      toast.success("Login successful!");
      if (isSuperAdmin) {
        navigate("/admin");
      } else navigate("/");
    },
    onError: (error) => {
      const emailError = error.response.data.email;
      const passwordError = error.response.data.password;
      setError("email", { message: emailError });
      setError("password", { message: passwordError });
    },
  });

  function handleLogin(data) {
    loginUser(data);
  }
  return (
    <form
      className="h-[290px] flex flex-col justify-center items-center gap-0"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="w-full h-60 flex flex-col justify-center gap-4">
        <Input
          label="Email"
          size="sm"
          variant="underlined"
          placeholder="Enter your email"
          disabled={isPending}
          {...register("email")}
          errorMessage={errors?.email?.message}
          required
        />
        <Input
          label="Password"
          size="sm"
          variant="underlined"
          placeholder="Enter your password"
          disabled={isPending}
          type="password"
          {...register("password")}
          errorMessage={errors.password?.message}
          required
        />
      </div>
      <Button
        type="submit"
        variant="solid"
        className="mt-4 min-h-8 h-8 rounded-none"
        disabled={isPending}
        isLoading={isPending}
      >
        Login
      </Button>
    </form>
  );
}
