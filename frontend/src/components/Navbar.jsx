import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  MenuList,
  MenuItem,
  Image,
  Input,
  Menu,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  MenuButton,
  MenuDivider,
  Flex,
  Badge,
  Text,
  HStack,
  Spinner,
  Avatar,
  Container,
} from "@chakra-ui/react";
import Logo from "../assets/healthifyLogo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut, BiLogIn, BiChevronDown } from "react-icons/bi";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthReducer/action";
import { getCartData } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";
import { CATEGORIES } from "../constants/categories";

const SearchBox = ({ size = "md" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const controller = new AbortController();
    const timer = setTimeout(() => {
      axios
        .get(`${BASE_URL}/product?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setResults(res.data.data || []);
          setIsSearching(false);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) setIsSearching(false);
        });
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProduct = (id) => {
    setQuery("");
    setOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <Box ref={containerRef} position="relative" w="100%">
      <InputGroup size={size}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="ink.300" />
        </InputLeftElement>
        <Input
          bg="white"
          placeholder="Search for proteins, vitamins, brands…"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          aria-label="Search products"
        />
        {query && (
          <InputRightElement>
            {isSearching ? (
              <Spinner size="sm" color="brand.500" />
            ) : (
              <CloseIcon
                boxSize="2.5"
                color="ink.300"
                cursor="pointer"
                onClick={() => setQuery("")}
              />
            )}
          </InputRightElement>
        )}
      </InputGroup>

      {open && query.trim() && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          left={0}
          right={0}
          bg="white"
          zIndex={30}
          maxH="22rem"
          overflowY="auto"
          borderRadius="xl"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          py={2}
        >
          {isSearching && results.length === 0 ? (
            <Flex p={4} align="center" gap={3} color="ink.400">
              <Spinner size="sm" color="brand.500" />
              <Text fontSize="sm">Searching…</Text>
            </Flex>
          ) : results.length === 0 ? (
            <Text p={4} fontSize="sm" color="ink.400">
              No products match “{query.trim()}”.
            </Text>
          ) : (
            results.map((ele) => (
              <Flex
                key={ele._id}
                align="center"
                gap={3}
                px={4}
                py={2.5}
                cursor="pointer"
                transition="background 0.15s"
                _hover={{ bg: "brand.50" }}
                onClick={() => goToProduct(ele._id)}
              >
                <Image
                  boxSize="40px"
                  objectFit="contain"
                  src={ele.image?.[0]}
                  alt={ele.title}
                  bg="paper"
                  borderRadius="md"
                  p={1}
                />
                <Box overflow="hidden">
                  <Text fontSize="sm" fontWeight="600" color="ink.700" noOfLines={1}>
                    {ele.title}
                  </Text>
                  <Text fontSize="xs" color="brand.600" fontWeight="600">
                    ₹{ele.price}
                  </Text>
                </Box>
              </Flex>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

const Navbar = () => {
  const { isLoggedIn, name, role, token } = useSelector(
    (store) => store.authReducer
  );
  const { items } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && token.length > 0) {
      dispatch(getCartData);
    }
  }, [token, dispatch]);

  const cartCount = items?.length || 0;
  const isAdmin = String(role).toLowerCase() === "admin";

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      bg="white"
      borderBottomWidth="1px"
      borderColor="blackAlpha.100"
      boxShadow="xs"
    >
      {/* Announcement strip */}
      <Box bgGradient="linear(to-r, brand.600, brand.500)" color="white">
        <Container maxW="7xl">
          <Flex
            h="34px"
            align="center"
            justify="center"
            gap={6}
            fontSize="xs"
            fontWeight="600"
            letterSpacing="0.02em"
          >
            <Text>✦ 100% Authentic Products</Text>
            <Text display={{ base: "none", sm: "block" }}>
              ✦ Free Shipping Sitewide
            </Text>
            <Text display={{ base: "none", md: "block" }}>
              ✦ Expert Nutrition Support
            </Text>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: 2.5, md: 3 }}>
        <Flex align="center" gap={{ base: 2, md: 6 }}>
          <Box display={{ base: "block", lg: "none" }}>
            <SideDrawer />
          </Box>

          <Link to="/" aria-label="Healthistic home">
            <Image
              src={Logo}
              alt="Healthistic"
              h={{ base: "30px", md: "38px" }}
              objectFit="contain"
            />
          </Link>

          {/* Desktop search */}
          <Box flex="1" display={{ base: "none", md: "block" }} maxW="640px">
            <SearchBox />
          </Box>

          <HStack spacing={{ base: 1, md: 3 }} ml="auto">
            {isLoggedIn ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  px={2}
                  rightIcon={
                    <Box display={{ base: "none", md: "block" }}>
                      <BiChevronDown />
                    </Box>
                  }
                >
                  <HStack spacing={2}>
                    <Avatar size="xs" name={name} bg="brand.500" color="white" />
                    <Text
                      display={{ base: "none", md: "block" }}
                      fontSize="sm"
                      fontWeight="600"
                      maxW="120px"
                      noOfLines={1}
                    >
                      {name}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <Box px={3} py={2}>
                    <Text fontSize="xs" color="ink.400">
                      Signed in as
                    </Text>
                    <Text fontWeight="700" color="ink.700" noOfLines={1}>
                      {name}
                    </Text>
                  </Box>
                  <MenuDivider />
                  <MenuItem as={Link} to="/profile">
                    My Orders
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem as={Link} to="/admin">
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuDivider />
                  <MenuItem
                    icon={<BiLogOut size="1.1rem" />}
                    color="red.500"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                leftIcon={<BiLogIn size="1.2rem" />}
                size="sm"
              >
                <Text display={{ base: "none", sm: "block" }}>Login</Text>
              </Button>
            )}

            <Button
              as={Link}
              to="/cart"
              variant="soft"
              position="relative"
              px={3}
              aria-label="Cart"
            >
              <AiOutlineShoppingCart size="1.4rem" />
              {cartCount > 0 && (
                <Badge
                  position="absolute"
                  top="-6px"
                  right="-6px"
                  bg="accent.500"
                  color="white"
                  borderRadius="full"
                  minW="20px"
                  textAlign="center"
                  fontSize="xs"
                  boxShadow="sm"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </HStack>
        </Flex>

        {/* Mobile search */}
        <Box mt={3} display={{ base: "block", md: "none" }}>
          <SearchBox size="md" />
        </Box>
      </Container>

      {/* Category bar (desktop) */}
      <Box
        display={{ base: "none", lg: "block" }}
        borderTopWidth="1px"
        borderColor="blackAlpha.100"
        bg="white"
      >
        <Container maxW="7xl">
          <HStack spacing={1} h="48px" align="center">
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                fontWeight="700"
                rightIcon={<BiChevronDown />}
              >
                Shop by Category
              </MenuButton>
              <MenuList>
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.to} as={Link} to={c.to}>
                    {c.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {CATEGORIES.map((c) => (
              <Button
                key={c.to}
                as={Link}
                to={c.to}
                variant="ghost"
                size="sm"
                color="ink.500"
                fontWeight="500"
                _hover={{ bg: "transparent", color: "brand.600" }}
              >
                {c.label}
              </Button>
            ))}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
