import {
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import OrderSummary from "../components/OrderSummary";
import { getCartData } from "../redux/CartReducer/action";
import Loading from "../admin/components/Loading";

const CartPage = () => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const { isLoading, isError, items } = useSelector((store) => ({
    isLoading: store.cartReducer.isLoading,
    isError: store.cartReducer.isError,
    items: store.cartReducer.items,
  }));

  const cartTotal = items.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
    0
  );
  const totalMRP = items.reduce(
    (sum, i) => sum + (Number(i.originalPrice) || 0) * (Number(i.quantity) || 1),
    0
  );

  const handleChange = () => setChange((c) => !c);

  useEffect(() => {
    dispatch(getCartData);
  }, [change, dispatch]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Container maxW="3xl" py={20} textAlign="center">
        <Heading size="md">Something went wrong</Heading>
        <Text color="ink.400" mt={2}>
          We couldn't load your cart. Please try again.
        </Text>
      </Container>
    );

  if (items.length === 0)
    return (
      <Container maxW="lg" py={{ base: 12, md: 20 }} textAlign="center">
        <Image
          m="auto"
          maxW="280px"
          src="https://static1.hkrtcdn.com/hknext/static/media/cart/empty-cart-new.svg"
          alt="Empty cart"
        />
        <Heading size="lg" mt={6}>
          Your cart feels light!
        </Heading>
        <Text color="ink.400" mt={2} mb={8}>
          There's nothing here yet. Let's find something good for you.
        </Text>
        <Button as={Link} to="/" size="lg">
          Continue Shopping
        </Button>
      </Container>
    );

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Heading size="lg" mb={6}>
        Shopping Cart{" "}
        <Text as="span" fontSize="md" color="ink.400" fontWeight="500">
          ({items.length} {items.length === 1 ? "item" : "items"})
        </Text>
      </Heading>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap={8} alignItems="start">
        <GridItem minW={0}>
          {items.map((item) => (
            <CartCard handleChange={handleChange} key={item._id || item.pid} {...item} />
          ))}
        </GridItem>

        <GridItem position={{ lg: "sticky" }} top="120px">
          <OrderSummary totalMRP={totalMRP} cartTotal={cartTotal}>
            <Button as={Link} to="/checkout" w="full" size="lg">
              Proceed to Checkout
            </Button>
          </OrderSummary>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CartPage;
