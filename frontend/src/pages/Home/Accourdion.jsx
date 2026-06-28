import React from "react";
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
  Container,
  Divider,
} from "@chakra-ui/react";

const Accourdion = () => {
  return (
    <Container maxW="7xl" my={{ base: 8, md: 12 }}>
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        bg="white"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="blackAlpha.100"
        boxShadow="sm"
        overflow="hidden"
      >
        <AccordionItem border="none">
          <h2>
            <AccordionButton py={5} px={6} _hover={{ bg: "brand.50" }}>
              <Heading size="md" flex="1" textAlign="left">
                More about Health, Nutrition & Bodybuilding Supplements
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={8} px={6} color="ink.500">
            <Heading size="sm" mt={3} color="ink.700">
              Your Health, Nutrition & Bodybuilding Destination
            </Heading>
            <UnorderedList mt={3} spacing={1}>
              <ListItem>Great online appearance</ListItem>
              <ListItem>Informational content</ListItem>
              <ListItem>
                Loyalty programs for a hassle-free, pocket-friendly experience
              </ListItem>
              <ListItem>Better services and authentic products</ListItem>
              <ListItem>
                Covering every requirement related to health and fitness
              </ListItem>
            </UnorderedList>

            <Heading size="sm" mt={5} color="ink.700">
              What Makes Healthistic Special?
            </Heading>
            <Text mt={3}>
              From whey protein, vitamin C tablets, fat burners, mass gainers
              and weight gainers to herbal supplements, Healthistic is your one
              stop shop.
            </Text>
            <UnorderedList mt={3} spacing={1}>
              <ListItem>The widest range of top bodybuilding supplements.</ListItem>
              <ListItem>Option to compare products before purchasing.</ListItem>
              <ListItem>Learn about the products you are purchasing in detail.</ListItem>
              <ListItem>Benefit from exclusive discounts and offers.</ListItem>
              <ListItem>Authentic products sourced directly from manufacturers.</ListItem>
              <ListItem>Highest safety standards.</ListItem>
              <ListItem>Easy return and delivery policies.</ListItem>
            </UnorderedList>

            <Divider my={5} />
            <Heading size="sm" color="ink.700">
              Affordable Health Supplements, A Click Away
            </Heading>
            <Text mt={3}>
              For all fitness enthusiasts, the right nutrition is of prime
              importance. Healthistic brings premium high-performance nutritional
              products and online health consultation under one portal — so you
              can compare, choose and purchase the right products for your goals.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default Accourdion;
