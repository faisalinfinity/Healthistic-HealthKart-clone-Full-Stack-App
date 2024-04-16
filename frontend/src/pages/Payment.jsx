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
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import PayCard from "../components/PayCard";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, payforOrder } from "../redux/CheckoutReducer/action";
import { getCartData } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cartReducer);
  const [payment, setPayment] = useState("UPI");
  const toast = useToast();
  const { token, email, name } = useSelector((state) => state.authReducer);
  const form = useRef();
  let cartTotal = 0;

  for (let i = 0; i < items.length; i++) {
    cartTotal += items[i].price * items[i].quantity;
  }

  let totalMRP = 0;
  for (let i = 0; i < items.length; i++) {
    totalMRP += items[i].originalPrice * items[i].quantity;
  }

  const handleClick = () => {
    const item = JSON.parse(localStorage.getItem("newItem"))?.map((ele) => {
      return { ...ele, payment: payment };
    });
    dispatch(addToOrder(item)).then((res) => {
      toast({
        title: "Order Placed.",
        description: "Order will be delivered to your address within 5 days",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      axios
        .delete(`${BASE_URL}/users/cart/delete/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getCartData);
          sendEmail();
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        });
    });
    // dispatch(payforOrder());
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_njs4kp9",
        "template_sl7otrx",
        form.current,
        "Nq3b6kBd881QBgo2R"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (items) {
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
          {/* <Box
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
                  <Tab onClick={() => setPayment("UPI")}>Pay using UPI</Tab>
                  <Tab onClick={() => setPayment("Debit")}>Debit Card</Tab>
                  <Tab onClick={() => setPayment("Credit")}>Credit Card</Tab>
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
                        <Input placeholder="Enter UPI ID" isRequired />
                        <Button
                          p={"1em 1em"}
                          color={"white"}
                          _hover={{ bg: "orange" }}
                          bg={"#ff8913"}
                        >
                          Verify
                        </Button>
                      </Flex>
                      <Button w={"19rem"} onClick={() => handleClick()}>
                        Securely Pay
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <PayCard handleClick={handleClick} />
                  </TabPanel>
                  <TabPanel>
                    <PayCard handleClick={handleClick} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box> */}
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
                <Box>₹{totalMRP}</Box>
              </Flex>
            </Box>
            <Box>
              <Flex justifyContent={"space-between"} gap={"5rem"}>
                <Box>
                  <Text>Total Discounts</Text>
                </Box>
                <Box color={"green.300"}>₹{totalMRP - cartTotal}</Box>
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

            <Box>
              <Flex justifyContent={"space-between"} gap={"5rem"}>
                <Box>
                  <Text>Payment Mode</Text>
                </Box>
                <Box color={"gray.600"}>COD</Box>
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
              <Box>₹{totalMRP - (totalMRP - cartTotal)}</Box>
            </Flex>

            <Button  w={"19rem"} onClick={() => handleClick()}>
              Confirm Order
            </Button>
          </Box>
        </Box>
        <form style={{ display: "none" }} ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input value={name} type="text" name="user_name" />
          <label>Email</label>
          <input value={email} type="email" name="user_email" />
          <label>Message</label>
          <textarea
            value={`Your Order has been confirmed , it will be deliver in 5-7 days `}
            name="message"
          />
          <input type="submit" value="Send" />
        </form>
      </Box>
    );
  }
};

export default Payment;
