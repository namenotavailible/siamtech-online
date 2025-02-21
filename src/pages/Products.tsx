
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "FIFINE Ampligame AM8",
      price: "2,490 ฿",
      image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
      category: "Dynamic Microphone #1",
      description: "Professional dynamic microphone perfect for gaming, streaming, and content creation."
    },
    {
      id: 2,
      name: "FIFINE Ampligame A8",
      price: "1,990 ฿",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      category: "Condenser Microphone #2",
      description: "High-quality condenser microphone featuring RGB lighting effects."
    },
    {
      id: 3,
      name: "Podcast Kit",
      price: "$399",
      image: "/placeholder.svg",
      category: "Bundle",
      description: "Complete podcast studio kit including microphone and accessories."
    },
    {
      id: 4,
      name: "Gaming Headset",
      price: "$199",
      image: "/placeholder.svg",
      category: "Gaming",
      description: "Premium gaming headset with surround sound technology."
    }
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="mt-4 text-gray-400">Discover our premium selection of audio equipment and accessories</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    View Details
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default Products;
