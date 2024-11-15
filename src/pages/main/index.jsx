import Product from "../../components/product";
import useCartStore from "../../store/storeCart";
import { fetchCart } from "../../data/getCart";
import { useProducts } from "../../data/getData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Main() {
  const [currentCartId, setCurrentCartId] = useState(null);
  const clearCart = useCartStore((state) => state.clearCart);

  const { data } = useProducts();
  const products = data?.data.products.edges;

  useEffect(() => {
    setCurrentCartId(localStorage.getItem("cartId"));
    if (currentCartId) {
      fetchCart(currentCartId)
        .then(data.data.cart.checkoutUrl)
        .catch(
          (error) => (
            console.log(error.message),
            console.clear(),
            localStorage.removeItem("cartId"),
            clearCart()
          )
        );
    }
  }, [currentCartId]);

  return (
    <div className="flex flex-col max-[640px]:mx-4 max-[640px]:pt-[31px] pb-10">
      {products?.map((item, index) => (
        <motion.div
          key={item.node.id}
          style={{ willChange: "opacity, transform" }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.2,
            ease: "easeOut",
          }}
        >
          <Product item={item.node} id={item.node.id} />
        </motion.div>
      ))}
    </div>
  );
}
