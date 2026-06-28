import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Container, Heading, Image } from "@chakra-ui/react";

const BannerCarousel = ({
  title,
  images = [],
  perView = { desktop: 4, tablet: 2, mobile: 1 },
  height = { base: "150px", md: "200px" },
  contain = false,
}) => {
  const responsive = {
    desktop: { breakpoint: { max: 4000, min: 1024 }, items: perView.desktop },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: perView.tablet },
    mobile: { breakpoint: { max: 640, min: 0 }, items: perView.mobile },
  };

  return (
    <Box as="section" py={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        {title && (
          <Heading size="lg" mb={5}>
            {title}
          </Heading>
        )}
        <Carousel responsive={responsive} infinite showDots={false} keyBoardControl>
          {images.map((src, i) => (
            <Box key={i} px={2}>
              <Image
                src={src}
                alt={title ? `${title} ${i + 1}` : `banner ${i + 1}`}
                w="100%"
                h={height}
                objectFit={contain ? "contain" : "cover"}
                bg={contain ? "white" : "transparent"}
                p={contain ? 4 : 0}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="blackAlpha.100"
                boxShadow="sm"
              />
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default BannerCarousel;
