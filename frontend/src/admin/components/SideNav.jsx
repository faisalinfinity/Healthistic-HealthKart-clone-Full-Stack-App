import { Badge, Box, Button, Flex, Heading, VStack, Icon } from "@chakra-ui/react";
import { MdDashboard, MdAddBox, MdEdit, MdListAlt } from "react-icons/md";

const NAV = [
  { label: "Dashboard", icon: MdDashboard },
  { label: "Add Products", icon: MdAddBox },
  { label: "Edit Products", icon: MdEdit },
  { label: "Manage Orders", icon: MdListAlt },
];

export default function SideNav({ setTab, tab, name, role }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      boxShadow="sm"
      overflow="hidden"
    >
      <Flex
        direction="column"
        align="center"
        gap={1}
        p={5}
        bgGradient="linear(to-br, brand.600, brand.500)"
        color="white"
      >
        <Heading fontSize="md">{name}</Heading>
        <Badge bg="whiteAlpha.300" color="white">
          {role}
        </Badge>
      </Flex>

      <VStack align="stretch" spacing={1} p={3}>
        {NAV.map((item, i) => {
          const active = tab === i + 1;
          return (
            <Button
              key={item.label}
              variant={active ? "solid" : "ghost"}
              justifyContent="flex-start"
              leftIcon={<Icon as={item.icon} boxSize="18px" />}
              color={active ? "white" : "ink.600"}
              fontWeight={active ? "700" : "500"}
              onClick={() => setTab(i + 1)}
            >
              {item.label}
            </Button>
          );
        })}
      </VStack>
    </Box>
  );
}
