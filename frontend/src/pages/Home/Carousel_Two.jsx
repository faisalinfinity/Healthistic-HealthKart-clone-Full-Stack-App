import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Center,
  Box
} from "@chakra-ui/react";
const CarouselTwo = () => {
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

  const cardItemArr = [
    {
      image:
        "https://img7.hkrtcdn.com/25501/prd_2550006-MB-Fuel-One-Sports-Protein-0.88-lb-Chocolate_o.jpg",
      title: "MB Fuel One Sports Protein",
      description: "MB Fuel One Sports Protein, 400 g (0.88 lb), Chocolate",
      price: 599,
      originalPrice: 799,
      sizes: "0.88Lb",
      category: "Protein for Sportsperson",
      rating: 4.8,
      review: 455,
      flavour: "Chocolate",
      brand: "Healthistic",
      tags: "Protein for Sportsperson",
      stock: 300,
    },
    {
      image:
        "https://img7.hkrtcdn.com/25501/prd_2550006-MB-Fuel-One-Sports-Protein-0.88-lb-Chocolate_o.jpg",
      title: "MB Fuel One Sports Protein",
      description: "MB Fuel One Sports Protein, 400 g (0.88 lb), Chocolate",
      price: 599,
      originalPrice: 799,
      sizes: "0.88Lb",
      category: "Protein for Sportsperson",
      rating: 4.8,
      review: 455,
      flavour: "Chocolate",
      brand: "Healthistic",
      tags: "Protein for Sportsperson",
      stock: 300,
    },
    {
      image:
        "https://img7.hkrtcdn.com/25501/prd_2550006-MB-Fuel-One-Sports-Protein-0.88-lb-Chocolate_o.jpg",
      title: "MB Fuel One Sports Protein",
      description: "MB Fuel One Sports Protein, 400 g (0.88 lb), Chocolate",
      price: 599,
      originalPrice: 799,
      sizes: "0.88Lb",
      category: "Protein for Sportsperson",
      rating: 4.8,
      review: 455,
      flavour: "Chocolate",
      brand: "Healthistic",
      tags: "Protein for Sportsperson",
      stock: 300,
    },
    {
      image:
        "https://img7.hkrtcdn.com/25501/prd_2550006-MB-Fuel-One-Sports-Protein-0.88-lb-Chocolate_o.jpg",
      title: "MB Fuel One Sports Protein",
      description: "MB Fuel One Sports Protein, 400 g (0.88 lb), Chocolate",
      price: 599,
      originalPrice: 799,
      sizes: "0.88Lb",
      category: "Protein for Sportsperson",
      rating: 4.8,
      review: 455,
      flavour: "Chocolate",
      brand: "Healthistic",
      tags: "Protein for Sportsperson",
      stock: 300,
    },
    {
      image:
        "https://img7.hkrtcdn.com/25501/prd_2550006-MB-Fuel-One-Sports-Protein-0.88-lb-Chocolate_o.jpg",
      title: "MuscleBlaze Raw Whey Protein ",
      description: "MB Fuel One Sports Protein, 400 g (0.88 lb), Chocolate",
      price: 599,
      originalPrice: 799,
      sizes: "0.88Lb",
      category: "Protein for Sportsperson",
      rating: 4.8,
      review: 455,
      flavour: "Chocolate",
      brand: "Healthistic",
      tags: "Protein for Sportsperson",
      stock: 300,
    },
  ];

  return (
    
    <div style={{ width: "98vw", margin: "auto" , marginTop:"10px" }}>
      <Flex w={"80%"}  margin={"auto"} p={3}  justifyContent={"space-between"} >

      <Heading size = "lg" >Best Price Zone</Heading>
      <Text color={"#42B8B7"} >View All</Text>    
        </Flex>
      <div style={{   width: "80%", margin: "auto" }} >
      <Carousel responsive={responsive}>
        {cardItemArr.map((item, index) => (
          <Card maxW="sm" key={index} mr={1} ml={1}   >
            <Image src={item.image} borderRadius="lg" />
            <Stack boxShadow='dark-lg' p='6' rounded='md' bg='white'>
            <Flex gap = {4} textAlign={"center"} >
                    <Box bg={"#00B5B7"} color={"white"} pl={3} pr ={3} >{item.rating} <span style={{fontSize:"20px"}} >*</span></Box>
                    <Text fontSize={12} >{item.review} reviews</Text>
                </Flex>
              <Heading size="sm">
                {item.title},{item.sizes},{item.flavour}
              </Heading>
              <Flex gap={2} alignItems={"center"} >
                <Heading fontSize="2xl">₹450 </Heading>{" "}
                <Text color="gray" textDecoration={"line-through"}>
                  ₹{item.originalPrice}
                </Text>
                <Text color="green.600" fontSize="14" >
                {Math.floor(((item.originalPrice-item.price)/item.originalPrice)*100)}% Off
                </Text>
                
              </Flex>

              <Button _hover= {{bg:"orange" , color:"white"}} colorScheme="orange" variant="outline">
                Add to cart
              </Button>
            </Stack>
          </Card>
        ))}
      </Carousel>
      </div>
    </div>
  
  );
};

export default CarouselTwo;
