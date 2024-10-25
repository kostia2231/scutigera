import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";
import { useState } from "react";
import { products } from "../../productsClientData";

export default function Product({ item }) {
  const matchedProduct = products.find((product) => product.id === item.id);
  const addItem = useCartStore((state) => state.addItem);
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
      <div className="flex items-center justify-between max-[640px]:flex-col">
        <div className="p-20 flex gap-20 justify-between w-[50%] max-[640px]:w-[100%] max-[640px]:order-2 max-[640px]:py-0 max-[640px]:px-0 max-[640px]:gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {item.title}
              <div className="font-bold">
                {item.priceRange.minVariantPrice.amount}€
              </div>
            </div>
            <div className="flex gap-1">
              IN:
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setSelectedSize(variant.size);
                    console.log(variant.size);
                  }}
                  className={`${
                    selectedVariantId === variant.id
                      ? "bg-transparent text-black font-bold underline-offset-2 underline opacity-65"
                      : "bg-white text-black opacity-30"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
            <div className="flex gap-4 max-[1124px]:flex-col max-[640px]:flex-row">
              <div>
                <div className="flex">
                  <div>DIMENSIONS (cm):</div>
                </div>
                <div className="flex gap-2">
                  {/* названия */}
                  <div>
                    <div>Size</div>
                    <div>Chest</div>
                    {matchedProduct.dimensions.waist && (
                      <>
                        <div>Waist</div>
                      </>
                    )}
                    <div>Length</div>
                  </div>
                  {/* первая колонка */}
                  <div
                    className={`${
                      selectedSize === "Medium" || selectedSize === "Large"
                        ? "opacity-20"
                        : null
                    }`}
                  >
                    <div>{matchedProduct.dimensions.size.first}</div>
                    <div>{matchedProduct.dimensions.chest.first}</div>
                    {matchedProduct.dimensions.waist && (
                      <>
                        <div>{matchedProduct.dimensions.waist.first}</div>
                      </>
                    )}
                    <div>{matchedProduct.dimensions.length.first}</div>
                  </div>
                  {/* вторая колонка */}
                  <div
                    className={`${
                      selectedSize === "Small" ? "opacity-20" : null
                    }`}
                  >
                    <div>{matchedProduct.dimensions.size.second}</div>
                    <div>{matchedProduct.dimensions.chest.second}</div>
                    {matchedProduct.dimensions.waist && (
                      <>
                        <div>{matchedProduct.dimensions.waist.second}</div>
                      </>
                    )}
                    <div>{matchedProduct.dimensions.length.second}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div>SIZE RECS:</div>
                </div>
                <div
                  className={`${
                    selectedSize === "Medium" || selectedSize === "Large"
                      ? "opacity-20"
                      : null
                  }`}
                >
                  <div>{matchedProduct.dimensions.size.first}</div>
                  <div>{matchedProduct.sizeRecommendations.first}</div>
                </div>
                <div
                  className={`${
                    selectedSize === "Small" ? "opacity-20" : null
                  }`}
                >
                  <div>{matchedProduct.dimensions.size.second}</div>
                  <div>{matchedProduct.sizeRecommendations.second}</div>
                </div>
              </div>
            </div>
            <div>
              PRODUCT DETAILS:
              {matchedProduct && (
                <div>
                  {matchedProduct.details.fit},{" "}
                  {matchedProduct.details.material}.
                </div>
              )}
              <div>Made in Ukraine.</div>
            </div>
          </div>
          <div>
            <button
              className="inline-block w-[75px] hover:underline active:opacity-70 underline-offset-2 font-bold"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div
          className="bg-cover bg-center h-[100vh] w-[50%] max-[640px]:w-[100%] max-[640px]:order-1 max-[640px]:h-[70vh]"
          style={{ backgroundImage: `url("${item.featuredImage.url}")` }}
        ></div>
      </div>
    </>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
};
