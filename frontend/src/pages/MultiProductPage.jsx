import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdTune } from "react-icons/md";
import Paginantion from "../admin/components/Pagination";
import ProductCard from "../components/ProductCard";
import { BASE_URL } from "../constants/constants";

const CATEGORY_LABELS = {
  nutrients: "Sports Nutrition",
  vitamins: "Vitamins & Supplements",
  ayurveda: "Ayurveda & Herbs",
  food: "Health Food & Drinks",
};

const FilterPanel = ({ sort, setSort, brands, filterValues, setFilterValues }) => (
  <VStack align="stretch" spacing={6}>
    <Box>
      <Text fontWeight="700" mb={3} color="ink.700">
        Sort by Price
      </Text>
      <HStack spacing={2}>
        <Button
          flex="1"
          size="sm"
          variant={sort === "1" ? "solid" : "outline"}
          onClick={() => setSort("1")}
        >
          Low → High
        </Button>
        <Button
          flex="1"
          size="sm"
          variant={sort === "-1" ? "solid" : "outline"}
          onClick={() => setSort("-1")}
        >
          High → Low
        </Button>
      </HStack>
    </Box>

    <Box>
      <Text fontWeight="700" mb={3} color="ink.700">
        Brands
      </Text>
      {brands.length === 0 ? (
        <Text fontSize="sm" color="ink.300">
          No brands available
        </Text>
      ) : (
        <CheckboxGroup value={filterValues} onChange={(e) => setFilterValues(e)}>
          <Stack spacing={2.5}>
            {brands.map((ele) => (
              <Checkbox key={ele} value={ele} colorScheme="brand">
                <Text fontSize="sm">{ele}</Text>
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      )}
    </Box>
  </VStack>
);

const GridSkeleton = () => (
  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} h="320px" borderRadius="xl" />
    ))}
  </SimpleGrid>
);

const MultiProductPage = () => {
  const [item, setItem] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [sort, setSort] = useState("1");
  const [filter, setFilter] = useState("");
  const [filterValues, setfilterValues] = useState([]);
  const [brands, setBrand] = useState([]);
  const { category } = useParams();
  const { token } = useSelector((s) => s.authReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoader(true);
    window.scrollTo(0, 0);
    axios
      .get(
        `${BASE_URL}/product?category=${category}&page=${page}&limit=${8}&sort=price:${sort}${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setItem(res.data.data);
        setPage(res.data.page);
        setTotalPage(res.data.totalPages);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [page, category, token, sort, filter]);

  useEffect(() => {
    let str = "";
    if (filterValues.length > 0) {
      filterValues.forEach((el) => {
        str += `&filter=brand:${el}`;
      });
    }
    setFilter(str);
  }, [filterValues]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product?category=${category}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let obj = {};
        let arr = [];
        (res.data.data || []).forEach((el) => {
          if (obj[el.brand] === undefined) {
            obj[el.brand] = 1;
            arr.push(el.brand);
          }
        });
        setBrand([...arr]);
      })
      .catch((err) => console.log(err));
  }, [category, token]);

  const title = CATEGORY_LABELS[category] || category;

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Flex justify="space-between" align="center" mb={6} gap={4}>
        <Box>
          <Heading size="lg" textTransform="capitalize">
            {title}
          </Heading>
          {!loader && (
            <Text color="ink.400" fontSize="sm" mt={1}>
              {item?.length || 0} products
            </Text>
          )}
        </Box>
        <Button
          display={{ base: "inline-flex", lg: "none" }}
          variant="outline"
          leftIcon={<Icon as={MdTune} />}
          onClick={onOpen}
        >
          Filters
        </Button>
      </Flex>

      <Flex gap={8} align="flex-start">
        {/* Desktop sidebar */}
        <Box
          display={{ base: "none", lg: "block" }}
          w="260px"
          flexShrink={0}
          bg="white"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          boxShadow="sm"
          p={6}
          position="sticky"
          top="120px"
        >
          <FilterPanel
            sort={sort}
            setSort={setSort}
            brands={brands}
            filterValues={filterValues}
            setFilterValues={setfilterValues}
          />
        </Box>

        {/* Products */}
        <Box flex="1" minW={0}>
          {loader ? (
            <GridSkeleton />
          ) : item?.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={20}
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="blackAlpha.100"
            >
              <Heading size="md" color="ink.500">
                No products found
              </Heading>
              <Text color="ink.400" mt={2}>
                Try adjusting your filters.
              </Text>
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 3, md: 5 }}>
              {item?.map((ele) => (
                <ProductCard key={ele._id} item={ele} />
              ))}
            </SimpleGrid>
          )}

          <Paginantion
            key={page}
            page={page}
            setPage={setPage}
            divide={5}
            totalPage={totalPage}
          />
        </Box>
      </Flex>

      {/* Mobile filter drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent>
          <DrawerCloseButton mt={2} />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <FilterPanel
              sort={sort}
              setSort={setSort}
              brands={brands}
              filterValues={filterValues}
              setFilterValues={setfilterValues}
            />
            <Button w="full" mt={8} onClick={onClose}>
              Show results
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default MultiProductPage;
