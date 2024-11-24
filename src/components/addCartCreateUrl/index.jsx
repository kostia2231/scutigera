import { useState } from "react";
import { addToCart, getCheckoutUrl } from "../../utils/shopify";
import PropTypes from "prop-types";

export default function AddToCartButton({ items }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCartAndCheckout = async () => {
    setLoading(true);
    try {
      const cartResponse = await addToCart(items);
      const cartId = cartResponse.cartCreate.cart.id;
      localStorage.setItem("cartId", cartId);
      const checkoutResponse = await getCheckoutUrl(cartId);
      const checkoutUrl = checkoutResponse.cart.checkoutUrl;
      window.open(checkoutUrl, "_self");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={
          `ml-auto font-bold underline-offset-[3px] decoration-[1.5px] max-[640px]:decoration-[2px] hover:underline active:opacity-70` +
          ` opacity-20 cursor-not-allowed hover:no-underline`
        }
        // onClick={handleAddToCartAndCheckout}
        disabled={loading}
      >
        {loading ? "PROCEEDING..." : "PROCEED TO CHECKOUT"}
      </button>
    </>
  );
}

AddToCartButton.propTypes = {
  items: PropTypes.array,
};
