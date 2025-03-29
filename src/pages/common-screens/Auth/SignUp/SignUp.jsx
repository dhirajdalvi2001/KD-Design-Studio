import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signUpFormSchema } from "../../../../utils/validations/sign-up-validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAxios } from "../../../../api/useAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/iam/sign-up/", data);
      return response.data;
    },
    onSuccess: (data) => {
      navigate("/auth/login");
    },
    onError: (error) => {
      const passwordError = error.response.data.password;
      setError("password", { message: passwordError });
    },
  });

  function handleSignUp(data) {
    if (!confirmPassword) {
      setError("password", {
        message: "Please confirm your password",
      });
      return;
    }
    if (data?.password !== confirmPassword) {
      setError("password", {
        message: "Passwords are not matching. Please re-enter the password",
      });
      return;
    }
    const payload = {
      ...data,
      username: data.username?.toLowerCase(),
      email: data.email?.toLowerCase(),
    };
    signUpUser(payload);
  }
  return (
    <form
      className="h-[290px] flex flex-col justify-center items-center gap-0"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <div className="w-full h-60 flex flex-col justify-center gap-3">
        <Input
          label="Username"
          size="sm"
          variant="underlined"
          placeholder="Enter your username"
          disabled={isPending}
          {...register("username")}
          errorMessage={errors?.username?.message}
          required
        />
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
        <Input
          label="Confirm Password"
          size="sm"
          variant="underlined"
          placeholder="Confirm your password"
          disabled={isPending}
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
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
        Sign Up
      </Button>
    </form>
  );
}
