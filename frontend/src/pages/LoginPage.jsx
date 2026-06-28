import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Link as CLink,
  Button,
  Heading,
  Text,
  useToast,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/AuthReducer/action";
import { Navigate, Link } from "react-router-dom";
import { isEmail, isNonEmpty } from "../utils/validators";
import AuthBrandPanel from "../components/AuthBrandPanel";

export default function LoginPage() {
  const { isLoggedIn, role } = useSelector((store) => ({
    isLoggedIn: store.authReducer.isLoggedIn,
    role: store.authReducer.role,
  }));

  const dispatch = useDispatch();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = {
    email: !isNonEmpty(email)
      ? "Email is required"
      : !isEmail(email)
      ? "Enter a valid email address"
      : "",
    password: !isNonEmpty(password) ? "Password is required" : "",
  };
  const isValid = !errors.email && !errors.password;

  const handleLogin = () => {
    setTouched({ email: true, password: true });
    if (!isValid) return;
    setSubmitting(true);
    dispatch(login({ email: email.trim(), password }))
      .then((res) => {
        if (res === "Incorrect password ") {
          toast({
            title: "Incorrect password",
            description: "Please check your password and try again.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        } else if (res === "User not register") {
          toast({
            title: "Account not found",
            description: "No account is registered with this email.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Welcome back!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .finally(() => setSubmitting(false));
  };

  if (isLoggedIn) {
    return <Navigate to={role === "admin" ? "/admin" : "/"} />;
  }

  return (
    <Flex minH={{ base: "auto", lg: "calc(100vh - 80px)" }}>
      <AuthBrandPanel />

      <Flex flex="1" align="center" justify="center" p={{ base: 6, md: 12 }}>
        <Box w="full" maxW="420px">
          <Stack spacing={2} mb={8}>
            <Heading fontSize="3xl">Welcome back</Heading>
            <Text color="ink.400">
              Sign in to continue to your Healthistic account.
            </Text>
          </Stack>

          <Stack
            as="form"
            spacing={5}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <FormControl isInvalid={touched.email && !!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                autoComplete="email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.password && !!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  autoComplete="current-password"
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <Icon as={showPassword ? ViewOffIcon : ViewIcon} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <HStack justify="space-between">
              <CLink fontSize="sm" color="brand.600">
                Forgot password?
              </CLink>
            </HStack>

            <Button
              type="submit"
              size="lg"
              isLoading={submitting}
              loadingText="Signing in…"
            >
              Sign in
            </Button>
          </Stack>

          <Text textAlign="center" mt={8} color="ink.400">
            New to Healthistic?{" "}
            <CLink as={Link} to="/register" color="brand.600" fontWeight="700">
              Create an account
            </CLink>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
