import useCartStore from "../../store/storeCart";
import CartProduct from "../../components/cartProduct";
// import AddToCartButton from "../../components/addCartCreateUrl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCart } from "../../data/getCart";

// import { Link } from "react-router-dom";

export default function Cart() {
  const [currentCartId, setCurrentCartId] = useState(null);
  // const [currentCartUrl, setCurrentCartUrl] = useState(null);
  // const [isOpen, setIsOpen] = useState(true);
  const clearCart = useCartStore((state) => state.clearCart);

  // function onClick() {
  //   setIsOpen(false);
  //   localStorage.removeItem("cartId");
  // }

  // console.log(currentCartUrl);

  useEffect(() => {
    setCurrentCartId(localStorage.getItem("cartId"));
    if (currentCartId) {
      fetchCart(currentCartId)
        .then((data) => console.log(data.data.cart.checkoutUrl))
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
  // const cartData = cart.map((item) => ({
  //   id: item.id,
  //   quantity: item.quantity,
  // }));

  const withMailCartData = cart
    .map(
      (item) =>
        `${item.title}, QUANTITY: ${
          item.quantity
        }, SIZE: ${item.size.toUpperCase()}. `
    )
    .join("\n");

  return (
    <>
      <div className="flex py-20 px-[150px] max-[540px]:p-0 max-[540px]:pt-20 max-[870px]:flex-col max-[1200px]:px-[100px] max-[1100px]:px-[50px] max-[980px]:px-1">
        <div className="flex flex-col gap-1 w-[50%] max-[870px]:w-[100%] max-[870px]:order-3 h-fit">
          {cart.map((product, index) => (
            <>
              <motion.div
                style={{ willChange: "opacity, transform" }}
                key={product.id}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                <CartProduct product={product} count={index + 1} />
              </motion.div>
            </>
          ))}
        </div>
        <div className="w-[50%] min-[980px]:ml-1 flex flex-col gap-1 max-[870px]:w-[100%] max-[870px]:order-1 max-[540px]:p-0 max-[540px]:pb-10 max-[540px]:px-4 border-b h-fit pb-10 border-black-20 mb-10 border-dashed">
          <div className="flex justify-between">
            TOTAL <div className="font-bold">{getTotalPrice()}.0€</div>
          </div>
          <div className="z-10 flex justify-between">
            SHIPPING <div className="opacity-20">Calculated at checkout</div>
          </div>
          {cart.length > 0 ? (
            <div className="border-dashed border-black/80 px-auto border-[1px] w-full">
              <div className="py-1 mx-auto text-center w-fit">
                CHECKOUT IS COMING SOON. STAY TUNED.
                <br />
                <a
                  href={`mailto:info@scutigera.online?subject=ORDER <3&body=HEY! I'D LIKE TO ORDER: 
                    \n ${encodeURIComponent(withMailCartData)} \n HIT ME UP!`}
                  className="font-bold text-center w-fit underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline"
                >
                  ORDER BY EMAIL NOW
                </a>
              </div>
            </div>
          ) : null}
          {
            cart.length <= 0 ? (
              <div className="ml-auto">CART IS EMPTY </div>
            ) : null
            // <AddToCartButton items={cartData} />
          }
        </div>
        {/* {currentCartUrl && isOpen ? (
          <div className="flex justify-between bg-black z-20 fixed text-white bottom-0 left-0 right-0 max-[980px]:px-4 max-[980px]:py-1 max-[980px]:pt-1 px-1">
            <Link to={currentCartUrl}>
              <div className="bg-black">---&gt; UNFINISHED CHECKOUT</div>
            </Link>
            <button className="bg-black" onClick={onClick}>
              (X)
            </button>
          </div>
        ) : null} */}
      </div>
    </>
  );
}
