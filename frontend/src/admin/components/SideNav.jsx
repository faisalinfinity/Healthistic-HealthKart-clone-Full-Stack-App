import { Badge, Button, Center, Flex, Heading, VStack } from "@chakra-ui/react"

export default function SideNav({setTab ,tab,name,role}){
    


    return <VStack  display={{base:"none",sm:"none",md:"none",lg:"block"}} borderTopRightRadius={20} padding={"8px 0px"} h={"100vh"} className="sidebar" w={"25%"}>

    <Flex justifyContent={"center"} maxH={150} padding={2} border={"1px solid orange"} borderRadius={6} alignItems={"center"} margin={"auto"} w={"90%"}>
        <VStack>
            <Center> <Heading fontSize={"md"}  color={"orange"}>{name}</Heading>
        <Badge colorScheme={"green"} >{role}</Badge></Center>
       
        </VStack>
        {/* <CardAvatar name={name} role ={role}></CardAvatar> */}
    </Flex>

    <VStack gap={4} w={"100%"}>
        
    <Button variant={"outline"} borderColor={"teal"}  bg={tab==1&&"teal"} color={tab==1?"white":"teal"} w={"90%"} onClick={()=>{
        setTab(1)
    }}>Dashboard</Button>
    <Button variant={"outline"}  borderColor={"teal"} bg={tab==2&&"teal"} color={tab==2?"white":"teal"} w={"90%"} onClick={()=>{
        setTab(2)
    }}>Add Products</Button>
    <Button variant={"outline"} borderColor={"teal"} bg={tab==3&&"teal"}  color={tab==3?"white":"teal"}w={"90%"} onClick={()=>{
        setTab(3)
    }}>Edit Products</Button>
    <Button variant={"outline"} borderColor={"teal"} bg={tab==4&&"teal"}  color={tab==4?"white":"teal"} w={"90%"} onClick={()=>{
        setTab(4)
    }}>Manage Orders</Button>
   
    
   
    </VStack>



</VStack>
}