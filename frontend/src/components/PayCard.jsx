import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import React from "react";

const PayCard = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
      p={"1rem"}
      borderRadius={".5rem"}
    >
      Add a new Card
      <Input placeholder="Please enter name on card" />
      <Input placeholder="3290xxxxxx4390" />
      <Flex gap={".5rem"}>
        <Select placeholder="Expirry MM">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </Select>
        <Select placeholder="Expirry YY">
          <option value="1">2023</option>
          <option value="1">2024</option>
          <option value="1">2025</option>
          <option value="1">2026</option>
          <option value="1">2027</option>
          <option value="1">2028</option>
          <option value="1">2029</option>
          <option value="1">2030</option>
          <option value="1">2031</option>
          <option value="1">2032</option>
          <option value="1">2033</option>
          <option value="1">2034</option>
          <option value="1">2035</option>
          <option value="1">2036</option>
        </Select>
        <Input w={"7rem"} placeholder="CVV" />
      </Flex>
        <Button w={"19rem"}>Securely Pay</Button>
    </Box>
  );
};

export default PayCard;
