import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
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
import { useAuth } from "../../hooks/useAuth";
import { NextPageWithLayout } from "../../types/next.types";
import { useRouter } from "next/router";
import AuthRoute from "../../components/Authenticated/AuthRoute";
import { ThemeToggler } from "../../components/ThemeToggler";

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
  const toast = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const values = getValues();
      await login(values.email, values.password);
      toast({
        title: "Success",
        status: "success",
      });
      const backTo = (router.query.backTo as string) || "/";
      router.push(backTo);
    } catch (_error) {
      toast({
        title: "Invalid email or password",
        status: "error",
      });
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
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              size="lg"
              mt={6}
              {...register("email", {
                required: "This is required field",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This is required field",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Logging in..."
            width="100%"
            colorScheme="red"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Login
          </Button>
        </form>
        {/* <ThemeToggler showLabel={true} /> */}
        <Link href="/auth/register">
          <Button width="100%" colorScheme="gray" variant="outline" mt={6}>
            Register Instead
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

Login.getLayout = (page: React.ReactNode) => {
  return <AuthRoute>{page}</AuthRoute>;
};

export default Login;
