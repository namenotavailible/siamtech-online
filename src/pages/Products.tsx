import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useCart } from '@/contexts/CartContext';
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";

const Products = () => {
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  const { t, language } = useLanguage();
  
  const [products] = useState([
    {
      id: 1,
      name: "FIFINE Ampligame AM8",
      price: "2,490 ฿",
      image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
      category: "Dynamic Microphone",
      description: "Professional dynamic microphone perfect for gaming, streaming, and content creation.",
      alt: "FIFINE Ampligame AM8 Dynamic USB Microphone for Gaming and Streaming"
    },
    {
      id: 2,
      name: "FIFINE Ampligame A8",
      price: "1,990 ฿",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      category: "Condenser Microphone",
      description: "High-quality condenser microphone featuring RGB lighting effects.",
      alt: "FIFINE Ampligame A8 RGB Condenser USB Microphone"
    },
    {
      id: 5,
      name: "VXE Dragonfly R1",
      price: "1,290 ฿",
      image: "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
      category: "Gaming Mouse",
      description: "High-performance wireless gaming mouse with precision tracking and ergonomic design.",
      alt: "VXE Dragonfly R1 High-Performance Gaming Mouse"
    },
    {
      id: 6,
      name: "VGN Dragonfly F1",
      price: "1,690 ฿",
      image: "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
      category: "Gaming Mouse",
      description: "Premium wireless gaming mouse with advanced sensors and customizable features.",
      alt: "VGN Dragonfly F1 Premium Gaming Mouse with Customizable Features"
    }
  ]);

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": window.location.origin + product.image,
          "category": product.category,
          "offers": {
            "@type": "Offer",
            "price": product.price.replace(/[^\d.]/g, ''),
            "priceCurrency": "THB",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [products]);

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
    
    setTimeout(() => {
      updateCartCount(user.uid);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Gaming Peripherals & Audio Equipment | SIAMTECH Online Store</title>
        <meta name="description" content="Shop premium gaming mice and professional microphones. Find the perfect audio and gaming equipment for streaming, content creation, and competitive gaming." />
        <meta name="keywords" content="gaming mouse, microphone, streaming equipment, gaming peripherals, FIFINE, VXE, VGN, Dragonfly" />
        <link rel="canonical" href={window.location.href} />
        <html lang={language} />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold">{t("our_products")}</h1>
          <p className="mt-4 text-gray-400">{t("products_description")}</p>
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
                    alt={product.alt}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    loading={index > 1 ? "lazy" : undefined}
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-gray-400">{product.category}</span>
                  <h2 className="mt-1 text-xl font-semibold text-white">{product.name}</h2>
                  <p className="mt-2 text-gray-300">{product.price}</p>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {t("add_to_cart")}
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
