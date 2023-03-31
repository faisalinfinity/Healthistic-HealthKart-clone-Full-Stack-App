import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    UnorderedList,
    ListItem,
    Heading,
    Text,
    Box,
  } from '@chakra-ui/react'
const Accourdion = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple margin={"auto"} mt = "5" mb = "5" w = {"80%"}  >
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Heading size = "sm" flex='1' textAlign='left' mt = "4" mb = "4"  >
          More Details about Health, Nutrition & Body Building Supplements
          </Heading>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
         
         <Heading size = "sm" mt = "3" >
         HealthKart Health, Nutritional & Bodybuilding Supplements Destination
         </Heading>

         <UnorderedList mt = "3" >
 
  <ListItem> Great online appearance</ListItem>
  <ListItem> Informational content</ListItem>
  <ListItem> Loyalty programs for its customers to experience hassle-free and pocket-friendly shopping experiences. </ListItem>
  <ListItem>Better services and authentic products </ListItem>
  <ListItem>Overall, HealthKart focuses on covering every single requirement related to health and fitness. </ListItem>
</UnorderedList>

         <Heading size = "sm" mt = "3" >
         What Makes HealthKart Special?
         </Heading>
         <Text mt = "3" >
         HealthKart is dedicated to providing everything that you will need in your journey towards a fitter you. From whey protein, vitamin c tablet, fat burners, mass gainers, weight gainers to herbal supplements like shatavari churna, to other bodybuilding supplements and nutritional supplements that you need, HealthKart is your one stop shop. There are several features that set HealthKart apart, such as:
         </Text>
         <UnorderedList mt = "3" >
  <ListItem>The widest range of top bodybuilding supplements.</ListItem>
  <ListItem>Option to compare products before purchasing them.</ListItem>
  <ListItem>Learn about the products that you are purchasing in detail.</ListItem>
  <ListItem> Benefit from exclusive discounts and offers.</ListItem>
  <ListItem> Buy only authentic products sourced directly from the manufacturers.</ListItem>
  <ListItem>Highest safety standards. </ListItem>
  <ListItem> Easy return and delivery policies.</ListItem>
</UnorderedList>

         <Box border ="0.1px solid gray"  mt = "1" mb = "1" />
         <Heading size = "sm" mt = "3"  >
         House Of HealthKart: Affordable Health Supplements Are At A Click Away
         </Heading>

         <Text mt = "3" >
         For all fitness enthusiasts, the right nutrition is of prime importance. Ensuring that your body gets the fuel it needs to keep up with your rigorous fitness regime is not easy, given the time constraints and busy schedules. HealthKart resolves this dilemma by bringing to you premium high-performance top nutritional products and online health consultation under one portal. This allows you to compare, choose and purchase the right products for your requirements and to match your training schedule perfectly. HealthKart is your ideal platform for all nutrition, health and fitness products. We serve millions of customers through our dedicated online and offline channels to ensure that they are able to reach their fitness goals, whether they are general or specific.
         </Text>
      <Box border ="0.1px solid gray" mt = "1" mb = "1"/>
         <Heading size = "sm" mt = "3" >
         Sports Nutrition Supplement : Fuel Your Workout Regime
         </Heading>
         <Text mt = "3" mb = "3" >
         Our sports nutrition supplements range include a variety of powders, drinks, and pills that are especially formulated to enhance athletic performance or fill the dietary gaps who are into sports or workout on a regular basis. But we recommend talking to your doctor first before choosing any supplement to avoid any side effects in the future. Because working with a dietician or specialist will help you make the best decision about including sports supplements in your diet to meet your athletic and health goals.
         </Text>

          
    
      </AccordionPanel>
    </AccordionItem>
  
    
  </Accordion>
  )
}

export default Accourdion


