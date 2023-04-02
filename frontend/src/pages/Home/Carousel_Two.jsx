import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  Flex,
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  useToast
} from "@chakra-ui/react";
 
import { addToCart } from "../../redux/CartReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CarouselTwo = ({vitamin}) => {


   const toast = useToast()

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
  const {isLoggedIn}=useSelector((s)=>s.authReducer)
  const dispatch = useDispatch()
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
    if(isLoggedIn){
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
      )
      .then((res)=>{
       
        if(res==="Item Already exist in the Cart"){
          toast({
            title: "Item Already exist in the Cart",
            description: "",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }else{
          toast({
            title: "item added.",
            description: "Item added to your cart",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
  
        }
      })
    }else{
      toast({
        title: "Please Login First.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
   
  };

  return (
    <div style={{ width: "98vw", margin: "auto", marginTop: "10px" }}>
      <Flex w={"80%"} margin={"auto"} p={3} justifyContent={"space-between"}>
        <Heading size="lg">Best Price Zone</Heading>
        <Text color={"#42B8B7"}>View All</Text>
      </Flex>
      <div style={{ width: "80%", margin: "auto" }}>
        <Carousel responsive={responsive}>
          {vitamin.map((item, index) => (
            <Card maxW="sm" key={index} mr={1} ml={1}>
              <Flex alignItems={"center"} justifyContent={"center"} >
              <Link to={`product/${item._id}`} ><Image
                  
                  
                  w={"100px"}
                  h={"150px"}
                  display={"block"}
                  src={item.image[0]}
                  borderRadius="lg"
                /></Link>
             </Flex>
              <Stack   p="6"  h={"210"} bg="white">
                <Flex gap={4} textAlign={"center"}>
                  <Box bg={"#00B5B7"} color={"white"} pl={3} pr={3}>
                    {item.rating} <span style={{ fontSize: "20px" }}>*</span>
                  </Box>
                  <Text fontSize={12}>{item.review} reviews</Text>
                </Flex>
                <Heading size="sm">
                  {item.title},{item.flavour}
                </Heading>
                <Flex gap={2} alignItems={"center"}>
                  <Heading fontSize="2xl">₹{item.price} </Heading>{" "}
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
              onClick={()=>handleAddtoCart(item)}
                w={"95%"}
                margin="auto"
                mb="3"
                 boxShadow='lg' p='6' bg='white'
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

export default CarouselTwo;
