import { Box, Container, Flex, Heading, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Accourdion from "./Accourdion";
import Carousel from "./Carousal";
import CarouselFirst from "./Carousel_First";
import CarouselFive from "./Carousel_Five";
import CarouselFour from "./Carousel_Four";
import CarouselOne from "./Carousel_One";
import CarouselThree from "./Carousel_Three";
import CarouselTwo from "./Carousel_Two";
import CarouselSix from "./CarouselSix";
import { BASE_URL } from "../../constants/constants";
import { CATEGORIES } from "../../constants/categories";
import { GiMuscleUp, GiHerbsBundle } from "react-icons/gi";
import { FaPills } from "react-icons/fa";
import { MdLocalDrink, MdVerified, MdLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TbRefresh } from "react-icons/tb";

const CATEGORY_META = [
  { icon: GiMuscleUp, gradient: "linear(to-br, brand.500, brand.700)" },
  { icon: FaPills, gradient: "linear(to-br, accent.400, accent.600)" },
  { icon: GiHerbsBundle, gradient: "linear(to-br, green.400, green.600)" },
  { icon: MdLocalDrink, gradient: "linear(to-br, purple.400, purple.600)" },
];

const TRUST = [
  { icon: MdVerified, title: "100% Authentic", desc: "Sourced from brands" },
  { icon: MdLocalShipping, title: "Free Shipping", desc: "On every order" },
  { icon: BiSupport, title: "Expert Support", desc: "Nutrition guidance" },
  { icon: TbRefresh, title: "Easy Returns", desc: "Hassle-free policy" },
];

const CategoryTiles = () => (
  <Container maxW="7xl" py={{ base: 6, md: 8 }}>
    <Heading size="lg" mb={5}>
      Shop by Category
    </Heading>
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 3, md: 5 }}>
      {CATEGORIES.map((c, i) => {
        const meta = CATEGORY_META[i % CATEGORY_META.length];
        return (
          <Flex
            key={c.to}
            as={Link}
            to={c.to}
            direction="column"
            justify="space-between"
            h={{ base: "120px", md: "150px" }}
            p={5}
            borderRadius="2xl"
            color="white"
            bgGradient={meta.gradient}
            position="relative"
            overflow="hidden"
            transition="transform 0.25s ease, box-shadow 0.25s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
          >
            <Icon as={meta.icon} boxSize={{ base: 7, md: 9 }} opacity={0.95} />
            <Text fontWeight="700" fontSize={{ base: "sm", md: "md" }} lineHeight="1.2">
              {c.label}
            </Text>
            <Icon
              as={meta.icon}
              position="absolute"
              right="-10px"
              bottom="-10px"
              boxSize="80px"
              opacity={0.12}
            />
          </Flex>
        );
      })}
    </SimpleGrid>
  </Container>
);

const TrustStrip = () => (
  <Container maxW="7xl" py={{ base: 6, md: 8 }}>
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={{ base: 3, md: 5 }}
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      p={{ base: 5, md: 7 }}
      boxShadow="sm"
    >
      {TRUST.map((t) => (
        <Flex key={t.title} align="center" gap={3}>
          <Flex
            boxSize="44px"
            flexShrink={0}
            align="center"
            justify="center"
            borderRadius="xl"
            bg="brand.50"
            color="brand.600"
          >
            <Icon as={t.icon} boxSize="22px" />
          </Flex>
          <Box>
            <Text fontWeight="700" color="ink.700" fontSize="sm">
              {t.title}
            </Text>
            <Text fontSize="xs" color="ink.400">
              {t.desc}
            </Text>
          </Box>
        </Flex>
      ))}
    </SimpleGrid>
  </Container>
);

const HomePage = () => {
  const [vitamin, setVitamin] = useState([]);
  const [ayurveda, setAyurveda] = useState([]);
  const [nutrients, setNutrients] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchCategory = (category, setter) =>
      axios
        .get(`${BASE_URL}/product?category=${category}`)
        .then((res) => active && setter(res.data.data || []))
        .catch(() => active && setter([]));

    fetchCategory("Ayurveda", setAyurveda);
    fetchCategory("Vitamins", setVitamin);
    fetchCategory("Nutrients", setNutrients);

    return () => {
      active = false;
    };
  }, []);

  return (
    <Box>
      <Carousel />
      <CategoryTiles />
      <CarouselOne nutrients={nutrients} />
      <CarouselSix />
      <CarouselTwo vitamin={vitamin} />
      <CarouselThree />
      <CarouselFour ayurveda={ayurveda} />
      <TrustStrip />
      <CarouselFirst />
      <CarouselFive />
      <Accourdion />
    </Box>
  );
};

export default HomePage;
