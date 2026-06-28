import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import OrderSummary from "../components/OrderSummary";
import { addToOrder } from "../redux/CheckoutReducer/action";
import { getCartData } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cartReducer);
  const { token, email, name } = useSelector((state) => state.authReducer);
  const [payment, setPayment] = useState("COD");
  const [placing, setPlacing] = useState(false);
  const toast = useToast();
  const form = useRef();

  const cartTotal = items.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
    0
  );
  const totalMRP = items.reduce(
    (sum, i) => sum + (Number(i.originalPrice) || 0) * (Number(i.quantity) || 1),
    0
  );

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_njs4kp9",
        "template_sl7otrx",
        form.current,
        "Nq3b6kBd881QBgo2R"
      )
      .then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
  };

  const handleClick = () => {
    const item = JSON.parse(localStorage.getItem("newItem"))?.map((ele) => ({
      ...ele,
      payment,
    }));
    if (!item) {
      toast({
        title: "No items to order",
        description: "Please add delivery details first.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      navigate("/cart");
      return;
    }
    setPlacing(true);
    dispatch(addToOrder(item)).then(() => {
      toast({
        title: "Order placed!",
        description: "Your order will be delivered within 5 days.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      axios
        .delete(`${BASE_URL}/users/cart/delete/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          dispatch(getCartData);
          sendEmail();
          setTimeout(() => navigate("/profile"), 1800);
        })
        .finally(() => setPlacing(false));
    });
  };

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Heading size="lg" mb={6}>
        Payment
      </Heading>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap={8} alignItems="start">
        <GridItem display="flex" flexDirection="column" gap={6}>
          <Box
            bg="white"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="blackAlpha.100"
            boxShadow="sm"
            p={{ base: 5, md: 7 }}
          >
            <Heading size="md" mb={4}>
              Payment Method
            </Heading>
            <RadioGroup value={payment} onChange={setPayment}>
              <Stack spacing={3}>
                <Flex
                  as="label"
                  align="center"
                  justify="space-between"
                  borderWidth="1.5px"
                  borderColor={payment === "COD" ? "brand.500" : "blackAlpha.200"}
                  bg={payment === "COD" ? "brand.50" : "white"}
                  borderRadius="lg"
                  p={4}
                  cursor="pointer"
                  transition="all 0.2s"
                >
                  <Radio value="COD" colorScheme="brand">
                    <Text fontWeight="600" ml={1}>
                      Cash on Delivery
                    </Text>
                  </Radio>
                  <Badge colorScheme="green">Available</Badge>
                </Flex>

                {["UPI", "Card"].map((mode) => (
                  <Flex
                    key={mode}
                    align="center"
                    justify="space-between"
                    borderWidth="1.5px"
                    borderColor="blackAlpha.100"
                    borderRadius="lg"
                    p={4}
                    opacity={0.55}
                  >
                    <Radio value={mode} isDisabled colorScheme="brand">
                      <Text fontWeight="600" ml={1}>
                        {mode === "UPI" ? "UPI" : "Credit / Debit Card"}
                      </Text>
                    </Radio>
                    <Badge>Coming soon</Badge>
                  </Flex>
                ))}
              </Stack>
            </RadioGroup>
          </Box>

          {items.length > 0 && (
            <Box
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="blackAlpha.100"
              boxShadow="sm"
              p={{ base: 5, md: 7 }}
            >
              <Heading size="md" mb={4}>
                Items in your order ({items.length})
              </Heading>
              <VStack align="stretch" spacing={4} divider={<Box borderBottomWidth="1px" borderColor="blackAlpha.100" />}>
                {items.map((it) => (
                  <HStack key={it._id || it.pid} spacing={4}>
                    <Flex
                      boxSize="56px"
                      bg="paper"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                      p={1}
                      flexShrink={0}
                    >
                      <Image
                        src={Array.isArray(it.image) ? it.image[0] : it.image}
                        alt={it.title}
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Flex>
                    <Box flex="1" minW={0}>
                      <Text fontWeight="600" noOfLines={1} color="ink.700">
                        {it.title}
                      </Text>
                      <Text fontSize="sm" color="ink.400">
                        Qty: {it.quantity}
                      </Text>
                    </Box>
                    <Text fontWeight="700" color="ink.700">
                      ₹{(Number(it.price) || 0) * (Number(it.quantity) || 1)}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}
        </GridItem>

        <GridItem position={{ lg: "sticky" }} top="120px">
          <OrderSummary totalMRP={totalMRP} cartTotal={cartTotal} paymentMode={payment}>
            <Button
              w="full"
              size="lg"
              isLoading={placing}
              loadingText="Placing order…"
              onClick={handleClick}
            >
              Confirm Order
            </Button>
          </OrderSummary>
        </GridItem>
      </Grid>

      <form style={{ display: "none" }} ref={form} onSubmit={sendEmail}>
        <input readOnly value={name} type="text" name="user_name" />
        <input readOnly value={email} type="email" name="user_email" />
        <textarea
          readOnly
          value={`Your Order has been confirmed , it will be deliver in 5-7 days `}
          name="message"
        />
        <input type="submit" value="Send" />
      </form>
    </Container>
  );
};

export default Payment;
