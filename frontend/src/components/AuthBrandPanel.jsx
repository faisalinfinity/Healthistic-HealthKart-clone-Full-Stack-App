import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const AuthBrandPanel = ({
  title = "Your wellness, delivered with trust.",
  points = [
    "100% authentic, lab-tested products",
    "Free shipping on every order",
    "Personalised nutrition guidance",
  ],
}) => (
  <Flex
    display={{ base: "none", lg: "flex" }}
    flex="1"
    direction="column"
    justify="space-between"
    bgGradient="linear(to-br, brand.700, brand.500)"
    color="white"
    p={12}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="-80px"
      right="-80px"
      boxSize="280px"
      borderRadius="full"
      bg="whiteAlpha.100"
    />
    <Box
      position="absolute"
      bottom="-120px"
      left="-60px"
      boxSize="320px"
      borderRadius="full"
      bg="whiteAlpha.100"
    />
    <Heading fontSize="2xl" letterSpacing="-0.03em" zIndex={1} color="white">
      Healthistic
    </Heading>
    <Box zIndex={1}>
      <Heading fontSize="4xl" lineHeight="1.1" mb={6} color="white">
        {title}
      </Heading>
      <List spacing={3} fontSize="md" color="whiteAlpha.900">
        {points.map((t) => (
          <ListItem key={t}>
            <ListIcon as={CheckCircleIcon} color="accent.300" />
            {t}
          </ListItem>
        ))}
      </List>
    </Box>
    <Text fontSize="sm" color="whiteAlpha.700" zIndex={1}>
      Trusted by thousands of fitness enthusiasts across India.
    </Text>
  </Flex>
);

export default AuthBrandPanel;
