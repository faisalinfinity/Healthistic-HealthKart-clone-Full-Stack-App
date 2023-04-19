import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Paginantion from "../admin/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer/action";
import { BASE_URL } from "../constants/constants";

const MultiProductPage = () => {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const toast = useToast();
  const { category } = params;
  const { token } = useSelector((s) => s.authReducer);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/product?category=${category}&page=${page}&limit=${8}&sort=price:${sort}&filter=brand:${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setItem(res.data.data);
        setPage(res.data.page);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page, category, token, sort, filter]);

  const handleAddtoCart = ({
    image,
    title,
    description,
    price,
    originalPrice,
    sizes,
    category,
    rating,
    review,
    flavour,
    brand,
    tags,
    stock,
    adminId,
    _id,
    userId,
    quantity,
  }) => {
    dispatch(
      addToCart({
        image,
        title,
        description,
        price,
        originalPrice,
        sizes,
        category,
        rating,
        review,
        flavour,
        brand,
        tags,
        stock,
        adminId,
        pid: _id,
        userId,
        quantity: 1,
      })
    );
    toast({
      title: "item added.",
      description: "Item added to your cart",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Box
        display={{ sm: "flex", md: "flex" }}
        gap={"2rem"}
        w={{ base: "70%", sm: "80%", md: "90%" }}
        m={"auto"}
        mt={"2rem"}
        mb={"2rem"}
      >
        <Box
          h={"15rem"}
          borderRadius={"1rem"}
          w={{ base: "15rem", sm: "25", md: "25rem", lg: "20rem" }}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Accordion defaultIndex={[0]} mt={"1rem"} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={"xl"} fontWeight={"medium"}>
                    Sort By Price
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex gap={"2rem"}>
                  <Button onClick={() => setSort("1")}>Low to High</Button>
                  <Button onClick={() => setSort("-1")}>High to Low</Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={"xl"} fontWeight={"medium"}>
                    Filter options
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex gap={"2rem"}>
                  <Checkbox
                    value="muscleblaze"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    MuscleBlaze
                  </Checkbox>
                  <Checkbox
                    value="muscleblaze"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    MuscleXP
                  </Checkbox>
                </Flex>
                <Flex gap={"2rem"}>
                  <Checkbox
                    value="healthkart"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    Healthkart
                  </Checkbox>
                  <Checkbox
                    value="healthaid"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    Healthaid
                  </Checkbox>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <SimpleGrid
          columns={{ base: "1", sm: "1", md: "2", lg: "3" }}
          spacing={10}
        >
          {item &&
            item?.map((ele) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                  gap={"1rem"}
                  p={"1rem"}
                  w={"15rem"}
                  alignItems={"center"}
                  borderRadius={".5rem"}
                  textAlign={"center"}
                >
                  <Link to={`/product/${ele._id}`}>
                    <Image w={"50%"} src={ele.image[0]} />
                  </Link>
                  <Box>{ele.title}</Box>
                  <Text fontWeight={"semibold"}>₹{ele.price}</Text>
                  <Box>
                    <Button
                      bg={"orange.50"}
                      color={"#ff8913"}
                      w={"14rem"}
                      border={"1px solid orange"}
                      _hover={{ bg: "orange", color: "white" }}
                      onClick={() => handleAddtoCart(ele)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
      <Paginantion
        key={page}
        page={page}
        setPage={setPage}
        divide={5}
        totalPage={totalPage}
      />
    </Box>
  );
};

export default MultiProductPage;
