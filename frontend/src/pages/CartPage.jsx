import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CartCard from "../components/CartCard";

const CartPage = () => {
  const [cartData, setCartData] = useState([
    {
      title: "govind",
      description: "Dummy data",
      price: 1000,
      originalPrice: 1299,
      quantity: 1,
    },
    {
      title: "govind",
      description: "Dummy data",
      price: 1000,
      originalPrice: 1299,
      quantity: 1,
    },
    {
      title: "govind",
      description: "Dummy data",
      price: 1000,
      originalPrice: 1299,
      quantity: 1,
    },
  ]);
  let cartTotal = 0;
  for (let i = 0; i < cartData.length; i++) {
    cartTotal += cartData[i].price;
  }
  let totalMRP = 0;
  for (let i = 0; i < cartData.length; i++) {
    totalMRP += cartData[i].originalPrice;
  }
  return (
    <div>
      <Flex w="70%" m="auto">
        <Box w="70%">
          <Heading>Shopping Cart</Heading>
          {cartData.map((item) => (
            <CartCard key={item._id} {...item} />
          ))}
        </Box>
        <Box
          mt="5%"
          p="1%"
          w="23%"
          variant="outline"
          borderRadius={"10px"}
          //   border={"1px solid gray"}
          h="moz-min-content"
        >
          <Heading as="h3" size="md" marginBottom="4">
            Order Summary
          </Heading>

          <Flex marginBottom="2" justifyContent={"space-between"}>
            <Text>Total MRP:</Text>
            <Text>Rs.{totalMRP}</Text>
          </Flex>

          <Flex marginBottom="2" justifyContent={"space-between"}>
            <Text>Total Discount:</Text>
            <Text>Rs.{totalMRP - cartTotal}</Text>
          </Flex>

          <Flex marginBottom="2" justifyContent={"space-between"}>
            <Text>Shipping Charges:</Text>
            <Text color={"rgb(5,161,163)"}>FREE</Text>
          </Flex>

          <Divider />

          <Flex marginBottom="3" justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Payable Amount:</Text>
            <Text fontWeight={"bold"}>Rs.{cartTotal}</Text>
          </Flex>

          <Button
            color={"white"}
            _hover={{ bgColor: "rgb(5,161,163)" }}
            bgColor={"rgb(15,181,183)"}
            ml={"20%"}
          >
            Proceed to Pay
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default CartPage;
