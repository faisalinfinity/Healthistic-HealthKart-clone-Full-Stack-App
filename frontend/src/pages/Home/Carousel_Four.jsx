import React from "react";
import ProductCarousel from "../../components/ProductCarousel";

const CarouselFour = ({ ayurveda }) => (
  <ProductCarousel
    accent="Nature's best"
    title="Wellness Range"
    subtitle="Ayurveda & herbs for holistic wellbeing"
    items={ayurveda}
  />
);

export default CarouselFour;
