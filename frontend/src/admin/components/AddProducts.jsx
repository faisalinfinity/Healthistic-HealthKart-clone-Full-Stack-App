import {
  Box,
  Button,
  Heading,
  SimpleGrid,
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
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data) {
      toast({
        title: `Product Added`,
        description: "Product added successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setProduct(schema);
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
    setProduct((prev) => ({ ...prev, [e.target.name]: text }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Heading size="md" mb={6}>
        Add a Product
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Input
          placeholder="Image links separated by comma (,)"
          name="image"
          value={product.image}
          onChange={handleInput}
        />
        <Input
          placeholder="Product title"
          name="title"
          value={product.title}
          onChange={handleInput}
        />
        <Input
          placeholder="Product description"
          name="description"
          value={product.description}
          onChange={handleInput}
        />
        <Input
          placeholder="Price (₹)"
          name="price"
          type="number"
          value={product.price}
          onChange={handleInput}
        />
        <Input
          placeholder="Original price / MRP (₹)"
          name="originalPrice"
          type="number"
          value={product.originalPrice}
          onChange={handleInput}
        />
        <Input
          placeholder="Sizes separated by comma (,)"
          name="sizes"
          value={product.sizes}
          onChange={handleInput}
        />
        <Select name="category" value={product.category} onChange={handleInput} placeholder="Select category">
          <option value="Vitamins">Vitamins</option>
          <option value="Ayurveda">Ayurveda</option>
          <option value="Nutrients">Nutrients</option>
          <option value="Food">Food and Drinks</option>
        </Select>
        <Input
          placeholder="Rating (0-5)"
          name="rating"
          type="number"
          value={product.rating}
          onChange={handleInput}
        />
        <Input
          placeholder="Number of reviews"
          name="review"
          type="number"
          value={product.review}
          onChange={handleInput}
        />
        <Input
          placeholder="Flavour"
          name="flavour"
          value={product.flavour}
          onChange={handleInput}
        />
        <Input
          placeholder="Brand"
          name="brand"
          value={product.brand}
          onChange={handleInput}
        />
        <Input
          placeholder="Tags"
          name="tags"
          value={product.tags}
          onChange={handleInput}
        />
        <Input
          placeholder="Stock quantity"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleInput}
        />
      </SimpleGrid>

      <Button
        mt={6}
        size="lg"
        isLoading={loading}
        onClick={() => {
          const {
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
              description: "Please enter all required details.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          } else {
            PostProductData({
              ...product,
              image: image?.split(","),
              sizes: sizes?.split(","),
              price: +price,
              originalPrice: +originalPrice,
              rating: +rating,
              review: +review,
              stock: +stock,
            });
          }
        }}
      >
        Add Product
      </Button>
    </Box>
  );
}
