import useCartStore from "../../store/storeCart";
import CartProduct from "../../components/cartProduct";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div className="m-20 flex justify-between">
      <div className="flex flex-col gap-1 w-[50%]">
        {cart.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="w-[50%] pl-1 flex flex-col gap-1">
        <div className="flex justify-between">
          TOTAL <div>{getTotalPrice()}.0€</div>
        </div>
        <div className="flex justify-between">
          SHIPPING <div>Calculated at checkout</div>
        </div>
        <button className="ml-auto">PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}
