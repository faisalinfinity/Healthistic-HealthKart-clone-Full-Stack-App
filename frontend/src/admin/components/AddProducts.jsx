import {
  Badge,
  Box,
  Button,
  Grid,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/constants";
import { useSelector } from "react-redux";

let schema = {
  image: "",
  title: "",
  description: "",
  price: "",
  originalPrice: "",
  sizes: "",
  category: "",
  rating: "",
  review: "",
  flavour: "",
  brand: "",
  tags: "",
  stock: "",
};

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.authReducer);
  const [product, setProduct] = useState(schema);
  const toast = useToast();
  const PostProductData = async (data) => {
    setLoading(true);
    let res = await axios({
      method: "post",
      url: BASE_URL + "/product",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      console.log(res.data);
      toast({
        title: `Products Added`,
        description: "Products Added Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setLoading(false);
    } else {
      toast({
        title: `Something Went Wrong`,
        description: ` ${res.data.message} `,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    let text = e.target.value;

    setProduct((prev) => {
      return { ...prev, [e.target.name]: text };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box padding={"8px 0px"}>
      <Badge m={"8px"} colorScheme={"teal"}>
        Add Single Product
      </Badge>
      <Grid
        p={4}
        gap={2}
        gridTemplateColumns={{
          lg: "repeat(1,1fr)",
          sm: "repeat(3,1fr)",
          base: "repeat(1,1fr)",
        }}
      >
        <Input
          placeholder="Image Links separated by comma (,) required"
          name="image"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>

        <Input
          placeholder="Product Title required"
          name="title"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="Product Description required"
          name="description"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="Product Price required"
          name="price"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="Product Original Price required"
          name="originalPrice"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="sizes separated by comma (,) required"
          name="sizes"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Select
          name="category"
          onChange={handleInput}
          placeholder="category required"
        >
          <option value="Vitamins">Vitamins</option>
          <option value="Ayurveda">Ayurveda</option>
          <option value="Nutrients">Nutrients</option>
          <option value="Food">Food and Drinks</option>
        </Select>
        {/* <Input
         
         
         
          border={"1px solid teal"}
          color="orange"
        ></Input> */}
        <Input
          placeholder="rating"
          name="rating"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="review "
          name="review"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="flavour"
          name="flavour"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="brand required"
          name="brand"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="tags (optional)"
          name="tags"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
        <Input
          placeholder="stock (required)"
          name="stock"
          onChange={handleInput}
          border={"1px solid teal"}
          color="orange"
        ></Input>
      </Grid>

      <Button
        colorScheme={"teal"}
        isLoading={loading}
        onClick={() => {
          let {
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
          } = product;

          product.image = product.image?.split(",");
          product.sizes = product.sizes?.split(",");
          product.price = +price;
          product.originalPrice = +originalPrice;
          product.rating = +rating;
          product.review = +review;
          product.stock = +stock;

          console.log(product);

          if (
            title == "" ||
            image == "" ||
            description == "" ||
            price == "" ||
            originalPrice == "" ||
            sizes == "" ||
            category == "" ||
            rating == "" ||
            flavour == "" ||
            brand == "" ||
            review == "" ||
            stock == "" ||
            tags == ""
          ) {
            toast({
              title: `Required details missing`,
              description: "Please enter all required details",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          } else {
            PostProductData({ ...product });
          }
        }}
      >
        Add Product
      </Button>
    </Box>
  );
}
