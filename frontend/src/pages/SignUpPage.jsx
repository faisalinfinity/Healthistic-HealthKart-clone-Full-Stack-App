import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { validate } from "email-validator";
import OtpModal from "../components/Otp-validator";
import emailjs from "@emailjs/browser";
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
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSignIn = () => {
    axios
      .post(BASE_URL + `/users/register`, userData)
      .then((res) => {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
        navigate("/login");
        onClose();
      })
      .catch((err) => {
        if (err.response.data == "User Already Registered") {
          toast({
            title: "User Already Exist",
            status: "error",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        } else {
          console.log(err.response);
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
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
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
//hch
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w="50%" maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <Select
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              placeholder="Select role"
            >
              <option value="user">User</option>
              <option value="admin">Register as a seller</option>
            </Select>
            <Select
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              placeholder="Select gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                _hover={{ bgColor: "rgb(5,161,163)" }}
                bgColor={"rgb(15,181,183)"}
                color={"white"}
                onClick={() => {
                  if (validate(userData.email)) {
                    onOpen();
                  } else {
                    toast({
                      title: "Please Enter Valid Email",
                      status: "error",
                      duration: 3000,
                      position: "top",
                      isClosable: true,
                    });
                  }
                }}
              >
                Sign up
              </Button>
              <OtpModal
                email={userData.email}
                validate={validatePassword}
                sendEmail={sendEmail}
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
              />
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color="teal">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
