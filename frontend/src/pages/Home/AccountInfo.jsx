import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  Button,
  Avatar,
  Image,
  Input,
  HStack,
  VStack,
  Badge,
  Icon,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MdShoppingBag,
  MdPerson,
  MdLocationOn,
  MdCardGiftcard,
} from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import InitialFocus from "./Modal";
import Paginantion from "../../admin/components/Pagination";
import { logout } from "../../redux/AuthReducer/action";
import { BASE_URL } from "../../constants/constants";

const TABS = [
  { label: "My Orders", icon: MdShoppingBag },
  { label: "Personal Information", icon: MdPerson },
  { label: "Addresses", icon: MdLocationOn },
  { label: "Refer & Earn", icon: MdCardGiftcard },
];

const statusColor = (status) => {
  const s = String(status).toLowerCase();
  if (s === "delivered") return "green";
  if (s === "cancelled") return "red";
  if (s.includes("placed")) return "orange";
  return "gray";
};

const AccountInfo = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { name, email, token, gender, profile, address } = useSelector(
    (state) => state.authReducer
  );

  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [tab, setTab] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);

  const OrderArr = async () => {
    let res = await axios({
      url: `${BASE_URL}/users/order?page=${page}&limit=${1}`,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalOrder(res.data.total);
    setOrder(res.data.data);
    setPage(res.data.page);
    setTotalPage(res.data.totalPages);
  };

  const handleCancel = (id) => {
    axios
      .patch(
        `${BASE_URL}/users/order/${id}`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        OrderArr();
        toast({
          title: "Order Cancelled",
          position: "top",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    OrderArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Heading size="lg" mb={6}>
        My Account
      </Heading>

      <Grid templateColumns={{ base: "1fr", lg: "260px 1fr" }} gap={8} alignItems="start">
        {/* Sidebar */}
        <GridItem position={{ lg: "sticky" }} top="120px">
          <Box
            bg="white"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="blackAlpha.100"
            boxShadow="sm"
            overflow="hidden"
          >
            <Flex
              align="center"
              gap={3}
              p={5}
              bgGradient="linear(to-br, brand.600, brand.500)"
              color="white"
            >
              <Avatar size="md" name={name} src={profile} bg="whiteAlpha.300" />
              <Box minW={0}>
                <Text fontWeight="700" noOfLines={1}>
                  {name}
                </Text>
                <Text fontSize="xs" color="whiteAlpha.800" noOfLines={1}>
                  {email}
                </Text>
              </Box>
            </Flex>

            <Flex
              direction={{ base: "row", lg: "column" }}
              gap={1}
              p={3}
              overflowX={{ base: "auto", lg: "visible" }}
            >
              {TABS.map((t, i) => {
                const active = tab === i + 1;
                return (
                  <Button
                    key={t.label}
                    onClick={() => setTab(i + 1)}
                    variant={active ? "solid" : "ghost"}
                    justifyContent="flex-start"
                    leftIcon={<Icon as={t.icon} boxSize="18px" />}
                    fontWeight={active ? "700" : "500"}
                    color={active ? "white" : "ink.600"}
                    flexShrink={0}
                    size="sm"
                  >
                    {t.label}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                color="red.500"
                justifyContent="flex-start"
                leftIcon={<BiLogOut size="18px" />}
                size="sm"
                flexShrink={0}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </Flex>
          </Box>
        </GridItem>

        {/* Content */}
        <GridItem minW={0}>
          <Flex align="baseline" gap={3} mb={5}>
            <Heading size="md">{TABS[tab - 1].label}</Heading>
            {tab === 1 && (
              <Badge colorScheme="brand" variant="subtle">
                {totalOrder} total
              </Badge>
            )}
          </Flex>

          {tab === 1 &&
            (order.length === 0 ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                py={16}
                bg="white"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="blackAlpha.100"
              >
                <Image
                  w="180px"
                  src="https://i.postimg.cc/9QTzdDpp/cart-Image.png"
                  alt="No orders"
                />
                <Heading size="sm" mt={4} color="ink.500">
                  No orders yet
                </Heading>
                <Button as={Link} to="/" mt={5}>
                  Start Shopping
                </Button>
              </Flex>
            ) : (
              <>
                <VStack align="stretch" spacing={4}>
                  {order
                    .slice()
                    .sort((a, b) => b.date - a.date)
                    .map((el) => (
                      <Flex
                        key={el._id}
                        bg="white"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="blackAlpha.100"
                        boxShadow="sm"
                        p={5}
                        direction={{ base: "column", sm: "row" }}
                        justify="space-between"
                        gap={4}
                      >
                        <Box>
                          <HStack mb={2} flexWrap="wrap">
                            <Heading size="sm" color="ink.700">
                              {el.title}
                            </Heading>
                            <Badge colorScheme={statusColor(el.status)}>
                              {el.status}
                            </Badge>
                          </HStack>
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={8} spacingY={1}>
                            <Text fontSize="sm" color="ink.500">
                              Price: ₹{el.price}
                            </Text>
                            <Text fontSize="sm" color="ink.500">
                              Quantity: {el.quantity}
                            </Text>
                            <Text fontSize="sm" color="ink.500">
                              Payment: {el.payment}
                            </Text>
                            <Text fontSize="sm" color="ink.500">
                              Date: {el.date}
                            </Text>
                          </SimpleGrid>
                        </Box>
                        {el.status !== "Cancelled" && (
                          <Flex align="flex-start">
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="red"
                              onClick={() => handleCancel(el._id)}
                            >
                              {el.status === "delivered"
                                ? "Return Order"
                                : "Cancel Order"}
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                    ))}
                </VStack>
                <Paginantion
                  key={page}
                  page={page}
                  setPage={setPage}
                  divide={5}
                  totalPage={totalPage}
                />
              </>
            ))}

          {tab === 2 && (
            <Flex
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="blackAlpha.100"
              boxShadow="sm"
              p={6}
              gap={5}
              align="center"
            >
              <Avatar size="xl" name={name} src={profile} bg="brand.500" color="white" />
              <Box>
                <Heading size="md">{name}</Heading>
                <Text color="ink.500" mt={1}>
                  {email}
                </Text>
                {gender && (
                  <Badge mt={2} colorScheme="brand" variant="subtle" textTransform="capitalize">
                    {gender}
                  </Badge>
                )}
              </Box>
            </Flex>
          )}

          {tab === 3 && (
            <VStack align="stretch" spacing={4}>
              <Box>
                <InitialFocus />
              </Box>
              {address ? (
                <Box
                  bg="white"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="blackAlpha.100"
                  boxShadow="sm"
                  p={6}
                >
                  <Heading size="sm" color="ink.700">
                    {address}
                  </Heading>
                </Box>
              ) : (
                <Box
                  bg="white"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="blackAlpha.100"
                  p={8}
                  textAlign="center"
                  color="ink.400"
                >
                  No saved addresses yet.
                </Box>
              )}
            </VStack>
          )}

          {tab === 4 && (
            <Box
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="blackAlpha.100"
              boxShadow="sm"
              p={{ base: 6, md: 8 }}
            >
              <Heading size="md">Refer friends, earn ₹200</Heading>
              <Text color="ink.500" mt={2} maxW="lg">
                Invite your friends to Healthistic. They get ₹200 off their first
                order, and you earn ₹200 in rewards.
              </Text>
              <Box mt={6} maxW="sm">
                <Text fontWeight="600" mb={2} fontSize="sm" color="ink.600">
                  Friend's Email
                </Text>
                <HStack>
                  <Input placeholder="friend@example.com" />
                  <Button px={6}>Send</Button>
                </HStack>
              </Box>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default AccountInfo;
