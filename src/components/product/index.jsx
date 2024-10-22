import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";

export default function Product({ item }) {
  const addItem = useCartStore((state) => state.addItem);
  // console.log(item.variants.edges[0].node.id);
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item) {
      addItem({
        id: item.variants.edges[0].node.id,
        title: item.title,
        price: item.priceRange.minVariantPrice.amount,
        img: null,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="p-20 flex gap-4 justify-between w-[50%]">
          <div>
            {item.title} {item.priceRange.minVariantPrice.amount}€<div>IN:</div>
            <div className="flex">
              <div>DIMENSIONS (cm):</div>
              <div>SIZE RECS:</div>
            </div>
            <div>SIZE RECS:</div>
            <div>PRODUCT DETAILS:</div>
            <div>Made in Ukraine.</div>
          </div>
          <div>
            <button className="hover:underline" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="bg-slate-200 h-[100vh] w-[50%]"></div>
      </div>
    </>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
