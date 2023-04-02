import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  useDisclosure,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../constants/constants";
import { useSelector } from "react-redux";

export default function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [addressLineThree, setAddressLineThree] = useState("");
  const { token } = useSelector(
    (state) => state.authReducer
  );
  const handleAddress = async () => {
    if (addressLineOne === "" || addressLineTwo === "") {
      toast({
        title: "Please add details",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      
    } else {
      let add = addressLineOne + " " + addressLineTwo + " " + addressLineThree;
      console.log(add);
      await axios({
        url: `${BASE_URL}/users`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body : {address : add}
      });
      toast({
        title: "Address Added",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add Address</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address Line One</FormLabel>
              <Input
                onChange={(e) => setAddressLineOne(e.target.value)}
                
                placeholder="House Number"
                required={true}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address Line Two</FormLabel>
              <Input
                onChange={(e) => setAddressLineTwo(e.target.value)}
                placeholder="Colony"
                required={true}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Landmark</FormLabel>
              <Input
                onChange={(e) => setAddressLineThree(e.target.value)}
                placeholder="optional"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleAddress} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
