import React from "react";
import {
  Box,
  Container,
  IconButton,
  Text,
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
  "https://img5.hkrtcdn.com/26492/bnr_2649134_o.png",
  "https://img1.hkrtcdn.com/26554/bnr_2655370_o.jpg",
  "https://img7.hkrtcdn.com/22852/bnr_2285166_o.jpg",
  "https://img9.hkrtcdn.com/26554/bnr_2655378_o.jpg",
  "https://img9.hkrtcdn.com/25888/bnr_2588778_o.jpg",
  "https://img5.hkrtcdn.com/26479/bnr_2647814_o.jpg",
  "https://img1.hkrtcdn.com/26096/bnr_2609550_o.jpg",
];

export default function Carousel() {
  const [slider, setSlider] = React.useState(null);
  const height = useBreakpointValue({ base: "200px", md: "340px", lg: "420px" });

  return (
    <Box bg="white" borderBottomWidth="1px" borderColor="blackAlpha.100" pb={2}>
      <Container maxW="7xl" pt={4}>
        <Text
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="600"
          color="ink.500"
          mb={3}
        >
          India's Largest D2C Nutrition Platform
        </Text>
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
    </Box>
  );
}
