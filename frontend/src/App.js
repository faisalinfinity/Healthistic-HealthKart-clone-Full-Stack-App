import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MainRoute from "./routes/MainRoute";

function App() {
  return (
    <Flex direction="column" minH="100vh" bg="paper">
      <Navbar />
      <Box as="main" flex="1">
        <MainRoute />
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
