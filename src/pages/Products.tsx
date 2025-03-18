
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
import { useTheme } from "@/contexts/ThemeContext";
import { parsePrice } from "@/utils/priceUtils";

const Products = () => {
  const navigate = useNavigate();
  const { updateCartCount, openCart } = useCart();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
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
    const companyName = language === "th" ? "บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด" : "SIAMTECH Online Group Co.,Ltd.";
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
          "brand": {
            "@type": "Brand",
            "name": companyName
          },
          "offers": {
            "@type": "Offer",
            "price": product.price.replace(/[^\d.]/g, ''),
            "priceCurrency": "THB",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": companyName
            }
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
  }, [products, language]);

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

    try {
      const savedCart = localStorage.getItem(`cart_${user.uid}`);
      const currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // Store the price as is (as a string) to maintain display format
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
      
      updateCartCount(user.uid);
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>{language === "en" 
          ? "Gaming Peripherals & Audio Equipment | SIAMTECH Online Store" 
          : "อุปกรณ์เกมและเครื่องเสียง | บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"}
        </title>
        <meta name="description" content={language === "en" 
          ? "Shop premium gaming mice and professional microphones from SIAMTECH Online. Find the perfect audio and gaming equipment for streaming, content creation, and competitive gaming." 
          : "เลือกซื้อเมาส์เกมมิ่งและไมโครโฟนระดับมืออาชีพจาก บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด ค้นหาอุปกรณ์เสียงและเกมที่เหมาะสำหรับการสตรีม การสร้างคอนเทนต์ และการเล่นเกมแข่งขัน"} />
        <meta name="keywords" content={language === "en"
          ? "gaming mouse, microphone, streaming equipment, gaming peripherals, FIFINE, VXE, VGN, Dragonfly, SIAMTECH"
          : "เมาส์เกมมิ่ง, ไมโครโฟน, อุปกรณ์สตรีมมิ่ง, อุปกรณ์เกม, บริษัท สยามเทค ออนไลน์ กรุ๊ป, FIFINE, VXE, VGN, Dragonfly"} />
        <meta property="og:title" content={language === "en" 
          ? "Gaming Peripherals & Audio Equipment | SIAMTECH Online Store" 
          : "อุปกรณ์เกมและเครื่องเสียง | บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"} />
        <meta property="og:description" content={language === "en"
          ? "Shop premium gaming mice and professional microphones from SIAMTECH Online."
          : "เลือกซื้อเมาส์เกมมิ่งและไมโครโฟนระดับมืออาชีพจาก บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"} />
        <meta property="og:type" content="website" />
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
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t("products_description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${theme === 'dark' 
                  ? 'bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20' 
                  : 'bg-gray-100 backdrop-blur-sm border border-gray-200 hover:border-gray-300'} 
                  rounded-lg overflow-hidden transition-all`}
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
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{product.category}</span>
                  <h2 className={`mt-1 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{product.name}</h2>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{product.price}</p>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`mt-4 w-full py-2 rounded-md transition-colors ${theme === 'dark' 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'}`}
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
