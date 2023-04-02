import style from "./MobDiv.module.css";
import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const MobDiv = () => {
  return (
    <Box mt={10}>
      <Grid className={style.container}>
        <Box w={"98%"} h={"700px"} border={"1px solid red"}>
          <Image
            h={"150%"}
            mt={"0px"}
            border={"1px solid red"}
            src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/download-App-IMG.svg"
          ></Image>
          <Box></Box>
        </Box>
        <Box w={"98%"} h={"400px"} border={"1px solid blue"}></Box>
      </Grid>
    </Box>
  );
};

export default MobDiv;
