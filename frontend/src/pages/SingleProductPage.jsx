import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const SingleProductPage = () => {
  const [pic, setPic] = useState(
    "https://img3.hkrtcdn.com/26492/prd_2649142_o.jpg"
  );

  const handleClick = () => {
    setPic()
  }

  return (
    <Box>
      <Box
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
        mt={"2rem"}
        justifyContent={"center"}
      >
        <Box
          display={{ md: "flex" }}
          flexDirection={{ md: "column" }}
          gap={"1rem"}
          w={{ md: "10%" }}
        >
          <Image
            w={"50%"}
            src="https://img3.hkrtcdn.com/26492/prd_2649142_o.jpg"
          />
          <Image
            w={"50%"}
            src="https://img7.hkrtcdn.com/24891/prd_2489086-MuscleBlaze-Pre-Workout-Singha-0.55-lb-Tropical-Thunder_o.jpg"
          />
          <Image
            w={"50%"}
            src="https://img3.hkrtcdn.com/24891/prd_2489092-MuscleBlaze-Pre-Workout-Singha-0.55-lb-Tropical-Thunder_o.jpg"
          />
          <Image
            w={"50%"}
            src="https://img7.hkrtcdn.com/24891/prd_2489096-MuscleBlaze-Pre-Workout-Singha-0.55-lb-Tropical-Thunder_o.jpg"
          />
        </Box>
        <Box w={{ base: "80%", md: "40%" }}>
          <Image
            w={"80%"}
            src={pic}
          />
        </Box>
        <Box
          w={{ base: "80%", md: "40%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
        >
          <Box color={"green.300"}>Pre-Workout</Box>
          <Box>
            <Heading fontSize={"2xl"}>
              MuscleBlaze Pre Workout Singha, 250 g (0.55 lb), Tropical Thunder
            </Heading>
          </Box>
          <Box>By MuscleBlaze</Box>
          <Flex>
            MRP: <Text textDecoration={"line-through"}>₹1,749</Text>
          </Flex>
          <Box>Price: ₹1,199</Box>
          <Box display={{ md: "flex" }} gap={"1rem"}>
            <Flex
              alignItems={"center"}
              border={"1px solid white"}
              borderRadius={"md"}
              gap={"1rem"}
            >
              <Button>-</Button>1<Button>+</Button>
            </Flex>
            <Box
              mt={{ base: "2rem", md: "0" }}
              display={{ base: "flex" }}
              gap={"1rem"}
            >
              <Button
                bg={"orange.50"}
                color={"#ff8913"}
                border={"1px solid orange"}
              >
                Add to Cart
              </Button>
              <Button
                p={"1em 1em"}
                color={"white"}
                _hover={{ bg: "orange" }}
                bg={"#ff8913"}
              >
                Quick Buy
              </Button>
            </Box>
          </Box>
          <Box>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Weight
            </Text>
          </Box>
          <Box>
            <Button
              color={"#ff8913"}
              border={"1px solid orange"}
              _hover={{ bg: "orange.30" }}
              bg={"orange.30"}
            >
              250 G
            </Button>
          </Box>
          <Box>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Flavour
            </Text>
          </Box>
          <Box>
            <Button
              color={"#ff8913"}
              border={"1px solid orange"}
              _hover={{ bg: "orange.30" }}
              bg={"orange.30"}
            >
              Tropical Thunder
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        w={{ base: "80%", md: "50%" }}
        ml={{ base: "2rem", md: "35rem" }}
        mt={"2rem"}
        gap={"2rem"}
        alignItems={"center"}
        flexDirection={"column"}
        mb={"2rem"}
      >
        <Box>
          <Heading>Product Details</Heading>
        </Box>
        <Box
          p={"3rem"}
          borderRadius={"1em"}
          bg={"gray.100"}
          lineHeight={"2rem"}
        >
          <UnorderedList>
            <ListItem>
              Specially curated by Singha, this pre-workout is the perfect
              arsenal for an insane workout
            </ListItem>
            <ListItem>
              Powered with a unique combination of Caffeine and Theanine for
              sustained release of energy to annihilate iron
            </ListItem>
            <ListItem>
              Each serving of Singha OP comes with 5000 mg of Citrulline for
              that swole Singha pump
            </ListItem>
            <ListItem>
              It contains 4000 mg of quality Beta Alanine so that your endurance
              matches the level of a true athlete
            </ListItem>
            <ListItem>
              A mighty mix of 1000 mg Taurine and 5 mg BioPerine ensures
              laser-sharp focus and thermogenesis for better absorption of
              nutrients
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleProductPage;
