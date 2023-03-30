import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const CartCard = ({
  image,
  title,
  description,
  price,
  originalPrice,
  quantity,
}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={image}
        alt={title}
      />

      <VStack>
        <CardBody>
          <Heading size="sm">{title}</Heading>
          <Text py="2">{description}</Text>
          <Heading size="md">Rs.{price}</Heading>
          <Flex>
            <Text>MRP:</Text>
            <Text textDecoration={"line-through"}>{originalPrice}</Text>
          </Flex>
          <Flex>
            <Text>Quantity:</Text>
            <Text>{quantity}</Text>
          </Flex>
        </CardBody>

        {/* <CardFooter> */}
        {/* <Button variant="solid" colorScheme="blue">
            {quantity}
          </Button> */}
        {/* </CardFooter> */}
      </VStack>
    </Card>
  );
};

export default CartCard;
