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
    <div className="flex gap-1 max-[540px]:mx-4 max-[540px]:justify-between pr-2 max-[640px]:pr-0">
      <div>{count}</div>
      <div
        className="bg-cover bg-center w-[40%] h-[300px] opacity-100 max-[540px]:h-[200px] max-[540px]:w-[50%] max-[870px]:w-[50%]"
        style={{ backgroundImage: `url("${product.img}")` }}
      ></div>
      <div className="flex flex-col gap-1 max-[540px]:w-[50%] w-[40%] max-[870px]:w-[50%]">
        <div className="flex justify-between gap-4">
          <div>&quot;{product.title}&quot;</div> <div>{product.price}€</div>
        </div>
        <div className="flex justify-between">
          SIZE <div>{product.size.toUpperCase()}</div>
        </div>
        <div className="flex justify-between">
          QUANTITY
          <div className="flex gap-1">
            <button
              className="underline-offset-[3px] decoration-[2px] hover:underline active:opacity-70"
              onClick={handleRemoveItem}
            >
              LESS
            </button>
            ({product.quantity})
            <button
              className="underline-offset-[3px] decoration-[2px] hover:underline active:opacity-70"
              onClick={handleAddToCart}
            >
              MORE
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          SUBTOTAL
          <div className="font-bold">{product.quantity * product.price}.0€</div>
        </div>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
};
