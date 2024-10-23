import { useState } from "react";
import { addToCart, getCheckoutUrl } from "../../utils/shopify";
import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";

export default function AddToCartButton({ items }) {
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const handleAddToCartAndCheckout = async () => {
    setLoading(true);
    try {
      const cartResponse = await addToCart(items);
      const cartId = cartResponse.cartCreate.cart.id;

      const checkoutResponse = await getCheckoutUrl(cartId);
      const checkoutUrl = checkoutResponse.cart.checkoutUrl;

      window.open(checkoutUrl, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      clearCart();
    }
  };

  return (
    <>
      <button
        className="ml-auto hover:underline"
        onClick={handleAddToCartAndCheckout}
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
