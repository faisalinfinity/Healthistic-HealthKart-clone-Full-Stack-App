import { Badge, Box, Flex, Heading, HStack, Image, VStack } from "@chakra-ui/react";

export default function StatsBox({name,count,bcolor,image,size,color,classname,br}){


    return <Box borderRadius={br} boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"}    color={"teal"}>

        <Flex gap={2} justify={"center"} alignItems={"center"} padding={2} w={"100%"}>
            <VStack>
                <HStack alignItems={"start"} justify={"center"}>
                    <Badge colorScheme={bcolor}>{name}</Badge>
                </HStack>
                <Heading>{count}</Heading>
            </VStack>
            <Image w={50} src={image}></Image>

        </Flex>


    </Box>


}