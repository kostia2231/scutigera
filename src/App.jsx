import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import Terms from "./pages/terms";
import About from "./pages/about";
import RestoreScrollWrapper from "./utils/restoreScrollWrapper";
import Impressum from "./pages/impressum";
import Shipping from "./pages/shipping";
import { Suspense, lazy } from "react";
const Footer = lazy(() => import("./components/footer"));
import { useLocation } from "react-router-dom";

function App() {
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const location = useLocation();
  const show = location.pathname !== "/" || isProductLoaded;

  return (
    <div className="flex flex-col max-[640px]:m-0 justify-between max-[640px]:h-[90vh] h-[100vh]">
      <main>
        <Navbar />
        <RestoreScrollWrapper>
          <Routes>
            <Route
              path="/"
              element={<Main onLoad={() => setIsProductLoaded(true)} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/404"
              element={<Main onLoad={() => setIsProductLoaded(true)} />}
            />
          </Routes>
        </RestoreScrollWrapper>
      </main>
      {show && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

export default App;
