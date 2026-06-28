import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function StatsBox({ name, count, image }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      boxShadow="sm"
      p={5}
      transition="all 0.2s"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
    >
      <Flex justify="space-between" align="center" gap={3}>
        <Box>
          <Text fontSize="sm" fontWeight="600" color="ink.400">
            {name}
          </Text>
          <Heading size="lg" color="ink.800" mt={1}>
            {count}
          </Heading>
        </Box>
        <Flex
          boxSize="52px"
          align="center"
          justify="center"
          borderRadius="xl"
          bg="brand.50"
          flexShrink={0}
        >
          <Image w="28px" h="28px" objectFit="contain" src={image} alt={name} />
        </Flex>
      </Flex>
    </Box>
  );
}
