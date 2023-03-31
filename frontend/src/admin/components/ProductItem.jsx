import {
  Grid,
  Image,
  Input,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants/constants";

export default function ProductItem({
  setRefresh,
  _id,
  image,
  title,
  description,
  price,
  originalPrice,
  sizes,
  category,
  style,
  color,
  material,
  fit,
  occasion,
  sleeves,
  neck,
  brand,
  gender,
  delivery,
  adminId,
  tags,
  stock,
  rating,
    review,
    flavour
}) {
  const { token } = useSelector((state) => state.authReducer);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    _id,
    title,
    image,
    description,
    price,
    originalPrice,
    sizes,
    category,
    brand,
    delivery,
    adminId,
    tags,
    stock,
    rating,
    review,
    flavour
    
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    image.map((el, i) => {
      setImages((prev) => {
        return { ...prev, ["image" + i]: el };
      });
    });
  }, []);

  const handleInput = (e) => {
    let text = e.target.value;

    setProduct((prev) => {
      return { ...prev, [e.target.name]: text };
    });
  };




  return (
    <Tr>
      <Td>
        <Image w={"40px"} src={image[0]}></Image>
      </Td>
      <Td maxW={"100px"} overflow={"hidden"} isTruncated>
        {title}
      </Td>
      <Td isNumeric>{price}</Td>
      <Td isNumeric>{originalPrice}</Td>
      <Td isNumeric>{stock}</Td>
      <Td>
        <Menu colorScheme={"teal"} w={"100%"}>
          <MenuButton w={"100%"} as={Button} rightIcon={<FaAngleDown />}>
            Edit
          </MenuButton>
          <MenuList>
            <MenuItem>
              <>
                <Text w={"100%"} onClick={onOpen}>
                  Edit Product
                </Text>

                <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Grid
                        p={4}
                        gap={2}
                        gridTemplateColumns={{ lg: "repeat(3,1fr)", sm:"repeat(2,1fr)" , base: "repeat(1,1fr)" }}
                      >
                        <Input
                              value={Array.isArray(product.image)?product.image.join(","):price.image}
                              placeholder="Image Links separated by comma (,) required"
                              name={"image"}
                              onChange={handleInput}
                              border={"1px solid orange"}
                              color="orange"
                            ></Input>

                    

                        <Input
                          placeholder="Product Title required"
                          name="title"
                          value={product.title}
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                        ></Input>
                        <Input
                          placeholder="Product Description required"
                          name="description"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.description}
                        ></Input>
                        <Input
                         value={product.price}
                          placeholder="Product Price required"
                          name="price"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                        ></Input>
                        <Input
                          placeholder="Product Original Price required"
                          name="originalPrice"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.originalPrice}
                        ></Input>
                        <Input
                         value={product.sizes.join(",")}
                          placeholder="sizes separated by comma (,) required"
                          name="sizes"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                        ></Input>
                        <Select
                          name="category"
                          onChange={handleInput}
                          value={product.category}
                          placeholder="category required"
                        >
                          <option value="Vitamins">Vitamins</option>
                          <option value="Ayurveda">Ayurveda</option>
                          <option value="Nutrients">Nutrients</option>
                          <option value="Food">Food and Drinks</option>
                        </Select>
                        {/* <Input
         
         
         
          border={"1px solid orange"}
          color="orange"
        ></Input> */}
                        <Input
                          placeholder="rating"
                          name="rating"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.rating}
                        ></Input>
                        <Input
                          placeholder="review "
                          name="review"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.review}
                        ></Input>
                        <Input
                          placeholder="flavour"
                          name="flavour"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.flavour}
                        ></Input>
                        <Input
                          placeholder="brand required"
                          name="brand"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.brand}
                        ></Input>
                        <Input
                          placeholder="tags (optional)"
                          name="tags"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.tags}
                        ></Input>
                        <Input
                          placeholder="stock (required)"
                          name="stock"
                          onChange={handleInput}
                          border={"1px solid orange"}
                          color="orange"
                          value={product.stock}
                        ></Input>
                      </Grid>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme={"teal"} mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        isLoading={loading}
                        variant="outline"
                        color={"teal"}
                        onClick={async () => {
                          setLoading(true);

                          let myproduct = { ...product, image: product.image.split(",") };

                          let res = await axios({
                            method: "patch",
                            url: BASE_URL + `/admin/product/${_id}`,
                            data: myproduct,
                            headers: {
                                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyZWFiYTQzNDk0OTgxNDc3ZjVhNzkiLCJpYXQiOjE2ODAyMzg3ODN9.zyLneanO_RUOdLOeUF3Z7nc62EfjcKd6G1Ypx265pbo`,
                              },
                          });

                          if (res.data) {
                            toast({
                              title: `Product updated`,
                              description: res.data.message,
                              status: "success",
                              duration: 2000,
                              isClosable: true,
                            });
                            setLoading(false);
                            setRefresh((prev) => !prev);
                            onClose();
                          } else {
                            toast({
                              title: `Error`,
                              description: res.data.message,
                              status: "error",
                              duration: 2000,
                              isClosable: true,
                            });
                            setLoading(false);
                          }
                        }}
                      >
                        Edit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                setLoading(true);
                let res = await axios({
                  method: "delete",
                  url: BASE_URL + `/admin/product/${_id}`,
                  headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyZWFiYTQzNDk0OTgxNDc3ZjVhNzkiLCJpYXQiOjE2ODAyMzg3ODN9.zyLneanO_RUOdLOeUF3Z7nc62EfjcKd6G1Ypx265pbo`,
                  },
                });

                if (res.data) {
                  toast({
                    title: `Product deleted`,
                    description: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  setLoading(false);
                  setRefresh((prev) => !prev);
                } else {
                  toast({
                    title: `Error`,
                    description: res.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                  setLoading(false);
                }
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
