import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Card, Image, Heading } from "@chakra-ui/react";
const CarouselSix = () => {
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
    "https://img5.hkrtcdn.com/26593/bnr_2659274_o.jpg",
    "https://img9.hkrtcdn.com/22801/bnr_2280038_o.jpg",
    "https://img9.hkrtcdn.com/26434/bnr_2643348_o.jpg",
    "https://img1.hkrtcdn.com/26434/bnr_2643350_o.jpg",
  ];

  return (
    <div style={{ width: "98vw", margin: "auto", marginTop: "10px" }}>
      <div style={{ width: "80%", margin: "auto", padding: "10px" }}>
      
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <Carousel responsive={responsive}>
          {cardItemArr.map((item, index) => (
            <Card maxW="sm" key={index} mr={1} ml={1}>
              <Image src={item} borderRadius="lg" />
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSix;
