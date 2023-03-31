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

export default function OrderItem({
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
  flavour,
  userId,
  quantity,
  date
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
    flavour,
    
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

  const UpdateOrder = async (changes) => {
    setLoading(true);

    let res = await axios({
      method: "patch",
      url: BASE_URL + `/admin/product/${_id}`,
      data: changes,
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
  };

  return (
    <Tr>
           <Td isNumeric>{userId}</Td>
      <Td maxW={"100px"} overflow={"hidden"} isTruncated>
        {title}
      </Td>
 
      <Td isNumeric>{price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>{date}</Td>
      <Td>
        <Menu colorScheme={"teal"} w={"100%"}>
          <MenuButton w={"100%"} as={Button} rightIcon={<FaAngleDown />}>
           Change  Status
          </MenuButton>
          <MenuList>
            <MenuItem></MenuItem>
          
            <MenuItem
              isLoading={loading}
              variant="outline"
              color={"teal"}
              onClick={() => UpdateOrder({ status: "Shipped" })}
            >
              Ship Order
            </MenuItem>
            <MenuItem onClick={() => UpdateOrder({ status: "Cancelled" })}>
              Cancel Order
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
