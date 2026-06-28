import React from "react";
import { Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container maxW="lg" py={{ base: 16, md: 28 }} textAlign="center">
    <Flex direction="column" align="center" gap={4}>
      <Heading
        fontSize={{ base: "6xl", md: "8xl" }}
        bgGradient="linear(to-r, brand.500, accent.500)"
        bgClip="text"
        color="transparent"
        lineHeight="1"
      >
        404
      </Heading>
      <Heading size="lg">Page not found</Heading>
      <Text color="ink.400" maxW="sm">
        The page you're looking for doesn't exist or may have been moved.
      </Text>
      <Button as={Link} to="/" size="lg" mt={2}>
        Back to Home
      </Button>
    </Flex>
  </Container>
);

export default NotFound;
