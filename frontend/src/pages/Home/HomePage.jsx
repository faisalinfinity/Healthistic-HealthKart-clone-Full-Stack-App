import { Box } from "@chakra-ui/react";
import React, { useEffect, useState} from "react";
import Accourdion from "./Accourdion";
import Carousel from "./Carousal";
import CarouselFirst from "./Carousel_First";
import CarouselFive from "./Carousel_Five";
import CarouselFour from "./Carousel_Four";

import CarouselOne from "./Carousel_One";
import CarouselThree from "./Carousel_Three";
import CarouselTwo from "./Carousel_Two";
import axios from "axios"
import CarouselSix from "./CarouselSix";
import { BASE_URL } from "../../constants/constants";
// const Link = ["${BASE_URL}/product?category=Ayurveda" , "${BASE_URL}/product?category=Vitamins","${BASE_URL}/product?category=Nutrients" , "${BASE_URL}/product?category=Food"]
 
 
 

const HomePage = () => {
  const [vitamin , setVitamin] = useState([])
  const [ayurveda , setAyurveda] = useState([])
  const [nutrients , setNutrients] = useState([])
  // const [food , setFood] = useState([])
 
  useEffect(()=>{
     axios.get(`${BASE_URL}/product?category=Ayurveda`).then((res) => setAyurveda(res.data.data))
     axios.get(`${BASE_URL}/product?category=Vitamins`).then((res) => setVitamin(res.data.data))
     axios.get(`${BASE_URL}/product?category=Nutrients`).then((res) => setNutrients(res.data.data))
    //  axios.get("${BASE_URL}/product?category=Food").then((res) => setFood(res.data.data))
  },[])
 
  return (
    <Box bg ="#F4F4F4">
      <Carousel />
      <CarouselOne nutrients = {nutrients} />
      <CarouselTwo vitamin = {vitamin} />
      <CarouselSix   />
      <CarouselFour ayurveda = {ayurveda}  />
      <CarouselThree  />
      
      <CarouselFirst />
      <CarouselFive />
       <Accourdion/>
    </Box>
  );
};

export default HomePage;
