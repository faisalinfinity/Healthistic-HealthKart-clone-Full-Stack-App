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
  Box,
} from "@chakra-ui/react";
const CarouselThree = () => {
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
    "https://img5.hkrtcdn.com/24515/bnr_2451444_o.png",
    "https://img7.hkrtcdn.com/24515/bnr_2451446_o.png",
    "https://img9.hkrtcdn.com/24515/bnr_2451448_o.png",
    "https://img1.hkrtcdn.com/24515/bnr_2451450_o.png"
  ]
   
  return (
    
    <div style={{   width: "98vw", margin: "auto" , marginTop:"10px" }}>
      <div style={{width:"80%" , margin:"auto" , padding :"10px" }}    >

      <Heading size = "lg" >Bodybuilding Goals</Heading>
         
        </div>
      <div style={{  width: "80%", margin: "auto" }} >
      <Carousel responsive={responsive}>
        {cardItemArr.map((item, index) => (
          <Card maxW="sm" key={index}  mr={1} ml={1}   >
            <Image src={item} borderRadius="lg" />
            
          </Card>
        ))}
      </Carousel>
      </div>
    </div>
  
  );
};

export default CarouselThree;
