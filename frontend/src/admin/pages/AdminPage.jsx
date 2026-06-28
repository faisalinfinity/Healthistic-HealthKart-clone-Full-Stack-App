import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import {
  Drawer,
  DrawerBody,
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

export default function AdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [tab, setTab] = useState(1);
  const { isLoggedIn, token, name } = useSelector((store) => store.authReducer);
  const nav = useNavigate();
  const [, setUser] = useState({ status: false });

  const setTabNumber = (number) => setTab(number);

  useEffect(() => {
    if (isLoggedIn && token) {
      const getData = async () => {
        let res = await axios({
          method: "get",
          url: BASE_URL + "/user/getuser",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status == 1) {
          setUser({
            admin: "admin" + res.data.userId,
            role: res.data.role,
            status: true,
            name: res.data.name,
          });
        } else {
          setUser({ status: false });
          nav("/404");
        }
      };
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTab = () => {
    switch (tab) {
      case 1:
        return <Dashboard />;
      case 2:
        return <AddProduct />;
      case 3:
        return <EditProduct />;
      case 4:
        return <ManageOrders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container maxW="7xl" py={{ base: 5, md: 8 }}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Admin Panel</Heading>
        <IconButton
          display={{ base: "inline-flex", lg: "none" }}
          ref={btnRef}
          aria-label="Open admin menu"
          icon={<GiHamburgerMenu />}
          onClick={onOpen}
        />
      </Flex>

      <HStack
        bg="orange.50"
        color="accent.700"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="orange.100"
        px={4}
        py={2.5}
        mb={5}
        spacing={2}
        align="flex-start"
      >
        <Icon as={FaInfoCircle} mt={0.5} flexShrink={0} />
        <Text fontSize="sm">
          Sellers can only modify, delete and view orders for products they have
          added.
        </Text>
      </HStack>

      <Flex gap={6} align="flex-start">
        <Box
          display={{ base: "none", lg: "block" }}
          w="240px"
          flexShrink={0}
          position="sticky"
          top="120px"
        >
          <SideNav name="ADMIN PANEL" role={name} setTab={setTabNumber} tab={tab} />
        </Box>

        <Box
          flex="1"
          minW={0}
          bg="white"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          boxShadow="sm"
          p={{ base: 4, md: 6 }}
        >
          {renderTab()}
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent>
          <DrawerCloseButton mt={2} />
          <DrawerHeader>Admin Menu</DrawerHeader>
          <DrawerBody>
            <MobileSideNav
              onClose={onClose}
              name={name}
              role="Admin"
              setTab={setTabNumber}
              tab={tab}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
