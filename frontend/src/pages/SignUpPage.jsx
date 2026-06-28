import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Button,
  Heading,
  Text,
  Link as CLink,
  Select,
  useToast,
  useDisclosure,
  Icon,
  Progress,
  HStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useNavigate, Link } from "react-router-dom";
import OtpModal from "../components/Otp-validator";
import emailjs from "@emailjs/browser";
import AuthBrandPanel from "../components/AuthBrandPanel";
import { isEmail, isNonEmpty, passwordIssues, passwordStrength } from "../utils/validators";

const STRENGTH = [
  { label: "Too weak", color: "red" },
  { label: "Weak", color: "orange" },
  { label: "Fair", color: "yellow" },
  { label: "Good", color: "teal" },
  { label: "Strong", color: "green" },
];

export default function Signup() {
  const initData = {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    profile: "",
  };
  const [userData, setUserData] = useState(initData);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pwIssues = passwordIssues(userData.password);
  const strength = passwordStrength(userData.password);

  const errors = useMemo(
    () => ({
      name: !isNonEmpty(userData.name) ? "Name is required" : "",
      role: !isNonEmpty(userData.role) ? "Please select a role" : "",
      gender: !isNonEmpty(userData.gender) ? "Please select a gender" : "",
      email: !isNonEmpty(userData.email)
        ? "Email is required"
        : !isEmail(userData.email)
        ? "Enter a valid email address"
        : "",
      password: !isNonEmpty(userData.password)
        ? "Password is required"
        : pwIssues.length
        ? `Password needs ${pwIssues.join(", ")}`
        : "",
    }),
    [userData, pwIssues]
  );
  const isValid = Object.values(errors).every((e) => !e);

  const set = (key) => (e) =>
    setUserData((d) => ({ ...d, [key]: e.target.value }));
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const handleSignIn = () => {
    axios
      .post(BASE_URL + `/users/register`, userData)
      .then(() => {
        toast({
          title: "Account created!",
          description: "You can now sign in to your account.",
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
        onClose();
        navigate("/login");
      })
      .catch((err) => {
        if (err?.response?.data === "User Already Registered") {
          toast({
            title: "Account already exists",
            description: "Try signing in instead.",
            status: "error",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again in a moment.",
            status: "error",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        }
      });
  };

  const sendEmail = (form) => {
    emailjs
      .sendForm(
        "service_njs4kp9",
        "template_kt4q5zk",
        form.current,
        "Nq3b6kBd881QBgo2R"
      )
      .then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
  };

  const validatePassword = (sent, entered) => {
    if (sent !== entered) {
      toast({
        title: "Incorrect OTP",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      handleSignIn();
    }
  };

  const handleSubmit = () => {
    setTouched({
      name: true,
      role: true,
      gender: true,
      email: true,
      password: true,
    });
    if (!isValid) return;
    onOpen();
  };

  return (
    <Flex minH={{ base: "auto", lg: "calc(100vh - 80px)" }}>
      <AuthBrandPanel
        title="Join the Healthistic family today."
        points={[
          "Exclusive member-only deals",
          "Track orders & manage addresses",
          "Earn rewards on every purchase",
        ]}
      />

      <Flex flex="1" align="center" justify="center" p={{ base: 6, md: 10 }}>
        <Box w="full" maxW="480px" py={{ base: 4, md: 0 }}>
          <Stack spacing={1} mb={7}>
            <Heading fontSize="3xl">Create your account</Heading>
            <Text color="ink.400">
              It only takes a minute to get started.
            </Text>
          </Stack>

          <Stack
            as="form"
            spacing={5}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl isRequired isInvalid={touched.name && !!errors.name}>
              <FormLabel>Full name</FormLabel>
              <Input
                placeholder="e.g. Aarav Sharma"
                value={userData.name}
                onChange={set("name")}
                onBlur={blur("name")}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <FormControl isRequired isInvalid={touched.role && !!errors.role}>
                <FormLabel>Account type</FormLabel>
                <Select
                  placeholder="Select role"
                  value={userData.role}
                  onChange={set("role")}
                  onBlur={blur("role")}
                >
                  <option value="user">Shopper</option>
                  <option value="admin">Seller</option>
                </Select>
                <FormErrorMessage>{errors.role}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={touched.gender && !!errors.gender}
              >
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select gender"
                  value={userData.gender}
                  onChange={set("gender")}
                  onBlur={blur("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={touched.email && !!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={userData.email}
                onChange={set("email")}
                onBlur={blur("email")}
                autoComplete="email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={touched.password && !!errors.password}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={userData.password}
                  onChange={set("password")}
                  onBlur={blur("password")}
                  autoComplete="new-password"
                />
                <InputRightElement>
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
              {userData.password ? (
                <Box mt={2}>
                  <Progress
                    value={(strength / 4) * 100}
                    size="xs"
                    borderRadius="full"
                    colorScheme={STRENGTH[strength].color}
                  />
                  <HStack justify="space-between" mt={1}>
                    <Text fontSize="xs" color="ink.400">
                      Password strength
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      color={`${STRENGTH[strength].color}.500`}
                    >
                      {STRENGTH[strength].label}
                    </Text>
                  </HStack>
                </Box>
              ) : (
                <FormHelperText fontSize="xs">
                  Use at least 6 characters with a letter and a number.
                </FormHelperText>
              )}
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button type="submit" size="lg" mt={1}>
              Sign up
            </Button>
          </Stack>

          <OtpModal
            email={userData.email}
            validate={validatePassword}
            sendEmail={sendEmail}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
          />

          <Text textAlign="center" mt={7} color="ink.400">
            Already have an account?{" "}
            <CLink as={Link} to="/login" color="brand.600" fontWeight="700">
              Sign in
            </CLink>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
