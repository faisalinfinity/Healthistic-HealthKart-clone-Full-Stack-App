import React from "react";
import {
  Box,
  Container,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 600,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const cards = [
  "https://img7.hkrtcdn.com/26594/bnr_2659326_o.png",
  "https://img5.hkrtcdn.com/26594/bnr_2659324_o.jpg",
];

export default function CarouselFirst() {
  const [slider, setSlider] = React.useState(null);
  const height = useBreakpointValue({ base: "160px", md: "260px", lg: "320px" });

  return (
    <Container maxW="7xl" my={{ base: 6, md: 8 }}>
      <Box position="relative" borderRadius="2xl" overflow="hidden" boxShadow="sm">
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <IconButton
          aria-label="Previous slide"
          icon={<BiLeftArrowAlt size="1.4rem" />}
          bg="whiteAlpha.900"
          color="ink.700"
          borderRadius="full"
          position="absolute"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          boxShadow="md"
          _hover={{ bg: "white" }}
          onClick={() => slider?.slickPrev()}
        />
        <IconButton
          aria-label="Next slide"
          icon={<BiRightArrowAlt size="1.4rem" />}
          bg="whiteAlpha.900"
          color="ink.700"
          borderRadius="full"
          position="absolute"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          boxShadow="md"
          _hover={{ bg: "white" }}
          onClick={() => slider?.slickNext()}
        />
        <Slider {...settings} ref={(s) => setSlider(s)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height={height}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
    </Container>
  );
}
