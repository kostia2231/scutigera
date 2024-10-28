import Product from "../../components/product";
import { useProducts } from "../../data/getData";
import { motion } from "framer-motion";

export default function Main() {
  const { data } = useProducts();
  const products = data?.data.products.edges;

  return (
    <div className="flex flex-col max-[640px]:mx-4 max-[640px]:pt-[31px] pb-10">
      {products?.map((item, index) => (
        <motion.div
          key={item.node.id}
          style={{ willChange: "opacity, transform" }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.2,
            ease: "easeOut",
          }}
        >
          <Product item={item.node} />
        </motion.div>
      ))}
    </div>
  );
}
