import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  Badge,
  Icon,
  Divider,
  Skeleton,
  SkeletonText,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { MdVerified, MdLocalShipping } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BASE_URL } from "../constants/constants";
import { useAddToCart } from "../hooks/useAddToCart";

const ProductSkeleton = () => (
  <Container maxW="6xl" py={8}>
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
      <Skeleton h={{ base: "300px", md: "440px" }} borderRadius="2xl" />
      <VStack align="stretch" spacing={4}>
        <Skeleton h="20px" w="120px" />
        <Skeleton h="32px" />
        <SkeletonText noOfLines={3} spacing={3} />
        <Skeleton h="48px" w="200px" />
        <Skeleton h="48px" />
      </VStack>
    </Grid>
  </Container>
);

const SingleProductPage = () => {
  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);
  const [pic, setPic] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { id } = useParams();
  const { token } = useSelector((state) => state.authReducer);
  const addToCart = useAddToCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setItem(res.data);
        setImages(res.data.image || []);
        setPic(0);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleAdd = () => {
    setIsAdding(true);
    Promise.resolve(addToCart(item)).finally(() => setIsAdding(false));
  };

  if (loading) return <ProductSkeleton />;
  if (!item.title)
    return (
      <Container maxW="6xl" py={20} textAlign="center">
        <Heading size="md">Product not found</Heading>
        <Button as={Link} to="/" mt={6}>
          Back to home
        </Button>
      </Container>
    );

  const price = Number(item.price) || 0;
  const original = Number(item.originalPrice) || 0;
  const discount =
    original > price ? Math.round(((original - price) / original) * 100) : 0;

  return (
    <Container maxW="6xl" py={{ base: 5, md: 8 }}>
      <Breadcrumb
        spacing={2}
        separator={<ChevronRightIcon color="ink.300" />}
        mb={6}
        fontSize="sm"
        color="ink.400"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{item.category}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text noOfLines={1} maxW="220px">
            {item.title}
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 12 }}>
        {/* Gallery */}
        <GridItem>
          <Flex
            direction={{ base: "column-reverse", sm: "row" }}
            gap={4}
            position={{ md: "sticky" }}
            top="120px"
          >
            <HStack
              spacing={3}
              flexDirection={{ base: "row", sm: "column" }}
              flexWrap="wrap"
            >
              {images.map((src, i) => (
                <Box
                  key={i}
                  as="button"
                  onClick={() => setPic(i)}
                  boxSize="64px"
                  p={1.5}
                  bg="white"
                  borderRadius="lg"
                  borderWidth="2px"
                  borderColor={pic === i ? "brand.500" : "blackAlpha.100"}
                  transition="border-color 0.2s"
                >
                  <Image src={src} alt={`${item.title} ${i + 1}`} boxSize="100%" objectFit="contain" />
                </Box>
              ))}
            </HStack>
            <Flex
              flex="1"
              align="center"
              justify="center"
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="blackAlpha.100"
              p={{ base: 6, md: 10 }}
              minH={{ base: "260px", md: "420px" }}
            >
              <Image
                src={images[pic]}
                alt={item.title}
                maxH={{ base: "240px", md: "400px" }}
                objectFit="contain"
              />
            </Flex>
          </Flex>
        </GridItem>

        {/* Info */}
        <GridItem>
          <VStack align="stretch" spacing={4}>
            {item.tags && (
              <Badge w="fit-content" colorScheme="green" variant="subtle">
                {item.tags}
              </Badge>
            )}
            <Heading size="lg">{item.title}</Heading>
            <HStack color="ink.400" fontSize="sm" spacing={4}>
              <Text>
                By{" "}
                <Text as="span" color="brand.600" fontWeight="600">
                  {item.brand}
                </Text>
              </Text>
              {item.rating && (
                <HStack spacing={1}>
                  <HStack
                    spacing={1}
                    bg="brand.500"
                    color="white"
                    px={2}
                    py={0.5}
                    borderRadius="md"
                    fontWeight="700"
                  >
                    <Text>{item.rating}</Text>
                    <Icon as={AiFillStar} boxSize="2.5" />
                  </HStack>
                  {item.review != null && <Text>{item.review} reviews</Text>}
                </HStack>
              )}
            </HStack>

            <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="blackAlpha.100" p={5}>
              <HStack align="baseline" spacing={3} flexWrap="wrap">
                <Heading size="xl" color="ink.800">
                  ₹{price}
                </Heading>
                {original > price && (
                  <Text fontSize="lg" color="ink.300" textDecoration="line-through">
                    ₹{original}
                  </Text>
                )}
                {discount > 0 && (
                  <Badge bg="accent.500" color="white" fontSize="sm">
                    {discount}% OFF
                  </Badge>
                )}
              </HStack>
              <Text fontSize="xs" color="ink.300" mt={1}>
                Inclusive of all taxes
              </Text>
            </Box>

            {item.sizes?.[0] && (
              <Box>
                <Text fontWeight="700" mb={2} color="ink.700">
                  Weight
                </Text>
                <Button variant="outline" colorScheme="orange" size="sm">
                  {item.sizes[0]}
                </Button>
              </Box>
            )}

            {item.flavour && (
              <Box>
                <Text fontWeight="700" mb={2} color="ink.700">
                  Flavour
                </Text>
                <Button variant="outline" colorScheme="orange" size="sm">
                  {item.flavour}
                </Button>
              </Box>
            )}

            <Flex gap={3} direction={{ base: "column", sm: "row" }} pt={2}>
              <Button
                flex="1"
                variant="outline"
                colorScheme="orange"
                borderColor="accent.400"
                color="accent.600"
                _hover={{ bg: "accent.50" }}
                isLoading={isAdding}
                onClick={handleAdd}
              >
                Add to Cart
              </Button>
              <Button as={Link} to="/cart" flex="1" variant="accent">
                Go to Cart
              </Button>
            </Flex>

            <Divider />

            <SimpleGrid columns={3} spacing={3} pt={1}>
              {[
                { icon: MdVerified, label: "100% Authentic" },
                { icon: MdLocalShipping, label: "Free Shipping" },
                { icon: TbRefresh, label: "Easy Returns" },
              ].map((t) => (
                <VStack key={t.label} spacing={1} color="ink.500">
                  <Icon as={t.icon} boxSize="22px" color="brand.500" />
                  <Text fontSize="xs" textAlign="center" fontWeight="600">
                    {t.label}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </GridItem>
      </Grid>

      {/* Details */}
      <Box mt={{ base: 10, md: 16 }}>
        <Heading size="md" mb={4}>
          Product Details
        </Heading>
        <Box
          bg="white"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          p={{ base: 5, md: 8 }}
          color="ink.500"
          lineHeight="1.8"
        >
          {item.description}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleProductPage;
