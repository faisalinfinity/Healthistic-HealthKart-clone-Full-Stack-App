import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { BASE_URL } from "../../constants/constants";
import SideNav from "../components/SideNav";
import Dashboard from "./Dashboard";
import MobileSideNav from "../components/MobileSideNav";
import AddProduct from "../components/AddProducts";
import EditProduct from "./EditProducts";
import ManageOrders from "./ManageOrder";
import { FaInfo } from "react-icons/fa";

export default function AdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  // useEffect(() => {

  //     window.scrollTo(0, 0);
  //   }, []);

  const [tab, setTab] = useState(1);
  const { isLoggedIn, token, name } = useSelector((store) => store.authReducer);
  const nav = useNavigate();
  const [user, setUser] = useState({ status: false });

  const setTabNumber = (number) => {
    setTab(number);
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      const getData = async () => {
        let res = await axios({
          method: "get",
          url: BASE_URL + "/user/getuser",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.status == 1) {
          setUser({
            admin: "admin" + res.data.userId,
            role: res.data.role,
            status: true,
            name: res.data.name,
          });
        } else {
          setUser({
            status: false,
          });
          nav("/404");
        }
      };
      getData();
    } else {
    }
  }, []);

  // if(!user.status) return <Loading />

  return (
    <Box mt={"20px"} mb={"2rem"}>
      <Badge
        textAlign={"center"}
        colorScheme={"red"}
        fontSize={"8px"}
        mb="10px"
      >
        <Icon as={FaInfo}></Icon>Seller/Admin can only Delete/Modify and See
        orders <wbr /> for products which are added by them.
      </Badge>
      <Flex gap={4} position={"relative"} w={"100%"}>
        <Wrap
          zIndex={999}
          display={{ base: "block", sm: "block", md: "block", lg: "none" }}
          h={"100vh"}
          position={"fixed"}
          top={"180px"}
          right={2}
        >
          <>
            <IconButton
              icon={<GiHamburgerMenu />}
              colorScheme={"teal"}
              ref={btnRef}
              onClick={onOpen}
            >
              Open
            </IconButton>
            <Drawer
              isOpen={isOpen}
              placement={"right"}
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Admin Panel</DrawerHeader>

                <DrawerBody>
                  <MobileSideNav
                    onClose={onClose}
                    name={"HELLO"}
                    role={"HELLO"}
                    setTab={setTabNumber}
                    tab={tab}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        </Wrap>
        <SideNav
          name={"ADMIN PANEL"}
          role={name}
          setTab={setTabNumber}
          tab={tab}
        />

        <Box
          className="fifty"
          overflowY={"scroll"}
          padding={"2px 16px"}
          border={"2px dashed red"}
          borderRadius={20}
          w={{ base: "100%", sm: "100%", md: "100%", lg: "75%" }}
        >
          {(() => {
            switch (tab) {
              case 1: {
                return <Dashboard user={"HELLO"} />;
              }

              case 2: {
                return <AddProduct />;
              }

              case 3: {
                return <EditProduct />;
              }

              case 4: {
                return <ManageOrders />;
              }

              default: {
                return <Dashboard />;
              }
            }
          })()}
        </Box>
      </Flex>
    </Box>
  );
}
