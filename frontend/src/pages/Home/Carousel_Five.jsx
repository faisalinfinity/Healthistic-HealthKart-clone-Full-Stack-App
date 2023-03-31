import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Card, Image, Heading } from "@chakra-ui/react";
const CarouselFive = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
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
    "https://img3.hkrtcdn.com/22115/bnr_2211472_o.png",
    "https://i.postimg.cc/bJ2rpnK6/healthify-Logo.png",
    "https://img1.hkrtcdn.com/22043/normal_2204260_o.png",
    "https://img9.hkrtcdn.com/22101/bnr_2210088_o.png",
    "https://img1.hkrtcdn.com/25529/bnr_2552840_o.png",
    "https://img7.hkrtcdn.com/22043/normal_2204266_o.png",
    "https://img1.hkrtcdn.com/22043/normal_2204270_o.png",
    "https://img1.hkrtcdn.com/22099/bnr_2209880_o.png",
  ];

  return (
    <div style={{ width: "98vw", margin: "auto", marginTop: "10px" }}>
      <div style={{ width: "80%", margin: "auto", padding: "10px" }}>
        <Heading size="lg">Brand Range</Heading>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <Carousel responsive={responsive}>
          {cardItemArr.map((item, index) => (
            <Card maxW="sm" key={index} mr={1} ml={1}>
              <Image h={"100px"} w={"120px"} src={item} borderRadius="lg" />
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselFive;
