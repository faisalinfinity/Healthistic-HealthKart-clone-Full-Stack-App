import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Container, Flex, Heading, Text, Skeleton } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 5 },
  desktop: { breakpoint: { max: 1536, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1, partialVisibilityGutter: 30 },
};

const ProductCarousel = ({ title, subtitle, items = [], accent }) => {
  const isLoading = !items || items.length === 0;

  return (
    <Box as="section" py={{ base: 6, md: 8 }}>
      <Container maxW="7xl">
        <Flex align="flex-end" justify="space-between" mb={5} gap={4}>
          <Box>
            {accent && (
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.1em"
                textTransform="uppercase"
                color="accent.500"
                mb={1}
              >
                {accent}
              </Text>
            )}
            <Heading size="lg">{title}</Heading>
            {subtitle && (
              <Text color="ink.400" fontSize="sm" mt={1}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Flex>

        {isLoading ? (
          <Flex gap={4} overflow="hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                flex="0 0 auto"
                w={{ base: "100%", sm: "48%", md: "31%", lg: "19%" }}
                h="320px"
                borderRadius="xl"
              />
            ))}
          </Flex>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={items.length > 4}
            keyBoardControl
            showDots={false}
            partialVisible
            itemClass="hk-carousel-item"
          >
            {items.map((item) => (
              <Box key={item._id} px={2} py={2} h="100%">
                <ProductCard item={item} />
              </Box>
            ))}
          </Carousel>
        )}
      </Container>
    </Box>
  );
};

export default ProductCarousel;
