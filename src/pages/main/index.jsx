import Product from "../../components/product";
import { useProducts } from "../../data/getData";
import { useEffect, useState } from "react";

export default function Main() {
  const { data } = useProducts();
  const products = data?.data.products.edges;
  const [renderedProducts, setRenderedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      document.startViewTransition?.(() => {
        setRenderedProducts(products);
      });
    }
  }, [products]);

  return (
    <div className="flex flex-col max-[640px]:mx-4 max-[640px]:pt-[31px] pb-10">
      {renderedProducts?.map((item) => (
        <Product key={item.node.id} item={item.node} />
      ))}
    </div>
  );
}
