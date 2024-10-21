import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";

export default function Product({ item }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item) {
      addItem({
        id: item.id,
        title: item.title,
        price: item.priceRange.minVariantPrice.amount,
        img: null,
      });
    }
  };

  return (
    <div>
      <div>{item.title}</div>
      <div>{item.priceRange.minVariantPrice.amount}</div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
