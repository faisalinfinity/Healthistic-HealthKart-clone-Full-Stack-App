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
  Spacer,
} from "@chakra-ui/react";
import React from "react";
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
  const handleDelete = () => {
    dispatch(deleteCartItem(_id)).then(handleChange);
  };
  const handleAdd = () => {
    quantity += 1;
    let data = {
      pid,
      _id,
      image,
      title,
      description,
      price,
      originalPrice,
      quantity,
    };
    dispatch(updateQuantity(data)).then(handleChange);
  };
  const handleReduce = () => {
    quantity -= 1;
    let data = {
      pid,
      _id,
      image,
      title,
      description,
      price,
      originalPrice,
      quantity,
    };
    dispatch(updateQuantity(data)).then(handleChange);
  };
  return (
    <Card
      key={pid}
      // direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      justifyContent={"space-between"}
    >
      <Flex>
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
          </CardBody>

          <CardFooter>
            <Flex alignItems="center">
              <Button onClick={handleReduce} size="xs">
                -
              </Button>
              <Text ml="5px" mr="5px">
                {quantity}
              </Text>
              <Button onClick={handleAdd} size="xs">
                +
              </Button>
            </Flex>
          </CardFooter>
        </VStack>
        <Spacer />
        <Button onClick={handleDelete} size="sm">
          <RiDeleteBin6Line />
        </Button>
      </Flex>
    </Card>
  );
};

export default CartCard;
