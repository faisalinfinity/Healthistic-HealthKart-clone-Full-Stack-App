import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

const CheckoutPage = () => {
  return (
    <Box>
      <Box
        display={{ md: "flex" }}
        mt={"2rem"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10rem"}
        mb={"2rem"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          p={"1rem"}
          borderRadius={".5rem"}
        >
          <Flex gap={"1rem"}>
            <Input placeholder="Type Your Name" required={true} />
            <Input placeholder="Type Mobile No." required={true} />
          </Flex>
          <Textarea placeholder="Type Your Address" required={true} />
          <Flex gap={"1rem"}>
            <Input placeholder="Enter Landmark" required={true} />
            <Input placeholder="Enter Pincode" required={true} />
          </Flex>
          <Button>Save & Deliver</Button>
        </Box>
        <Box
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          p={"1rem"}
          borderRadius={".5rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
        >
          <Box>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Order Summary
            </Text>
          </Box>
          <Box>
            <Flex justifyContent={"space-between"} gap={"5rem"}>
              <Box>
                <Text>Total MRP</Text>
              </Box>
              <Box>₹4309</Box>
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent={"space-between"} gap={"5rem"}>
              <Box>
                <Text>Total Discounts</Text>
              </Box>
              <Box color={"green.300"}>₹234</Box>
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent={"space-between"} gap={"5rem"}>
              <Box>
                <Text>Shipping Charges</Text>
              </Box>
              <Box color={"green.300"}>FREE</Box>
            </Flex>
          </Box>
          <Divider></Divider>
          <Flex
            justifyContent={"space-between"}
            fontSize={"lg"}
            fontWeight={"semibold"}
            gap={"5rem"}
          >
            <Box>Payable Amount</Box>
            <Box>₹3456</Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
