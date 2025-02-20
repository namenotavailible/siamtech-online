
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Studio Pro Mic",
    price: "$299",
    image: "/placeholder.svg",
    category: "Professional"
  },
  {
    id: 2,
    name: "Wireless Lavalier",
    price: "$149",
    image: "/placeholder.svg",
    category: "Wireless"
  },
  {
    id: 3,
    name: "Podcast Kit",
    price: "$399",
    image: "/placeholder.svg",
    category: "Bundle"
  },
  {
    id: 4,
    name: "Gaming Headset",
    price: "$199",
    image: "/placeholder.svg",
    category: "Gaming"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-400 uppercase tracking-wider"
          >
            Featured Products
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-3xl font-bold text-white"
          >
            Premium Audio Equipment
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-400">{product.category}</span>
                <h3 className="mt-1 text-xl font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-gray-300">{product.price}</p>
                <button className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
