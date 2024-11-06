import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Cart from "./pages/cart";
import Terms from "./pages/terms";
import About from "./pages/about";
import RestoreScrollWrapper from "./utils/restoreScrollWrapper";

function App() {
  return (
    <div className="flex flex-col max-[640px]:m-0 justify-between max-[640px]:h-[90vh] h-[100vh]">
      <main>
        <Navbar />
        <RestoreScrollWrapper>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/404" element={<Main />} />
          </Routes>
        </RestoreScrollWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default App;
