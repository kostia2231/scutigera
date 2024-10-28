import Product from "../../components/product";
import { useProducts } from "../../data/getData";
import { motion } from "framer-motion";

export default function Main() {
  const { data } = useProducts();
  const products = data?.data.products.edges;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="flex flex-col max-[640px]:mx-4 max-[640px]:pt-[31px] pb-10"
    >
      {products?.map((item) => (
        <Product key={item.node.id} item={item.node} />
      ))}
    </motion.div>
  );
}
