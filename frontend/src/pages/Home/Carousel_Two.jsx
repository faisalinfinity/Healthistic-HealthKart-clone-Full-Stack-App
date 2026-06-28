import React from "react";
import ProductCarousel from "../../components/ProductCarousel";

const CarouselTwo = ({ vitamin }) => (
  <ProductCarousel
    accent="Everyday value"
    title="Best Price Zone"
    subtitle="Daily vitamins & supplements to keep you going"
    items={vitamin}
  />
);

export default CarouselTwo;
