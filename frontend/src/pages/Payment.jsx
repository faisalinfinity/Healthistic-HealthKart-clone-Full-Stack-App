import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import PayCard from "../components/PayCard";
import { useDispatch } from "react-redux";

const Payment = () => {
  // const dispatch = useDisptach();
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
          gap={"1rem"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          p={"1rem"}
          borderRadius={".5rem"}
        >
          <Box fontSize={"lg"} fontWeight={"semibold"}>
            Payment Method
          </Box>
          <Box>
            <Tabs>
              <TabList>
                <Tab>Pay using UPI</Tab>
                <Tab>Debit Card</Tab>
                <Tab>Credit Card</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"1rem"}
                    p={"1rem"}
                    borderRadius={".5rem"}
                  >
                    <Text fontSize={"md"} fontWeight={"normal"}>
                      Add a new UPI
                    </Text>
                    You need to have a registered UPI ID
                    <Flex gap={"1rem"}>
                      <Input placeholder="Enter UPI ID" required={true} />
                      <Button
                        p={"1em 1em"}
                        color={"white"}
                        _hover={{ bg: "orange" }}
                        bg={"#ff8913"}
                      >
                        Verify
                      </Button>
                    </Flex>
                    <Button w={"19rem"} onClick>Securely Pay</Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <PayCard />
                </TabPanel>
                <TabPanel>
                  <PayCard />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
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

export default Payment;
