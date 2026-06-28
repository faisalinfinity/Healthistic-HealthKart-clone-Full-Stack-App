import React from "react";
import ProductCarousel from "../../components/ProductCarousel";

const CarouselOne = ({ nutrients }) => (
  <ProductCarousel
    accent="Limited time"
    title="Price Slash Alert"
    subtitle="Top sports nutrition picks at their best prices"
    items={nutrients}
  />
);

export default CarouselOne;
