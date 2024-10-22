import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";

export default function CartProduct({ product }) {
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
      <div className="bg-slate-100 w-[250px] h-[300px]"></div>
      <div className="flex flex-col gap-1">
        <div>
          {product.title} {product.price}€
        </div>
        <div>SIZE </div>
        <div className="flex justify-between">
          QUANTITY
          <div className="flex gap-2">
            <button onClick={handleRemoveItem}>-</button>
            {product.quantity}
            <button onClick={handleAddToCart}>+</button>
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
};
