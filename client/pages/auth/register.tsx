import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { NextPageWithLayout } from "../../types/next.types";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import AuthRoute from "../../components/Authenticated/AuthRoute";
import { ThemeToggler } from "../../components/ThemeToggler";

const Register: NextPageWithLayout = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const { register: registerUser } = useAuth();
  const toast = useToast();

  const onSubmit = async () => {
    try {
      const values = getValues();
      await registerUser({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      toast({
        title: "Success",
        status: "success",
      });
    } catch (error: any) {
      console.error(error);
      const validateError = error.response.data;
      for (const key in validateError) {
        setError(key as any, {
          type: "manual",
          message: validateError[key][0],
        });
      }
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This is required field",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.username}>
            <Input
              placeholder="username"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This is required field",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Creating account..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Register
          </Button>
        </form>
        {/* <ThemeToggler showLabel={true} /> */}
        <Link href="/auth/login">
          <Button width="100%" colorScheme="gray" variant="outline" mt={6}>
            Login Instead
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

Register.getLayout = (page: React.ReactNode) => {
  return <AuthRoute>{page}</AuthRoute>;
};

export default Register;
