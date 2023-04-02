import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Paginantion from "../admin/components/Pagination";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer/action";

const MultiProductPage = () => {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const toast = useToast();
  const { category } = params;

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/product?category=${category}&page=${page}&limit=${8}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0M2I0NmVhN2FhMDU3YTI3ODI4YWUiLCJpYXQiOjE2ODAxNjQ3MDd9.dnwiGLzmb7tv-c6bKcIlGRmRNQsSz61NGRjcw1tNML8`,
          },
        }
      )
      .then((res) => {
        setItem(res.data.data);
        setPage(res.data.page);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page, category]);

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
    console.log(_id);

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

  console.log(item);

  return (
    <Box>
      <Box
        w={{ base: "70%", sm: "80%", md: "90%" }}
        m={"auto"}
        mt={"2rem"}
        mb={"2rem"}
      >
        <SimpleGrid
          columns={{ base: "1", sm: "2", md: "3", lg: "4" }}
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
