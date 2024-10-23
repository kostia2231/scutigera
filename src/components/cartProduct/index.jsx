import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";

export default function CartProduct({ product, count }) {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        img: null,
      });
    }
  };
  const handleRemoveItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex gap-1">
      <div>{count}</div>
      <div
        className="bg-cover bg-center w-[250px] h-[300px] opacity-100"
        style={{ backgroundImage: `url("${product.img}")` }}
      ></div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div> {product.title}</div> <div>{product.price}€</div>
        </div>
        <div className="flex justify-between">
          SIZE <div>{product.size.toUpperCase()}</div>
        </div>
        <div className="flex justify-between">
          QUANTITY
          <div className="flex gap-2">
            <button
              className="hover:bg-black hover:text-white active:opacity-70"
              onClick={handleRemoveItem}
            >
              -
            </button>
            {product.quantity}
            <button
              className="hover:bg-black hover:text-white active:opacity-70"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          SUBTOTAL <div>{product.quantity * product.price}.0€</div>
        </div>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
};
