import PropTypes from "prop-types";
import useCartStore from "../../store/storeCart";
import ImgSlider from "../imgSlider";
import { useState, useEffect } from "react";
import { products } from "../../productsClientData";
import { Link } from "react-router-dom";

export default function Product({ item, id }) {
  const matchedProduct = products.find((product) => product.id === item.id);
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    item.variants.edges[0].node.id
  );
  const [selectedSize, setSelectedSize] = useState(
    item.variants.edges[0].node.title
  );
  const [selectedAvailableForSale, setSelectedAvailableForSale] = useState(
    item.variants.edges[0].node.availableForSale
  );
  const variants = item.variants.edges.map((v) => ({
    size: v.node.title,
    id: v.node.id,
    availableForSale: v.node.availableForSale,
  }));
  const imgUrls = item.images.edges.map((i) => ({
    url: i.node.url,
  }));

  const handleAddToCart = (e) => {
    setIsAdded(true);
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

  useEffect(() => {
    if (!selectedAvailableForSale) {
      const availableVariant = variants.find(
        (variant) => variant.availableForSale
      );
      if (availableVariant) {
        setSelectedVariantId(availableVariant.id);
        setSelectedSize(availableVariant.size);
        setSelectedAvailableForSale(availableVariant.availableForSale);
      }
    }
  }, []);

  const handleSizeClick = (variant) => {
    setSelectedAvailableForSale(variant.availableForSale);
    setSelectedVariantId(variant.id);
    setSelectedSize(variant.size);
    setIsAdded(false);
  };

  return (
    <>
      <div className="flex items-center max-[980px]:flex-col">
        <div className="max-[640px]:px-0 p-20 flex flex-col gap-2 w-[50%] max-[980px]:w-[100%] max-[980px]:order-2 max-[980px]:py-0 max-[980px]:px-1 max-[980px]:gap-2 px-[150px] max-[1200px]:px-[100px] max-[1100px]:px-[50px]">
          <div className="flex h-[15px]">
            <div className="flex gap-2">
              {item.title}
              <div className="font-bold">
                {item.priceRange.minVariantPrice.amount}€
              </div>
            </div>
            <div className="right-0 ml-auto">
              {!isAdded ? (
                <button
                  className={`inline-block w-fit active:opacity-70 underline-offset-[3px] decoration-[1.5px] font-bold max-[640px]:no-underline ${
                    !selectedAvailableForSale
                      ? "opacity-20 cursor-not-allowed hover:no-underline"
                      : "hover:underline max-[640px]:hover:no-underline"
                  }`}
                  onClick={!selectedAvailableForSale ? null : handleAddToCart}
                >
                  {!selectedAvailableForSale ? "SOLD OUT" : "ADD TO CART"}
                </button>
              ) : (
                <Link to="/cart">
                  <button className="inline-block  w-fit underline active:opacity-70 underline-offset-[3px] decoration-[1.5px] font-bold max-[640px]:border-b-2 max-[640px]:no-underline border-black/80">
                    GO TO CART
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              SIZE:
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleSizeClick(variant)}
                  className={`${
                    selectedVariantId === variant.id
                      ? "bg-transparent text-black/80 font-bold underline-offset-[3px] decoration-[1.5px] underline max-[640px]:border-b-2 max-[640px]:no-underline border-black"
                      : "bg-white text-black/80 opacity-20 transition ease-in-out duration-200"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
            <div className="flex gap-2 max-[1124px]:flex-col max-[980px]:flex-row">
              <div>
                <div className="flex">
                  <div>DIMENSIONS (cm):</div>
                </div>
                <div className="flex gap-2">
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
                  <div
                    className={`${
                      selectedSize === "Medium" || selectedSize === "Large"
                        ? "opacity-20 transition ease-in-out duration-200"
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
                  <div
                    className={`${
                      selectedSize === "Small"
                        ? "opacity-20 transition ease-in-out duration-200"
                        : null
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
                      ? "opacity-20 transition ease-in-out duration-200"
                      : null
                  }`}
                >
                  <div>{matchedProduct.dimensions.size.first}</div>
                  <div>{matchedProduct.sizeRecommendations.first}</div>
                </div>
                <div
                  className={`${
                    selectedSize === "Small"
                      ? "opacity-20 transition ease-in-out duration-200"
                      : null
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
        </div>
        <div className="w-[50%] max-[980px]:w-[100vw] max-[980px]:order-1 max-[980px]:py-4">
          <ImgSlider imgUrls={imgUrls} id={id} />
        </div>
      </div>
    </>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
