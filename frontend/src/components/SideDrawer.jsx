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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthReducer/action";
import React from "react";

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, name } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const btnRef = React.useRef();

  return (
    <>
      <Box display={{ md: "none" }}>
        <Button ref={btnRef} variant={"ghost"} onClick={onOpen}>
          <GiHamburgerMenu />
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <AiOutlineUser size={"2rem"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Hi, {name}</MenuItem>
                  <MenuItem onClick={onClose}>
                    <Link to={"/profile"}>My Orders</Link>
                  </MenuItem>
                  <MenuItem onClick={onClose}>
                    <Button
                      onClick={() => dispatch(logout())}
                      variant={"ghost"}
                    >
                      <BiLogOut size={"1.5rem"} />
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex gap={".5rem"} onClick={onClose}>
                <BiLogIn size={"1.5rem"} />
                <Link to={"/register"}>Login</Link>
              </Flex>
            )}
          </DrawerHeader>

          <DrawerBody>
            <Box
              display={{ base: "flex", sm: "flex", md: "flex" }}
              flexDirection={"column"}
              alignItems={"left"}
              justifyContent={"space-between"}
              p={"1rem"}
              gap={"1rem"}
              cursor={"pointer"}
            >
              <Box>
                <Menu>
                  <MenuButton as={Button} variant="ghost">
                    Categories
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onClose}>
                      {" "}
                      <Link to={"/product/multi/nutrients"}>
                        Sports Nutrition
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onClose}>
                      <Link to={"/product/multi/vitamins"}>
                        Vitamins & Supplements
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onClose}>
                      <Link to={"/product/multi/ayurveda"}>
                        Ayurveda & Herbs
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onClose}>
                      <Link to={"/product/multi/food"}>
                        Health Food & Drinks
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onClose}>Fitness</MenuItem>
                    <MenuItem onClick={onClose}>Wellness</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={".3em"}
                cursor={"pointer"}
                onClick={onClose}
              >
                <Flex>
                  <Link to={"/cart"}>
                    <AiOutlineShoppingCart />
                    Cart
                  </Link>
                </Flex>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <MdSell />
                BestSellers
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <TbBrandAdonisJs />
                Brands
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <FaIdeal />
                Deals
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <FaNewspaper />
                Blogs
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <AiTwotoneGift />
                Gift Card
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <BsFillChatDotsFill />
                Customer Support
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={onClose}
                gap={".3em"}
              >
                <MdLocationOn size={"1.3rem"} />
                Store Locator
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
