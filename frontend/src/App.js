import "./App.css";
import AddProduct from "./admin/components/AddProducts";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import SingleProductPage from "./pages/SingleProductPage";

import HomePage from  "./pages/Home/HomePage";

 
function App() {
  return (
    <>
    
      <SingleProductPage />

      <Navbar />
     <HomePage/> 
      <Footer /> 
     
    </>
   
  );
}

export default App;
