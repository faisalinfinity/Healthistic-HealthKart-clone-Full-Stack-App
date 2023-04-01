import {
  Box,
  Stack,
  StackDivider,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  Wrap,
   
} from "@chakra-ui/layout";
import {HamburgerIcon} from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { ImHome2 } from "react-icons/im";
import axios from "axios";
import {   useSelector } from "react-redux";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import InitialFocus from "./Modal";
import Paginantion from "../../admin/components/Pagination";
import MobileSideNav from "./HameBurger";
// import { logout } from "../../redux/AuthReducer/action";

const AccountInfo = () => {
  const infoArr = [
    "My Orders",
    "Personal Information",
    "Addresses",
    "Refer and Earn",
    
  ];
  
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure();


  // Function Used in COmponent -------------------------------
  const boxStyle = (index) => {
    return {
      // borderLeftWidth: index === tab ? "4px" : "0px",
      // borderLeftColor: index === tab ? "blue" : "while",
      backgroundColor : index === tab  ? "teal" : "",
      color: index === tab ? "white" : "gray",
      
      boxShadow: index === tab ?  "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px": "",
      paddingLeft: "1rem",
    };
  };

   const { name, email, token, gender, profile } = useSelector(
    (state) => state.authReducer
  );

  const OrderArr = async () => {
    let res = await axios({
      url: `http://localhost:8080/users/order?page=${page}&limit=${2}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    setOrder(res.data.data);
    setPage(res.data.page);
    setTotalPage(res.data.totalPages);
  };
   const handleLogOut = ()=>{
    // dispatch(logout)
    localStorage.removeItem("UserDetails");
   }

  const Icon = {
    color: "#00B5B7",
    fontSize: "1.5em",
    marginLeft: "10px",
  };
  
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [tab, setTab] = useState(1);
 
  const toast = useToast()

  // let obj = {
  //   name: "Ajay Sahu",
  //   email: "ajaysahu@gmail.com",
  //   gender: "Male",
  // };
  
   const handleCancel = (id) =>{
    axios.patch(`http://localhost:8080/users/order/${id}`).then((res)=> { OrderArr()
    toast({
      title: 'Order Cancelled',
     position : "top",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })    
  })
   }
    
  useEffect(() => {
    OrderArr(setOrder);
  }, [page]);
  console.log(order);
  console.log(page , totalPage)
  return (
    <Box bg={"#F4F4F4"}>
      <Box
        w="80%"
        pl="5"
        pr="5"
        boxShadow='xs' p='6' rounded='md' bg='white'
        h={"500px"}
        margin={"auto"}
        mb="10"
        mt="10"
      >
        <Flex align={"Center"} pt="4" pb="4">
          {" "}
          {<ImHome2 style={Icon} />} {<FaAngleRight style={Icon} />}{" "}
          {infoArr[tab - 1]}
        </Flex>

       
            <Wrap
          zIndex={999}
          display={{ base: "block", sm: "block", md: "none" }}
          h={"100vh"}
          position={"fixed"}
          top={"90px"}
          right={"20"}
        >  <IconButton
        icon={<HamburgerIcon />}
        colorScheme={"teal"}
        ref={btnRef}
        onClick={onOpen}
      >
        Open
      </IconButton>
  <Drawer
        isOpen={isOpen}
        placement={"right"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Account Information</DrawerHeader>

          <DrawerBody>
            <MobileSideNav
              onClose={onClose}
              name={`HELLO ${name}`}  // user name
              
              setTab={setTab}
              tab={tab}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>   </Wrap>
        <Grid
          gridTemplateColumns= {{base : "100%" ,  sm : "100%" , md : " 24% 75%"}}
          h="80%"
          justifyContent={"space-between"}
        >
          <GridItem
            display = {{base : "none" , md : "block" ,  sm : "none" }}
            border={"1px solid blue"}
            boxShadow="2xl"
            rounded="md"
            bg="white"
          >
            {infoArr.map((el, index) => (
              <Box
                key={index}
                onClick={() => setTab(index + 1)}
                style={boxStyle(index + 1)}
              >
                <Text pt="4" pb="4" textAlign={"center"}>
                  {el}
                </Text>
              </Box>
            ))}
            <Flex justify={"center"}>
              <Button bg="transparent" onClick={handleLogOut} display={"block"}>
                Logout
              </Button>
            </Flex>
          </GridItem>
          <GridItem>
            <Heading size="md">{infoArr[tab - 1]}</Heading>

            {tab === 1 ? (
              order.map((el) => (
                <Stack
                  key={el._id}
                  divider={<StackDivider />}
                  spacing="4"
                  mt="3"
                >
                  <Box boxShadow="2xl" p="6" rounded="md" bg="white">
                    <Heading size="xs" textTransform="uppercase">
                      {el.title}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Item Price :{el.price}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      Quantity : {el.quantity}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      Payment Mode : {el.payment}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      Order Date : {el.date}
                    </Text>
                     
                    <Text pt="2" fontSize="sm">
                      Order Status : {el.status}
                    </Text>
                    {el.status === "Cancelled" && <Flex justify={{ sm : "center" , md : "right"}} > <Button mt = "2"  h={"30px"}  dispaly = "block" onClick = {()=>handleCancel(el._id)}  colorScheme="red"  >Cancel Order</Button> </Flex> } 
                  </Box>
                  <Paginantion
                    key={page}
                    page={page}
                    setPage={setPage}
                    divide={5}
                    totalPage={totalPage}
                  />
                </Stack>
              ))
            ) : tab === 2 ? (
              <Stack divider={<StackDivider />} spacing="4" mt="3">
                <Box boxShadow="2xl" p="6" rounded="md" bg="white">
                  <Heading size="xs" textTransform="uppercase">
                    {name}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {email}
                  </Text>
                  <Text pt="2" fontSize="sm">
                    {gender}
                  </Text>
                </Box>
              </Stack>
            ) : tab === 3 ? (
              <Stack divider={<StackDivider />} spacing="4" mt="3">
                <InitialFocus />
                <Box boxShadow="2xl" p="6" rounded="md" bg="white">
                  <Heading size="xs" textTransform="uppercase">
                    H.No:18 , Shivaji Colony Shivpury dist : Chhindwara
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Landmark : near school
                  </Text>
                  <Text pt="2" fontSize="sm">
                    Pin :480001 State MadhyaPradesh
                  </Text>
                </Box>
              </Stack>
            ) : tab === 4 ? (
              <Stack divider={<StackDivider />} spacing="4" mt="3">
                <Box boxShadow="2xl" p="6" rounded="md" bg="white">
                  <Heading size="xs" textTransform="uppercase">
                    Refer to your friends and get a Cash reward of Rs. 200
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    You can earn Rs. 200 by inviting your amzing friends. They
                    also get Rs. 200 off on their first order
                  </Text>
                  <Text pt="2" fontSize="sm">
                    <label>Friend Email ID</label>
                    <br />
                    <Input
                      border={"1px solid teal"}
                      m="3"
                      w="250px"
                      placeholder="Enter Friends Email Id"
                    ></Input>
                    <br />
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      m="3"
                      p="1"
                      w="100px"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Text>
                </Box>
              </Stack>
            ) : (
              ""
            )}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountInfo;
