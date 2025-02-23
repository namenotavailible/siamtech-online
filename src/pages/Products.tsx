import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useCart } from '@/contexts/CartContext';

const Products = () => {
  const navigate = useNavigate();
  const { updateCartCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      id: 5,
      name: "VXE Dragonfly R1 Series Wireless Mouse",
      price: "1,290 ฿",
      image: "/lovable-uploads/8c453f2b-710b-4a7a-b031-afb2f0438e18.png",
      category: "Gaming Mouse",
      description: "High-performance wireless gaming mouse with precision tracking and ergonomic design."
    },
    {
      id: 6,
      name: "VGN Dragonfly F1 Series Wireless Mouse",
      price: "1,690 ฿",
      image: "/lovable-uploads/196d6254-10dd-455b-9081-038e85b94104.png",
      category: "Gaming Mouse",
      description: "Premium wireless gaming mouse featuring advanced sensor technology and customizable controls."
    }
  ]);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      const authButton = document.querySelector('[data-auth-trigger]');
      if (authButton instanceof HTMLElement) {
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
    
    // Update cart count after a short delay
    setTimeout(() => {
      updateCartCount(user.uid);
    }, 1000);
  };

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
      </main>

      <Footerdemo />
    </div>
  );
};

export default Products;
