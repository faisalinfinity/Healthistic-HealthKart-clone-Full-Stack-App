import "./App.css";
import AddProduct from "./admin/components/AddProducts";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from  "./pages/Home/HomePage";
 

function App() {
  return (
    <>
      <Navbar />
     <HomePage/> 
      <Footer /> 
       {/* <AddProduct/> */}
       
    </>
   
  );
}

export default App;
