import { Box } from '@chakra-ui/react'
import React from 'react'
import Carousel from "./Carousal"
import Carousel_1 from './Carousel_1'
import CarouselFive from './Carousel_Five'
import CarouselFour from './Carousel_Four'
 
import CarouselOne from './Carousel_One'
import CarouselThree from './Carousel_Three'
import CarouselTwo from './Carousel_Two'
import MobDiv from './MobDiv'
 
 
 
 
 
const ajHome = {
    
}
 


const HomePage = () => {
  return (
     <Box style={ajHome}  >
 < Carousel/>
  <CarouselOne/>
   <CarouselTwo/>
   <CarouselThree/>
   <CarouselFour/>
   <Carousel_1/>
   <CarouselFive/>
   {/* <MobDiv/> */}
    
     </Box>
  )
}

export default HomePage
