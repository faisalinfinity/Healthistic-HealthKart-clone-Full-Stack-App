
import { Box } from '@chakra-ui/layout'
import React from 'react'
import Accoourdion from './Accoourdion'
import Carousel from "./Carousal"
import Carousel_1 from './Carousel_1'
import CarouselFive from './Carousel_Five'
import CarouselFour from './Carousel_Four'
 
import CarouselOne from './Carousel_One'
import CarouselThree from './Carousel_Three'
import CarouselTwo from './Carousel_Two'
 
 
 
 
 
 
 


const HomePage = () => {
  return (
     <Box style={{background :"#F4F4F4"}}  >
 < Carousel/>
  <CarouselOne/>
   <CarouselTwo/>
   <CarouselThree/>
   <CarouselFour/>
   <Carousel_1/>
   <CarouselFive/>
   <Accoourdion/>
    
     </Box>
  )
}

export default HomePage
