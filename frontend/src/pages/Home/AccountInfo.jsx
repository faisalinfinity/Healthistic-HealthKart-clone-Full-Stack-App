import {
  Box,
  Stack,
  StackDivider,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  
} from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { ImHome2 } from "react-icons/im";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Input } from "@chakra-ui/react";
import InitialFocus from "./Modal";

const OrderArr = async (setOrder) => {
  let res = await axios({
    url: "http://localhost:8080" + `/users/order`,
    method: "get",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0M2I0NmVhN2FhMDU3YTI3ODI4YWUiLCJpYXQiOjE2ODAyNTQyOTB9.QZKzn9DyD49gbXdABVklO-BekIlk5xD8PrjQ5FhfAhk`,
    },
  });

  setOrder(res.data.data, "order");
};

const AccountInfo = () => {
  const infoArr = [
    "My Orders",
    "Personal Information",
    "Addresses",
    "Refer and Earn",
    "Logout",
  ];
  const boxStyle = (index) => {
    return {
      borderLeftWidth: index === tab ? "4px" : "0px",
      borderLeftColor: index === tab ? "blue" : "while",
      color: index === tab ? "black" : "gray",
      backgroundColor: index === tab ? "While" : "#F4F4F4",
      paddingLeft: "1rem",
    };
  };

  const Icon = {
    color: "#00B5B7",
    fontSize: "1.5em",
    marginLeft: "10px",
  };

  const [order, setOrder] = useState([]);

  const [tab, setTab] = useState(1);
  // const { name, email, token, gender, profile } = useSelector(
  //   (state) => state.authReducer
  // );

  let obj = {
    name : "Ajay Sahu" , email : "ajaysahu@gmail.com", gender :"Male"
  }

  useEffect(() => {
    OrderArr(setOrder);
  }, []);
     console.log(order);
  return (
    <Box bg={"#F4F4F4"}>
      <Box
        w="80%"
        border={"1px solid black"}
        h={"500px"}
        margin={"auto"}
        mb="10"
        mt="10"
      >
        <Flex align={"Center"} pt="4" pb="4">
          {" "}
          {<ImHome2 style={Icon} />} {<FaAngleRight style={Icon} />}{" "}
          {infoArr[tab-1]}
        </Flex>
        <Grid
          gridTemplateColumns={"24% 75%"}
          h="80%"
          justifyContent={"space-between"}
        >
          <GridItem
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
          </GridItem>
          <GridItem  >
            <Heading size="md">{infoArr[tab-1]}</Heading>

            {tab == 1 ?
              order.map((el) => (
                <Stack key={el._id} divider={<StackDivider /> } spacing="4" mt = "3" >
                  <Box boxShadow="2xl" p="6" rounded="md" bg="white"  >
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
                  </Box>
                </Stack>
              )) : tab==2 ? <Stack  divider={<StackDivider />} spacing="4" mt = "3" >
              <Box boxShadow="2xl" p="6" rounded="md" bg="white"  >
                <Heading size="xs" textTransform="uppercase">
                  {obj.name}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {obj.email}
                </Text>
                <Text pt="2" fontSize="sm">
                   {obj.gender}
                </Text>
                
              </Box>
            </Stack>: tab==3 ?  <Stack  divider={<StackDivider />} spacing="4" mt = "3" >
            <InitialFocus />
              <Box boxShadow="2xl" p="6" rounded="md" bg="white"  >
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
            </Stack> : tab==4? <Stack  divider={<StackDivider />} spacing="4" mt = "3" >
               
              <Box boxShadow="2xl" p="6" rounded="md" bg="white"  >
                <Heading size="xs" textTransform="uppercase">
                Refer to your friends and get a Cash
reward of Rs. 200
                </Heading>
                <Text pt="2" fontSize="sm">
                You can earn Rs. 200 by inviting your amzing friends. They also get Rs. 200 off on their first order
                </Text>
                <Text pt="2" fontSize="sm">
                   <label>Friend Email ID</label><br/>
                   <Input m  = "3" w = "250px" placeholder="Enter Friends Email Id" ></Input>   <br/>
                   <Button m = "3" p = "1" w="100px" type = "submit"  >Submit</Button>               
                </Text>
                
              </Box>
            </Stack> :""
               
              }
              

              
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountInfo;
