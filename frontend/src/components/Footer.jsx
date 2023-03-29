import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import { HiMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import React from "react";

const Footer = () => {
  return (
    <Box bg={"#0d2122"} color={"whiteAlpha.700"}>
      <Box p={"2rem"}>
        <Box
          display={{ base: "flex", sm: "flex", md: "flex" }}
          flexDirection={{ base: "column", sm: "row", md: "row" }}
          justifyContent={{ base: "center" }}
          gap={"5rem"}
        >
          <SimpleGrid columns={{ base: "2", sm: "3", md: "5" }} spacing={20}>
            <Box
              cursor={"pointer"}
              display={"flex"}
              flexDirection={"column"}
              gap={".5rem"}
            >
              <Box color={"white"}>Healthistic</Box>
              <Box>About Us</Box>
              <Box>Contact Us</Box>
              <Box>Refer & Earn</Box>
              <Box>Loyalty Program</Box>
            </Box>
            <Box
              cursor={"pointer"}
              display={"flex"}
              flexDirection={"column"}
              gap={".5rem"}
            >
              <Box color={"white"}>Brands</Box>
              <Box>MuscleBlaze</Box>
              <Box>Fit Foods</Box>
              <Box>HK Vitals</Box>
              <Box>TrueBasics</Box>
              <Box>Gritzo</Box>
              <Box>bGREEN</Box>
            </Box>
            <Box
              cursor={"pointer"}
              display={"flex"}
              flexDirection={"column"}
              gap={".5rem"}
            >
              <Box color={"white"}>Health & Fitness</Box>
              <Box>Hair & Skin Care</Box>
              <Box>Sports Nutrition</Box>
              <Box>Vitamins & Supplements</Box>
              <Box>Ayurveda & Herbs</Box>
              <Box>Health Food & Drinks</Box>
            </Box>
            <Box
              cursor={"pointer"}
              display={"flex"}
              flexDirection={"column"}
              gap={".5rem"}
            >
              <Box color={"white"}>Quick Links</Box>
              <Box>My Account</Box>
              <Box>Track Your Order</Box>
              <Box>Store Locator</Box>
              <Box>HI Cash</Box>
              <Box>FAQs</Box>
              <Box>Sell On HealthKart</Box>
            </Box>
            <Box
              cursor={"pointer"}
              display={"flex"}
              flexDirection={"column"}
              gap={".5rem"}
            >
              <Box color={"white"}>Contact Us</Box>
              <Box display={"flex"} alignItems={"center"} gap={".2rem"}>
                <HiMail />
                care@healthistic.com
              </Box>
              <Box
                display={"flex"}
                cursor={"pointer"}
                alignItems={"center"}
                gap={".2rem"}
              >
                <BsFillTelephoneFill />
                0124-4616444
              </Box>
              <Box display={"flex"} gap={".2rem"}>
                {" "}
                <Box>
                  <MdLocationOn size={"1.3rem"} />
                </Box>
                <Box>
                  The Presidency
                  <br /> Tower, Tower-B,
                  <br /> 2nd Floor,
                  <br /> 46/4, Mehrauli
                  <br /> Rd opp.
                  <br />
                  government girls
                  <br /> college,
                  <br /> Anamika Enclave,
                  <br /> Sector 14,
                  <br /> Gurugram, Haryana
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Divider></Divider>
      <Box display={{ md: "flex" }} p={"2rem"} justifyContent={"space-between"}>
        <Box>Copyright © 2023, HealthIstic.com, or its affiliates</Box>
        <Box display={{ md: "flex" }} mt={{ base: "2rem" }} gap={"1rem"}>
          <Box>Terms & Conditions</Box>
          <Box>Delivery Policy</Box>
          <Box>Privacy Policy</Box>
          <Box>Disclaimer</Box>
          <Box>Returns Policy</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
