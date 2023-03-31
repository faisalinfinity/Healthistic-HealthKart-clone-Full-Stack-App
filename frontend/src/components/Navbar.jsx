import React from "react";
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
} from "@chakra-ui/react";
import Logo from "../assets/healthifyLogo.png";
import { AiOutlineShoppingCart, AiTwotoneGift } from "react-icons/ai";
import { MdSell, MdLocationOn } from "react-icons/md";
import { FaIdeal, FaNewspaper } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbBrandAdonisJs } from "react-icons/tb";
import { Search2Icon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Image w={"80%"} src={Logo} />
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
            <Button variant={"ghost"}>Login</Button>
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
              <MenuItem>Sports Nutrition</MenuItem>
              <MenuItem>Vitamins & Supplements</MenuItem>
              <MenuItem>Ayurveda & Herbs</MenuItem>
              <MenuItem>Health Food & Drinks</MenuItem>
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
