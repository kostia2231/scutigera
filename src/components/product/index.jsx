import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";
import { useState } from "react";

export default function Product({ item }) {
  const addItem = useCartStore((state) => state.addItem);
  console.log(item);
  const [selectedVariantId, setSelectedVariantId] = useState(
    item.variants.edges[0].node.id
  );
  const [selectedSize, setSelectedSize] = useState(
    item.variants.edges[0].node.title
  );

  const variants = item.variants.edges.map((v) => ({
    size: v.node.title,
    id: v.node.id,
  }));
  console.log(variants);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item) {
      addItem({
        id: selectedVariantId,
        title: item.title,
        price: item.priceRange.minVariantPrice.amount,
        size: selectedSize,
        img: item.featuredImage.url,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="p-20 flex gap-4 justify-between w-[50%]">
          <div>
            {item.title} {item.priceRange.minVariantPrice.amount}€
            <div className="flex gap-1">
              IN:
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setSelectedSize(variant.size);
                  }}
                  className={`${
                    selectedVariantId === variant.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {variant.size.toUpperCase()}
                </button>
              ))}
            </div>
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
        <div
          className="bg-cover bg-center h-[100vh] w-[50%]"
          style={{ backgroundImage: `url("${item.featuredImage.url}")` }}
        ></div>
      </div>
    </>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
