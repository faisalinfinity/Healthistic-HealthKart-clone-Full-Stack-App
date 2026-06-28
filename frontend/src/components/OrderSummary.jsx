import React from "react";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";

const Row = ({ label, children }) => (
  <Flex justify="space-between" fontSize="sm">
    <Text color="ink.500">{label}</Text>
    <Box>{children}</Box>
  </Flex>
);

const OrderSummary = ({ totalMRP = 0, cartTotal = 0, paymentMode, children }) => {
  const discount = totalMRP - cartTotal;
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      boxShadow="sm"
      p={6}
    >
      <Heading size="md" mb={4}>
        Order Summary
      </Heading>
      <Flex direction="column" gap={3}>
        <Row label="Total MRP">
          <Text fontWeight="600">₹{totalMRP}</Text>
        </Row>
        <Row label="Total Discount">
          <Text color="green.600" fontWeight="600">
            − ₹{discount}
          </Text>
        </Row>
        <Row label="Shipping Charges">
          <Text color="green.600" fontWeight="700">
            FREE
          </Text>
        </Row>
        {paymentMode && (
          <Row label="Payment Mode">
            <Text color="ink.600" fontWeight="600">
              {paymentMode}
            </Text>
          </Row>
        )}
      </Flex>
      <Divider my={4} />
      <Flex justify="space-between" align="center" mb={5}>
        <Text fontWeight="700" fontSize="lg" color="ink.800">
          Payable Amount
        </Text>
        <Text fontWeight="800" fontSize="lg" color="ink.800">
          ₹{cartTotal}
        </Text>
      </Flex>
      {children}
    </Box>
  );
};

export default OrderSummary;
