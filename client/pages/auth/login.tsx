import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/Forms";
import { useAuth } from "../../hooks/useAuth";
import { NextPageWithLayout } from "../../types/next.types";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Login: NextPageWithLayout = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const values = getValues();
      await login(values.email, values.password);
      toast.success("Success");
      const backTo = (router.query.backTo as string) || "/";
      router.push(backTo);
    } catch (_error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="block p-6 rounded-lg shadow-lg bg-slate-800 max-w-sm h-fit">
        <h5 className="text-2xl leading-tight font-bold mb-2 text-center">
          Login
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="my-4"
            placeholder="email"
            error={errors.email && errors.email.message}
            {...register("email", {
              required: "This is required field",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            className="my-4"
            placeholder="password"
            type="password"
            error={errors.password && errors.password.message}
            {...register("password", { required: "This is required field" })}
          />
          <Button className="my-4" type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </form>
        <Link href="/auth/register">
          <a className="text-center text-sm text-slate-500 hover:text-slate-600">
            Create an account
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
