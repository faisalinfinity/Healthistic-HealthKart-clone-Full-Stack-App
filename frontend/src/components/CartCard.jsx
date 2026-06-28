import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Flex,
  HStack,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateQuantity } from "../redux/CartReducer/action";

const CartCard = ({
  pid,
  _id,
  image,
  title,
  description,
  price,
  originalPrice,
  quantity,
  handleChange,
}) => {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  const run = (action) => {
    setBusy(true);
    Promise.resolve(dispatch(action))
      .then(handleChange)
      .finally(() => setBusy(false));
  };

  const handleDelete = () => run(deleteCartItem(_id));

  const updateQty = (nextQty) =>
    run(
      updateQuantity({
        pid,
        _id,
        image,
        title,
        description,
        price,
        originalPrice,
        quantity: nextQty,
      })
    );

  const lineTotal = (Number(price) || 0) * (Number(quantity) || 1);

  return (
    <Flex
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      overflow="hidden"
      mb={4}
      direction={{ base: "column", sm: "row" }}
    >
      <Flex
        align="center"
        justify="center"
        bg="paper"
        p={4}
        w={{ base: "100%", sm: "150px" }}
        flexShrink={0}
      >
        <Image
          src={Array.isArray(image) ? image[0] : image}
          alt={title}
          maxH="120px"
          objectFit="contain"
        />
      </Flex>

      <Flex flex="1" p={4} direction="column" justify="space-between" gap={3}>
        <Flex justify="space-between" gap={3} align="flex-start">
          <Box>
            <Heading size="sm" noOfLines={2} color="ink.700">
              {title}
            </Heading>
            <HStack mt={1} spacing={2} align="baseline">
              <Text fontWeight="700" color="ink.800">
                ₹{price}
              </Text>
              {originalPrice > price && (
                <Text fontSize="sm" color="ink.300" textDecoration="line-through">
                  ₹{originalPrice}
                </Text>
              )}
            </HStack>
          </Box>
          <IconButton
            aria-label="Remove item"
            icon={<RiDeleteBin6Line />}
            variant="ghost"
            color="red.400"
            size="sm"
            isLoading={busy}
            _hover={{ bg: "red.50", color: "red.500" }}
            onClick={handleDelete}
          />
        </Flex>

        <Flex justify="space-between" align="center">
          <HStack
            spacing={0}
            borderWidth="1px"
            borderColor="blackAlpha.200"
            borderRadius="lg"
            overflow="hidden"
          >
            <Button
              variant="ghost"
              borderRadius="0"
              size="sm"
              isDisabled={quantity <= 1 || busy}
              onClick={() => updateQty(quantity - 1)}
            >
              −
            </Button>
            <Text px={4} fontWeight="700" minW="44px" textAlign="center">
              {quantity}
            </Text>
            <Button
              variant="ghost"
              borderRadius="0"
              size="sm"
              isDisabled={busy}
              onClick={() => updateQty(quantity + 1)}
            >
              +
            </Button>
          </HStack>

          <Badge variant="subtle" colorScheme="brand" fontSize="sm" px={2} py={1}>
            ₹{lineTotal}
          </Badge>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartCard;
