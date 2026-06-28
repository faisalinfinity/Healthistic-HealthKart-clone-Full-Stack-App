import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiLogOut, BiLogIn, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthReducer/action";
import { CATEGORIES } from "../constants/categories";
import React from "react";

const DrawerLink = ({ to, children, onClose }) => (
  <Flex
    as={Link}
    to={to}
    onClick={onClose}
    align="center"
    justify="space-between"
    px={4}
    py={3}
    borderRadius="lg"
    fontWeight="600"
    color="ink.700"
    _hover={{ bg: "brand.50", color: "brand.700" }}
  >
    <Text>{children}</Text>
    <Icon as={BiChevronRight} color="ink.300" />
  </Flex>
);

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, name } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        variant="ghost"
        onClick={onOpen}
        px={2}
        aria-label="Open menu"
      >
        <GiHamburgerMenu size="1.3rem" />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent>
          <DrawerCloseButton mt={2} />
          <DrawerHeader
            bgGradient="linear(to-br, brand.600, brand.500)"
            color="white"
            py={6}
          >
            <HStack spacing={3}>
              <Avatar
                size="md"
                name={isLoggedIn ? name : undefined}
                icon={<AiOutlineUser size="1.5rem" />}
                bg="whiteAlpha.300"
                color="white"
              />
              <Box>
                {isLoggedIn ? (
                  <>
                    <Text fontSize="xs" color="whiteAlpha.800" fontWeight="500">
                      Welcome back
                    </Text>
                    <Text fontSize="lg" fontWeight="700" noOfLines={1}>
                      {name}
                    </Text>
                  </>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    onClick={onClose}
                    size="sm"
                    bg="white"
                    color="brand.700"
                    leftIcon={<BiLogIn size="1.1rem" />}
                    _hover={{ bg: "whiteAlpha.900" }}
                  >
                    Login / Register
                  </Button>
                )}
              </Box>
            </HStack>
          </DrawerHeader>

          <DrawerBody px={3} py={4}>
            <Text
              px={4}
              fontSize="xs"
              fontWeight="700"
              color="ink.300"
              textTransform="uppercase"
              letterSpacing="0.06em"
              mb={1}
            >
              Categories
            </Text>
            <VStack align="stretch" spacing={0.5}>
              {CATEGORIES.map((c) => (
                <DrawerLink key={c.to} to={c.to} onClose={onClose}>
                  {c.label}
                </DrawerLink>
              ))}
            </VStack>

            <Divider my={4} />

            <VStack align="stretch" spacing={0.5}>
              <Flex
                as={Link}
                to="/cart"
                onClick={onClose}
                align="center"
                gap={3}
                px={4}
                py={3}
                borderRadius="lg"
                fontWeight="600"
                color="ink.700"
                _hover={{ bg: "brand.50", color: "brand.700" }}
              >
                <AiOutlineShoppingCart size="1.2rem" />
                <Text>My Cart</Text>
              </Flex>
              {isLoggedIn && (
                <Flex
                  as={Link}
                  to="/profile"
                  onClick={onClose}
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  fontWeight="600"
                  color="ink.700"
                  _hover={{ bg: "brand.50", color: "brand.700" }}
                >
                  <AiOutlineUser size="1.2rem" />
                  <Text>My Orders</Text>
                </Flex>
              )}
            </VStack>

            {isLoggedIn && (
              <>
                <Divider my={4} />
                <Button
                  w="full"
                  variant="ghost"
                  color="red.500"
                  justifyContent="flex-start"
                  leftIcon={<BiLogOut size="1.2rem" />}
                  onClick={() => {
                    dispatch(logout());
                    onClose();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
