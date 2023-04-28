import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";

const SingleProductPage = () => {
  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);
  const [pic, setPic] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const toast = useToast();
  const { id } = params;
  const { token } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setItem(res.data);
          setImages(res.data.image);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddtoCart = ({
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
    _id,
    userId,
    quantity,
  }) => {
    dispatch(
      addToCart({
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
        pid: _id,
        userId,
        quantity: 1,
      })
    ).then((res) => {
      if (res === "Item Already exist in the Cart") {
        toast({
          title: "Item Already exist in the Cart",
          description: "",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "item added.",
          description: "Item added to your cart",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  if (item.title)
    return (
      <Box>
        <Box
          display={{ base: "flex", md: "flex" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          mt={"2rem"}
          justifyContent={"center"}
        >
          <Box
            display={{ base: "flex", sm: "flex", md: "flex" }}
            flexDirection={{ md: "column" }}
            gap={"1rem"}
            mb={{ base: "2rem" }}
            w={{ md: "10%" }}
          >
            {item && (
              <>
                <Image
                  w={{ base: "10%", md: "50%" }}
                  onClick={() => setPic(0)}
                  src={item && images[0]}
                />
                <Image
                  w={{ base: "10%", md: "50%" }}
                  onClick={() => setPic(1)}
                  src={item && images[1]}
                />
                <Image
                  w={{ base: "10%", md: "50%" }}
                  onClick={() => setPic(2)}
                  src={item && images[2]}
                />
              </>
            )}
          </Box>
          <Box w={{ base: "80%", md: "40%" }}>
            <Image w={"80%"} src={item && images[pic]} />
          </Box>
          <Box
            w={{ base: "80%", md: "40%" }}
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
          >
            <Box color={"green.300"}>{item?.tags}</Box>
            <Box>
              <Heading fontSize={"2xl"}>{item?.title}</Heading>
            </Box>
            <Box>By {item?.brand}</Box>
            <Flex>
              MRP:{" "}
              <Text textDecoration={"line-through"}>
                ₹{item?.originalPrice}
              </Text>
            </Flex>
            <Box>Price: ₹{item.price}</Box>
            <Box display={{ md: "flex" }} gap={"1rem"}>
              <Box
                mt={{ base: "2rem", md: "0" }}
                display={{ base: "flex" }}
                gap={"1rem"}
              >
                <Button
                  bg={"orange.50"}
                  color={"#ff8913"}
                  border={"1px solid orange"}
                  onClick={() => {
                    if (token) {
                      handleAddtoCart(item);
                    } else {
                      toast({
                        title: "Please Login First",
                        description: "",
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  p={"1em 1em"}
                  color={"white"}
                  _hover={{ bg: "orange" }}
                  bg={"#ff8913"}
                >
                  Quick Buy
                </Button>
              </Box>
            </Box>
            <Box>
              <Text fontSize={"lg"} fontWeight={"semibold"}>
                Weight
              </Text>
            </Box>
            <Box>
              <Button
                color={"#ff8913"}
                border={"1px solid orange"}
                _hover={{ bg: "orange.30" }}
                bg={"orange.30"}
              >
                {item && item?.sizes[0]}
              </Button>
            </Box>
            <Box>
              <Text fontSize={"lg"} fontWeight={"semibold"}>
                Flavour
              </Text>
            </Box>
            <Box>
              <Button
                color={"#ff8913"}
                border={"1px solid orange"}
                _hover={{ bg: "orange.30" }}
                bg={"orange.30"}
              >
                {item?.flavour}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          w={{ base: "80%", lg: "50%" }}
          ml={{ base: "2rem", lg: "35rem" }}
          mt={"2rem"}
          gap={"2rem"}
          alignItems={"center"}
          flexDirection={"column"}
          mb={"2rem"}
        >
          <Box>
            <Heading>Product Details</Heading>
          </Box>
          <Box
            p={"3rem"}
            borderRadius={"1em"}
            bg={"gray.100"}
            lineHeight={"2rem"}
          >
            {item?.description}
          </Box>
        </Box>
      </Box>
    );
};

export default SingleProductPage;
