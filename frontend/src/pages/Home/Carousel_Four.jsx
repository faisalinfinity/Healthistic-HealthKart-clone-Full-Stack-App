import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
 
import { addToCart } from "../../redux/CartReducer/action";

const CarouselFour = ({ ayurveda }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleAddtoCart = async ({
    image,
    title,
    description,
    price,
    originalPrice,
    sizes,
    category,
    rating,
    review,
    flavour,
    brand,
    tags,
    stock,
    adminId,
    pid,
    quantity,
  }) => {
    console.log(price)
    // addToCart();
  };

  return (
    <div style={{ width: "98vw", margin: "auto", marginTop: "10px" }}>
      <Flex w={"80%"} margin={"auto"} p={3} justifyContent={"space-between"}>
        <Heading size="lg">Wellness Range</Heading>
      </Flex>
      <div style={{ width: "80%", margin: "auto" }}>
        <Carousel responsive={responsive}>
          {ayurveda.map((item, index) => (
            <Card maxW="sm" key={index} mr={1} ml={1}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Image
                  w={"100px"}
                  h={"150px"}
                  display={"block"}
                  src={item.image[0]}
                  borderRadius="lg"
                />
              </Flex>
              <Stack p="6" h={210} bg="white">
                <Flex gap={4} textAlign={"center"}>
                  <Box bg={"#00B5B7"} color={"white"} pl={3} pr={3}>
                    {item.rating} <span style={{ fontSize: "20px" }}>*</span>
                  </Box>
                  <Text fontSize={12}>{item.review} reviews</Text>
                </Flex>
                <Heading size="sm">
                  {item.title},{item.sizes},{item.flavour}
                </Heading>
                <Flex gap={2} alignItems={"center"}>
                  <Heading fontSize="2xl">₹450 </Heading>{" "}
                  <Text color="gray" textDecoration={"line-through"}>
                    ₹{item.originalPrice}
                  </Text>
                  <Text color="green.600" fontSize="14">
                    {Math.floor(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100
                    )}
                    % Off
                  </Text>
                </Flex>
              </Stack>
              <Button
                onClick={() => handleAddtoCart(item)}
                w={"95%"}
                margin="auto"
                mb="3"
                boxShadow="lg"
                p="6"
                bg="white"
                _hover={{ bg: "orange", color: "white" }}
                colorScheme="orange"
                variant="outline"
              >
                Add to cart
              </Button>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselFour;
