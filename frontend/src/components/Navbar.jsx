import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  MenuList,
  MenuItem,
  Image,
  Input,
  Menu,
  InputGroup,
  InputLeftElement,
  MenuButton,
  Flex,
  Badge,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/healthifyLogo.png";
import {
  AiOutlineShoppingCart,
  AiTwotoneGift,
  AiOutlineUser,
} from "react-icons/ai";
import { MdSell, MdLocationOn } from "react-icons/md";
import { FaIdeal, FaNewspaper } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbBrandAdonisJs } from "react-icons/tb";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Search2Icon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthReducer/action";
import { getCartData } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";
const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { isLoggedIn, name, token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchResults = () => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/product?q=${query}`)
        .then((res) => setResults(res.data.data))
        .catch((err) => console.log(err));
    }, 2000);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = () => {
    setQuery("");
  };

  const { items } = useSelector((store) => store.cartReducer);
  useEffect(() => {
    if (token.length > 0) {
      dispatch(getCartData);
    }
  }, []);

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        {/* --------------------------------Side-Drawer--------------------------- */}
        <Box>
          <SideDrawer />
        </Box>

        <Box w={{ base: "20%", md: "10%" }}>
          <Link to={"/"}>
            <Image w={"80%"} src={Logo} />
          </Link>
        </Box>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              w={{ base: "13rem", sm: "29rem", md: "39rem" }}
              placeholder="Search for Products and Brands"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                searchResults();
              }}
            />
          </InputGroup>
          {query && (
            <Box
              position={"absolute"}
              top={"5rem"}
              bg={"white"}
              zIndex={"3"}
              w={{base:"13rem",md:"39rem",lg:"39rem"}}
              maxH="13rem"
              border={"1px solid black"}
              overflowY="scroll"
              borderRadius="10px"
            >
              {results &&
                results.map((ele) => {
                  return (
                    <Link
                      mb={"1rem"}
                      onClick={() => setQuery("")}
                      p={"2rem"}
                      to={`/product/${ele._id}`}
                    >
                      <Flex
                        alignItems="center"
                        p="10px"
                        gap="10px"
                        _hover={{ bgColor: "teal", color: "white" }}
                      >
                        <Image w="3%" h="15%" src={ele.image[0]}></Image>
                        <Text> {ele.title}</Text>
                      </Flex>
                    </Link>
                  );
                })}
            </Box>
          )}
        </Box>
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
          justifyContent={"space-around"}
          w={"20%"}
        >
          <Box>
            {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <AiOutlineUser size={"2rem"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Hi, {name}</MenuItem>
                  <MenuItem>
                    <Link to={"/profile"}>My Orders</Link>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        dispatch(logout());
                      }}
                      variant={"ghost"}
                    >
                      <BiLogOut size={"1.5rem"} />
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex gap={".5rem"}>
                <BiLogIn size={"1.5rem"} />
                <Link to={"/login"}>Login</Link>
              </Flex>
            )}
          </Box>
          <Box cursor={"pointer"}>
            <Link to="/cart">
              <Flex>
                <AiOutlineShoppingCart size={"2rem"} />
                <Badge h="20%" w="40%" borderRadius="50%" colorScheme="green">
                  {items?.length}
                </Badge>
              </Flex>
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box
        display={{ base: "none", sm: "none", md: "flex" }}
        alignItems={"center"}
        justifyContent={"space-around"}
        p={"1rem"}
        cursor={"pointer"}
      >
        <Box>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              Shop By Category
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to={"/product/multi/nutrients"}>Sports Nutrition</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/product/multi/vitamins"}>
                  Vitamins & Supplements
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/product/multi/ayurveda"}>Ayurveda & Herbs</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/product/multi/food"}>Health Food & Drinks</Link>
              </MenuItem>
              <MenuItem>Fitness</MenuItem>
              <MenuItem>Wellness</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <MdSell />
          BestSellers
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <TbBrandAdonisJs />
          Brands
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <FaIdeal />
          Deals
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <FaNewspaper />
          Blogs
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <AiTwotoneGift />
          Gift Card
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <BsFillChatDotsFill />
          Customer Support
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={".3em"}>
          <MdLocationOn size={"1.3rem"} />
          Store Locator
        </Box>
      </Box>
      <Divider></Divider>
    </Box>
  );
};

export default Navbar;
