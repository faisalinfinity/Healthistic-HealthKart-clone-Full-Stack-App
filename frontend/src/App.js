import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MainRoute from "./routes/MainRoute";
import Payment from "./pages/Payment";

import HomePage from "./pages/Home/HomePage";
import AccountInfo from "./pages/Home/AccountInfo";
import MultiProductPage from "./pages/MultiProductPage";

function App() {
  return (
    <>

      <Navbar />
      <MainRoute />
      <Footer />
      {/* <MultiProductPage /> */}
    </>
  );
}

export default App;
