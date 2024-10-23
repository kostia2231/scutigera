import useCartStore from "../../store/storeCart";
import CartProduct from "../../components/cartProduct";
import AddToCartButton from "../../components/addCartCreateUrl";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const cartData = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));


  return (
    <>
      <div className="flex justify-between m-20">
        <div className="flex flex-col gap-1 w-[50%]">
          {cart.map((product, index) => (
            <CartProduct key={product.id} product={product} count={index + 1} />
          ))}
        </div>
        <div className="w-[50%] pl-1 flex flex-col gap-1">
          <div className="flex justify-between">
            TOTAL <div>{getTotalPrice()}.0€</div>
          </div>
          <div className="flex justify-between">
            SHIPPING <div className="opacity-30">Calculated at checkout</div>
          </div>
          {cart.length <= 0 ? (
            <div className="ml-auto">CART IS EMPTY</div>
          ) : (
            <AddToCartButton items={cartData} />
          )}
        </div>
      </div>
    </>
  );
}
