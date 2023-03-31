import { Box } from "@chakra-ui/react";
import React, { useEffect, useState} from "react";
import Accourdion from "./Accourdion";
import Carousel from "./Carousal";
import Carousel_1 from "./Carousel_1";
import CarouselFive from "./Carousel_Five";
import CarouselFour from "./Carousel_Four";

import CarouselOne from "./Carousel_One";
import CarouselThree from "./Carousel_Three";
import CarouselTwo from "./Carousel_Two";
import axios from "axios"
import CarouselSix from "./CarouselSix";
const Link = ["http://localhost:8080/product?category=Ayurveda" , "http://localhost:8080/product?category=Vitamins","http://localhost:8080/product?category=Nutrients" , "http://localhost:8080/product?category=Food"]
 
 
 

const HomePage = () => {
  const [vitamin , setVitamin] = useState([])
  const [ayurveda , setAyurveda] = useState([])
  const [nutrients , setNutrients] = useState([])
  const [food , setFood] = useState([])
  useEffect(()=>{
     axios.get("http://localhost:8080/product?category=Ayurveda").then((res) => setAyurveda(res.data.data))
     axios.get("http://localhost:8080/product?category=Vitamins").then((res) => setVitamin(res.data.data))
     axios.get("http://localhost:8080/product?category=Nutrients").then((res) => setNutrients(res.data.data))
     axios.get("http://localhost:8080/product?category=Food").then((res) => setFood(res.data.data))
  },[])
  console.log(ayurveda, "ayu");
  return (
    <Box bg ="#F4F4F4">
      <Carousel />
      <CarouselOne nutrients = {nutrients} />
      <CarouselTwo vitamin = {vitamin} />
      <CarouselSix   />
      <CarouselFour ayurveda = {ayurveda}  />
      <CarouselThree  />
      
      <Carousel_1 />
      <CarouselFive />
       <Accourdion/>
    </Box>
  );
};

export default HomePage;
