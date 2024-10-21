import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
