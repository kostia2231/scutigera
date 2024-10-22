import { useState } from "react";
import { addToCart, getCheckoutUrl } from "../../utils/shopify";

export default function AddToCartButton({ items }) {
  const [loading, setLoading] = useState(false); // Состояние для управления загрузкой
  console.log(items);
  const handleAddToCartAndCheckout = async () => {
    setLoading(true); // Включаем индикатор загрузки
    try {
      // 1. Добавляем товар в корзину
      const cartResponse = await addToCart(items);
      const cartId = cartResponse.cartCreate.cart.id;

      // 2. Получаем ссылку на оформление заказа
      const checkoutResponse = await getCheckoutUrl(cartId);
      const checkoutUrl = checkoutResponse.cart.checkoutUrl;

      // 3. Перенаправляем пользователя на страницу оплаты
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Отключаем индикатор загрузки
    }
  };

  return (
    <>
      <button
        className="ml-auto"
        onClick={handleAddToCartAndCheckout}
        disabled={loading} // Отключаем кнопку при загрузке
      >
        {loading ? "loading..." : "PROCEED TO CHECKOUT"}
      </button>
    </>
  );
}
