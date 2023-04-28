import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import { getCartData } from "../redux/CartReducer/action";
import Loading from "../admin/components/Loading";

const CartPage = () => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const { isLoading, isError, items } = useSelector((store) => {
    return {
      isLoading: store.cartReducer.isLoading,
      isError: store.cartReducer.isError,
      items: store.cartReducer.items,
    };
  });

  let cartTotal = 0;
  for (let i = 0; i < items.length; i++) {
    cartTotal += items[i].price * items[i].quantity;
  }
  let totalMRP = 0;
  for (let i = 0; i < items.length; i++) {
    totalMRP += items[i].originalPrice * items[i].quantity;
  }
  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    dispatch(getCartData);
  }, [change]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Heading>Something went wrong..</Heading>
  ) : items.length === 0 ? (
    <Box
      m="auto"
      mt="50px"
      mb="100px"
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        m="auto"
        src="https://static1.hkrtcdn.com/hknext/static/media/cart/empty-cart-new.svg"
      />
      <Text fontWeight={"bold"}>Hey, it feels so light!</Text>
      <Text mb="30px">There is nothing in you bag. Let’s add some items.</Text>
      <Link to="/">
        <Button
          color={"white"}
          _hover={{ bgColor: "rgb(5,161,163)" }}
          bgColor={"rgb(15,181,183)"}
        >
          Continue Shopping
        </Button>
      </Link>
    </Box>
  ) : (
    <div>
      <Flex
        direction={{ base: "column", md: "row" }}
        w={{ base: "95%", md: "85%", lg: "70%" }}
        m="auto"
      >
        <Box p="20px" w={{ base: "90%", md: "70%" }}>
          <Heading>Shopping Cart</Heading>
          <Box p="50px">
            {items.map((item) => (
              <CartCard handleChange={handleChange} key={item.pid} {...item} />
            ))}
          </Box>
        </Box>
        <Box
          mt="5%"
          p="1%"
          w={{ base: "90%", md: "27%" }}
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
            as={Link}
            to={"/checkout"}
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
