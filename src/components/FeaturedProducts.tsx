
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "FIFINE Ampligame AM8",
    price: "2,490 ฿",
    image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
    category: "Dynamic Microphone",
  },
  {
    id: 2,
    name: "FIFINE Ampligame A8",
    price: "1,990 ฿",
    image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
    category: "Condenser Microphone",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      // Store the product to be added after authentication
      sessionStorage.setItem('pendingCartItem', JSON.stringify(product));
      
      // Find and click the auth trigger button
      const authButton = document.querySelector('[data-auth-trigger]') as HTMLElement;
      if (authButton) {
        authButton.click();
      }
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
    toast.success("Added to cart successfully!");
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <p className="mt-4 text-gray-400">Our most popular products</p>
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
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
