import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Cart from "./pages/cart";

function App() {
  return (
    <div className="flex flex-col max-[640px]:m-0 justify-between max-[640px]:h-[90vh] h-[100vh]">
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/404" element={<Main />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
