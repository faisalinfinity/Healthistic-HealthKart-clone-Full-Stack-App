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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

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

  const handleSignIn = () => {
    axios
      .post(`http://localhost:8080/users/register`, userData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
              <Box>
                <FormControl id="profilePic">
                  <FormLabel>Profile Picture</FormLabel>
                  <Input
                    onChange={(e) =>
                      setUserData({ ...userData, profile: e.target.value })
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
              <option value="admin">Admin</option>
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
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignIn}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
