import useCartStore from "../../store/storeCart";
import CartProduct from "../../components/cartProduct";
import AddToCartButton from "../../components/addCartCreateUrl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCart } from "../../data/getCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const [currentCartId, setCurrentCartId] = useState(null);
  const [currentCartUrl, setCurrentCartUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const clearCart = useCartStore((state) => state.clearCart);

  function onClick() {
    setIsOpen(false);
    localStorage.removeItem("cartId");
  }

  // console.log(currentCartUrl);

  useEffect(() => {
    setCurrentCartId(localStorage.getItem("cartId"));
    if (currentCartId) {
      fetchCart(currentCartId)
        .then((data) => setCurrentCartUrl(data.data.cart.checkoutUrl))
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

  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const cartData = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  return (
    <>
      <div className="flex p-20 max-[640px]:p-0 max-[640px]:pt-20 max-[640px]:flex-col min-[1275px]:px-[100px]">
        <div className="flex flex-col gap-1 w-[50%] max-[640px]:w-[100%] max-[640px]:order-3">
          {cart.map((product, index) => (
            <>
              <motion.div
                style={{ willChange: "opacity, transform" }}
                key={product.id}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                <CartProduct product={product} count={index + 1} />
              </motion.div>
            </>
          ))}
        </div>
        <div className="w-[50%] ml-2 max-[640px]:ml-0  flex flex-col gap-1 max-[640px]:w-[100%] max-[640px]:order-1 max-[640px]:p-0 max-[640px]:pb-10 max-[640px]:px-4 border-b h-fit pb-10 border-black-20 mb-10">
          <div className="flex justify-between">
            TOTAL <div className="font-bold">{getTotalPrice()}.0€</div>
          </div>
          <div className="z-10 flex justify-between">
            SHIPPING <div className="opacity-20">Calculated at checkout</div>
          </div>
          {cart.length <= 0 ? (
            <div className="ml-auto">CART IS EMPTY</div>
          ) : (
            <AddToCartButton items={cartData} />
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 m-1 text-center text-white bg-black z-11">
          {currentCartUrl && isOpen ? (
            <motion.div className="flex justify-between px-2">
              <Link to={currentCartUrl}>
                <div>---&gt; UNFINISHED CHECKOUT</div>
              </Link>
              <button onClick={onClick}>(X)</button>
            </motion.div>
          ) : null}
        </div>
      </div>
    </>
  );
}
