import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const CheckoutPage = () => {
  const { items } = useSelector((store) => store.cartReducer);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  let cartTotal = 0;
  for (let i = 0; i < items.length; i++) {
    cartTotal += items[i].price * items[i].quantity;
  }

  let totalMRP = 0;
  for (let i = 0; i < items.length; i++) {
    totalMRP += items[i].originalPrice * items[i].quantity;
  }

  const handleAddtoOrder = (items) => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}`;

    let newItem = items.map((ele) => {
      return {
        image: ele.image,
        title: ele.title,
        description: ele.description,
        price: ele.price,
        originalPrice: ele.originalPrice,
        sizes: ele.sizes,
        status: "Order Placed",
        date: dateString,
        category: ele.category,
        rating: ele.rating,
        review: ele.review,
        flavour: ele.flavour,
        tags: ele.tags,
        brand: ele.brand,
        stock: ele.stock,
        adminId: ele.adminId,
        quantity: ele.quantity,
        pid: ele.pid,
        userId: ele.userId,
        address:
          name + " " + phone + " " + address + " " + landmark + " " + pincode,
        delivery: "5",
        payment: "dummy",
      };
    });
    console.log(newItem);
    localStorage.setItem("newItem",JSON.stringify(newItem))
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
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"2rem"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            p={"1rem"}
            borderRadius={".5rem"}
          >
            <Flex gap={"1rem"}>
              <Input
                placeholder="Type Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <Input
                placeholder="Type Mobile No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
              />
            </Flex>
            <Textarea
              placeholder="Type Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
            />
            <Flex gap={"1rem"}>
              <Input
                placeholder="Enter Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                required={true}
              />
              <Input
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required={true}
              />
            </Flex>
            <Button
              as={Link}
              onClick={() => handleAddtoOrder(items)}
              to="/payment"
            >
              Proceed to Pay
            </Button>
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
          </Box>
        </Box>
      </Box>
    );
  }
};

export default CheckoutPage;
