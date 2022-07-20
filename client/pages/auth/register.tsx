import Link from "next/link";
import React from "react";
import { Button, Input } from "../../components/Forms";
import { NextPageWithLayout } from "../../types/next.types";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import AuthRoute from "../../components/Authenticated/AuthRoute";

const Register: NextPageWithLayout = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const { register: registerUser } = useAuth();

  const onSubmit = async () => {
    try {
      const values = getValues();
      await registerUser({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="block p-6 rounded-lg shadow-lg bg-slate-800 max-w-sm h-fit">
        <h5 className="text-2xl leading-tight font-bold mb-2 text-center">
          Register
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
            placeholder="username"
            error={errors.username && errors.username.message}
            {...register("username", {
              required: "This is required field",
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters",
              },
            })}
          />
          <Input
            className="my-4"
            placeholder="password"
            type="password"
            error={errors.password && errors.password.message}
            {...register("password", {
              required: "This is required field",
              minLength: {
                value: 5,
                message: "password must be at least 5 characters",
              },
              maxLength: {
                value: 20,
                message: "password must be at most 20 characters",
              },
            })}
          />
          <Button className="my-4" type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </form>
        <Link href="/auth/login">
          <a className="text-center text-sm text-slate-500 hover:text-slate-600">
            Login instead
          </a>
        </Link>
      </div>
    </div>
  );
};

Register.getLayout = (page: React.ReactNode) => {
  return <AuthRoute>{page}</AuthRoute>;
};

export default Register;
