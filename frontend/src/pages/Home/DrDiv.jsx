import style from "./DrDiv.module.css";
import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const DrDiv = () => {
  return (
    <Box mt={10}>
      <Grid className={style.container}>
        <Box w={"98%"} h={"400px"} border={"1px solid red"}>
          <Flex
            borderRadius={"xl"}
            border={"1px solid blue"}
            margin={"auto"}
            w="98%"
            h="229px"
            bgColor={"#00B5B7"}
          >
            <Box>
              <Heading size="md" mt={6} ml ={4}>HK Premium</Heading>
              <Text mt = {3} ml={4} >
                Earn extra HK Cash & Enjoy more discounts and deals than anyone
                else!
              </Text>

              <Button mt = {5} ml={4} >Be a part now!</Button>
            </Box>
            <Box>
              <Image src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/subscribe.svg"></Image>
            </Box>
          </Flex>
          <Box border={"1px solid blue"}>
          <Flex
            borderRadius={"xl"}
            border={"1px solid blue"}
            margin={"auto"}
            w="98%"
            h="229px"
            bgColor={"#00B5B7"}
          >
            <Box>
              <Heading size="md" mt={6} ml ={4}>Refer & Earn</Heading>
              <Text mt = {3} ml={4} >
              Tell your friends to shop at HealthKart. They get Rs.200 off when they shop with us the 1st time & you get Rs. 200 off on your next order.
              </Text>
              <Button rightIcon={<HiArrowCircleRight/>}  colorScheme='teal' variant='outline'>
    Call us 
  </Button>
             
            </Box>
            <Box>
              <Image src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/boy-refer.svg"></Image>
            </Box>
          </Flex>
          </Box>
        </Box>
        <Box w={"98%"} h={"400px"} border={"1px solid blue"}>
        
        </Box>
      </Grid>
    </Box>
  );
};

export default DrDiv;
