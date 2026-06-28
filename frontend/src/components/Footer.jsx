import {
  Box,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  HStack,
  Flex,
  Link as CLink,
} from "@chakra-ui/react";
import { HiMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { CATEGORIES } from "../constants/categories";

const FooterColumn = ({ title, children }) => (
  <Stack spacing={3}>
    <Heading
      as="h4"
      size="xs"
      color="white"
      textTransform="uppercase"
      letterSpacing="0.08em"
      fontWeight="700"
    >
      {title}
    </Heading>
    {children}
  </Stack>
);

const FooterLink = ({ to, children }) => (
  <CLink
    as={to ? Link : undefined}
    to={to}
    color="whiteAlpha.700"
    fontSize="sm"
    fontWeight="400"
    _hover={{ color: "brand.300" }}
  >
    {children}
  </CLink>
);

const Footer = () => {
  return (
    <Box as="footer" bg="ink.800" color="whiteAlpha.700" mt="auto">
      <Container maxW="7xl" py={{ base: 10, md: 14 }}>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 5 }}
          spacing={{ base: 8, md: 10 }}
        >
          <FooterColumn title="Healthistic">
            <FooterLink>About Us</FooterLink>
            <FooterLink>Contact Us</FooterLink>
            <FooterLink>Refer & Earn</FooterLink>
            <FooterLink>Loyalty Program</FooterLink>
          </FooterColumn>

          <FooterColumn title="Brands">
            <FooterLink>MuscleBlaze</FooterLink>
            <FooterLink>Fit Foods</FooterLink>
            <FooterLink>HK Vitals</FooterLink>
            <FooterLink>TrueBasics</FooterLink>
            <FooterLink>Gritzo</FooterLink>
          </FooterColumn>

          <FooterColumn title="Shop">
            {CATEGORIES.map((c) => (
              <FooterLink key={c.to} to={c.to}>
                {c.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <FooterLink to="/profile">My Account</FooterLink>
            <FooterLink to="/profile">Track Your Order</FooterLink>
            <FooterLink>Store Locator</FooterLink>
            <FooterLink>HI Cash</FooterLink>
            <FooterLink>FAQs</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <HStack align="start" spacing={2} fontSize="sm">
              <Box as={HiMail} mt={1} flexShrink={0} />
              <Text>care@healthistic.com</Text>
            </HStack>
            <HStack align="start" spacing={2} fontSize="sm">
              <Box as={BsFillTelephoneFill} mt={1} flexShrink={0} />
              <Text>0124-4616444</Text>
            </HStack>
            <HStack align="start" spacing={2} fontSize="sm">
              <Box as={MdLocationOn} mt={1} flexShrink={0} fontSize="lg" />
              <Text>
                The Presidency Tower-B, 2nd Floor, Sector 14, Gurugram, Haryana
              </Text>
            </HStack>
          </FooterColumn>
        </SimpleGrid>
      </Container>

      <Divider borderColor="whiteAlpha.200" />

      <Container maxW="7xl" py={5}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Text fontSize="sm" color="whiteAlpha.600">
            © {new Date().getFullYear()} Healthistic.com — All rights reserved.
          </Text>

          <HStack
            spacing={5}
            fontSize="xs"
            color="whiteAlpha.600"
            display={{ base: "none", md: "flex" }}
          >
            <FooterLink>Terms</FooterLink>
            <FooterLink>Privacy</FooterLink>
            <FooterLink>Returns</FooterLink>
            <FooterLink>Disclaimer</FooterLink>
          </HStack>

          <HStack spacing={2}>
            {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Ico, i) => (
              <Flex
                key={i}
                as="a"
                href="#"
                boxSize={9}
                align="center"
                justify="center"
                borderRadius="full"
                bg="whiteAlpha.100"
                color="whiteAlpha.800"
                _hover={{ bg: "brand.500", color: "white" }}
                transition="all 0.2s"
              >
                <Ico size="0.95rem" />
              </Flex>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
