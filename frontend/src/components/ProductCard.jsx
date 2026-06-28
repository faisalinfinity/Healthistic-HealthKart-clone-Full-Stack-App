import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useAddToCart } from "../hooks/useAddToCart";

const ProductCard = ({ item }) => {
  const addToCart = useAddToCart();
  const [isAdding, setIsAdding] = useState(false);

  const price = Number(item.price) || 0;
  const original = Number(item.originalPrice) || 0;
  const discount =
    original > price ? Math.round(((original - price) / original) * 100) : 0;

  const handleAdd = () => {
    setIsAdding(true);
    Promise.resolve(addToCart(item)).finally(() => setIsAdding(false));
  };

  return (
    <Flex
      direction="column"
      h="100%"
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      overflow="hidden"
      transition="all 0.25s ease"
      role="group"
      _hover={{ boxShadow: "md", transform: "translateY(-4px)", borderColor: "brand.200" }}
    >
      <Box position="relative" as={Link} to={`/product/${item._id}`}>
        {discount > 0 && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            bg="accent.500"
            color="white"
            zIndex={1}
            fontSize="xs"
          >
            {discount}% OFF
          </Badge>
        )}
        <Flex
          align="center"
          justify="center"
          bg="paper"
          h="180px"
          p={4}
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scale(1.04)" }}
        >
          <Image
            src={item.image?.[0]}
            alt={item.title}
            maxH="100%"
            objectFit="contain"
          />
        </Flex>
      </Box>

      <Flex direction="column" flex="1" p={4} gap={2}>
        <HStack spacing={2}>
          <HStack
            spacing={1}
            bg="brand.500"
            color="white"
            px={2}
            py={0.5}
            borderRadius="md"
            fontSize="xs"
            fontWeight="700"
          >
            <Text>{item.rating || "4.5"}</Text>
            <Icon as={AiFillStar} boxSize="2.5" />
          </HStack>
          {item.review != null && (
            <Text fontSize="xs" color="ink.300">
              {item.review} reviews
            </Text>
          )}
        </HStack>

        <Heading
          as={Link}
          to={`/product/${item._id}`}
          size="sm"
          noOfLines={2}
          minH="2.5em"
          color="ink.700"
          _hover={{ color: "brand.600" }}
        >
          {item.title}
          {item.flavour ? `, ${item.flavour}` : ""}
        </Heading>

        <Flex align="baseline" gap={2} wrap="wrap" mt="auto">
          <Heading size="md" color="ink.800">
            ₹{price}
          </Heading>
          {original > price && (
            <Text fontSize="sm" color="ink.300" textDecoration="line-through">
              ₹{original}
            </Text>
          )}
          {discount > 0 && (
            <Text fontSize="sm" color="green.600" fontWeight="700">
              {discount}% off
            </Text>
          )}
        </Flex>

        <Button
          mt={2}
          variant="outline"
          colorScheme="orange"
          borderColor="accent.400"
          color="accent.600"
          _hover={{ bg: "accent.500", color: "white", borderColor: "accent.500" }}
          isLoading={isAdding}
          onClick={handleAdd}
        >
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
