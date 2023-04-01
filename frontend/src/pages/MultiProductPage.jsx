import React, { useEffect, useState } from "react";
import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Paginantion from "../admin/components/Pagination";

const MultiProductPage = () => {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
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

  console.log(item);

  return (
    <Box>
      <Box
        w={{ base: "70%", sm: "80%", md: "90%" }}
        m={"auto"}
        mt={"2rem"}
        mb={"2rem"}
      >
        <SimpleGrid columns={{ base: "1", sm: "2", md: "4" }} spacing={10}>
          {item &&
            item?.map((ele) => {
              return (
                <Link to={`/product/${ele._id}`}>
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
                    <Image w={"50%"} src={ele.image[0]} />
                    <Box>{ele.title}</Box>
                    <Text fontWeight={"semibold"}>₹{ele.price}</Text>
                    <Box>
                      <Button
                        bg={"orange.50"}
                        color={"#ff8913"}
                        w={"14rem"}
                        border={"1px solid orange"}
                        _hover={{ bg: "orange", color: "white" }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Link>
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
