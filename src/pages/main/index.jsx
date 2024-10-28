import Product from "../../components/product";
import { useProducts } from "../../data/getData";

export default function Main() {
  const { data } = useProducts();
  const products = data?.data.products.edges;

  return (
    <div className="flex flex-col max-[640px]:mx-4 max-[640px]:pt-[31px] pb-10">
      {products?.map((item) => (
        <Product
          key={item.node.id}
          item={item.node}
          className="product-appear"
        />
      ))}
    </div>
  );
}
