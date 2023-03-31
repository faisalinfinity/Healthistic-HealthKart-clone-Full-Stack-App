import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MainRoute from "./routes/MainRoute";

function App() {
  return (
    <>
      <Navbar />
      <MainRoute />
      <Footer />
    </>
  );
}

export default App;
