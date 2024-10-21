import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Cart from "./pages/cart";

function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] m-1">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
