import React from "react";
import BannerCarousel from "../../components/BannerCarousel";

const images = [
  "https://img3.hkrtcdn.com/22115/bnr_2211472_o.png",
  "https://i.postimg.cc/bJ2rpnK6/healthify-Logo.png",
  "https://img1.hkrtcdn.com/22043/normal_2204260_o.png",
  "https://img9.hkrtcdn.com/22101/bnr_2210088_o.png",
  "https://img1.hkrtcdn.com/25529/bnr_2552840_o.png",
  "https://img7.hkrtcdn.com/22043/normal_2204266_o.png",
  "https://img1.hkrtcdn.com/22043/normal_2204270_o.png",
  "https://img1.hkrtcdn.com/22099/bnr_2209880_o.png",
];

const CarouselFive = () => (
  <BannerCarousel
    title="Shop by Brand"
    images={images}
    perView={{ desktop: 5, tablet: 3, mobile: 2 }}
    height={{ base: "110px", md: "130px" }}
    contain
  />
);

export default CarouselFive;
