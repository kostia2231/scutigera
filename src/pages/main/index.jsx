import Product from "../../components/product";
import { useProducts } from "../../data/getData";
import { useEffect } from "react";

export default function Main() {
  const { data } = useProducts();
  const products = data?.data.products.edges;

  useEffect(() => {
    console.log(
      console.clear(),
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀𝜗𝜚

    𝜗𝜚 YOUR DATA IS STOLEN, SRY 𝜗𝜚
    
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀𝜗𝜚
    `
    );
  }, []);

  return (
    <div className="flex flex-col gap-1 max-[640px]:mx-4">
      {products?.map((item) => (
        <Product key={item.node.id} item={item.node} />
      ))}
    </div>
  );
}
