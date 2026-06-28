import React from "react";
import {
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const PaymentSuccess = () => {
  return (
    <Container maxW="lg" py={{ base: 16, md: 24 }} textAlign="center">
      <Flex direction="column" align="center" gap={5}>
        <Flex
          boxSize="88px"
          align="center"
          justify="center"
          borderRadius="full"
          bg="green.50"
          color="green.500"
        >
          <Icon as={MdCheckCircle} boxSize="56px" />
        </Flex>
        <Heading size="lg">Payment Successful</Heading>
        <Text color="ink.400" maxW="sm">
          Thank you for your order! A confirmation has been sent to your email.
          Your items will be delivered within 5–7 days.
        </Text>
        <HStack spacing={3} mt={2}>
          <Button as={Link} to="/profile" size="lg">
            View My Orders
          </Button>
          <Button as={Link} to="/" size="lg" variant="outline">
            Continue Shopping
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default PaymentSuccess;
