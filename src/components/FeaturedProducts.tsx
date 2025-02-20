
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [sectionTitle, setSectionTitle] = useState("Audio Equipment");
  const [sectionSubtitle, setSectionSubtitle] = useState("Featured Products");
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "FIFINE Ampligame AM8",
      price: "2,490 ฿",
      image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
      category: "Dynamic Microphone #1"
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
  ]);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-400 uppercase tracking-wider"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setSectionSubtitle(e.currentTarget.textContent || sectionSubtitle)}
          >
            {sectionSubtitle}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-3xl font-bold text-white"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setSectionTitle(e.currentTarget.textContent || sectionTitle)}
          >
            {sectionTitle}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
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
                  <span 
                    className="text-sm text-gray-400"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newProducts = [...products];
                      newProducts[index].category = e.currentTarget.textContent || product.category;
                      setProducts(newProducts);
                    }}
                  >
                    {product.category}
                  </span>
                  <h3 
                    className="mt-1 text-xl font-semibold text-white"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newProducts = [...products];
                      newProducts[index].name = e.currentTarget.textContent || product.name;
                      setProducts(newProducts);
                    }}
                  >
                    {product.name}
                  </h3>
                  <p 
                    className="mt-2 text-gray-300"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newProducts = [...products];
                      newProducts[index].price = e.currentTarget.textContent || product.price;
                      setProducts(newProducts);
                    }}
                  >
                    {product.price}
                  </p>
                  <button className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
