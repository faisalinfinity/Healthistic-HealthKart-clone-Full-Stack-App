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
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiTwotoneGift } from "react-icons/ai";
import { MdSell, MdLocationOn } from "react-icons/md";
import { FaIdeal, FaNewspaper } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbBrandAdonisJs } from "react-icons/tb";
import React from "react";

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Button variant={"ghost"}>Login</Button>
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
                    <MenuItem>Sports Nutrition</MenuItem>
                    <MenuItem>Vitamins & Supplements</MenuItem>
                    <MenuItem>Ayurveda & Herbs</MenuItem>
                    <MenuItem>Health Food & Drinks</MenuItem>
                    <MenuItem>Fitness</MenuItem>
                    <MenuItem>Wellness</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={".3em"}
                cursor={"pointer"}
              >
                <AiOutlineShoppingCart />
                Cart
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
