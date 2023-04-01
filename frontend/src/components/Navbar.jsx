import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthReducer/action";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const { isLoggedIn, name } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const searchResults = () => {
    axios
      .get(`http://localhost:8080/product/`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

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
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
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
                  <MenuItem>My Orders</MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => dispatch(logout)}
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
                <Link to={"/register"}>Login</Link>
              </Flex>
            )}
          </Box>
          <Box cursor={"pointer"}>
            <Link to="/cart">
              <AiOutlineShoppingCart size={"2rem"} />
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
