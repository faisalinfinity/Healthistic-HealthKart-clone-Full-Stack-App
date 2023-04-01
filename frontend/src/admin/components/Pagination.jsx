import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

export default function Paginantion({ page, setPage, totalPage, divide }) {
  return (
    <HStack mt={6} w={"100%"} mb={'2rem'} justify={"center"}>
      <IconButton
        colorScheme={"teal"}
        icon={<MdArrowBackIosNew />}
        isDisabled={page == 1}
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      ></IconButton>
      <Text fontWeight={"bold"} color={"teal"}>
        {page}
      </Text>
      <IconButton
        colorScheme={"teal"}
        icon={<MdArrowForwardIos />}
        isDisabled={page == totalPage }
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      ></IconButton>
    </HStack>
  );
}
