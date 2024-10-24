import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Cart from "./pages/cart";

function App() {
  return (
    <div className="flex flex-col min-h-screen m-1 max-[640px]:m-0">
      <Navbar />
      {/* className="flex-1" */}
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
