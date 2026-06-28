import React from "react";
import BannerCarousel from "../../components/BannerCarousel";

const images = [
  "https://img5.hkrtcdn.com/24515/bnr_2451444_o.png",
  "https://img7.hkrtcdn.com/24515/bnr_2451446_o.png",
  "https://img9.hkrtcdn.com/24515/bnr_2451448_o.png",
  "https://img1.hkrtcdn.com/24515/bnr_2451450_o.png",
];

const CarouselThree = () => (
  <BannerCarousel title="Bodybuilding Goals" images={images} />
);

export default CarouselThree;
