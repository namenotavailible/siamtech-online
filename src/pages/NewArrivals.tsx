
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const newProducts = [
    {
      id: 7,
      name: "FIFINE Ampligame A9",
      description: language === "en" 
        ? "The latest condenser microphone with AI noise reduction" 
        : "ไมโครโฟนคอนเดนเซอร์รุ่นล่าสุดพร้อมระบบลดเสียงรบกวนด้วย AI",
      image: "/lovable-uploads/9f7f3e91-1510-4ec4-8391-68411a8131e6.png",
      price: 3290
    },
    {
      id: 8,
      name: "VXE Dragonfly R2",
      description: language === "en" 
        ? "Next-generation gaming mouse with 26K DPI sensor" 
        : "เมาส์เกมมิ่งรุ่นใหม่ล่าสุดพร้อมเซ็นเซอร์ 26K DPI",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      price: 2490
    },
    {
      id: 9,
      name: "FIFINE StreamCast X1",
      description: language === "en" 
        ? "Professional streaming microphone with RGB" 
        : "ไมโครโฟนสำหรับสตรีมมิ่งระดับมืออาชีพพร้อม RGB",
      image: "/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png",
      price: 4590
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>
          {language === "en" ? "New Arrivals - SIAMTECH Online" : "สินค้ามาใหม่ - SIAMTECH ออนไลน์"}
        </title>
        <meta 
          name="description" 
          content={
            language === "en" 
              ? "Check out the newest tech products that just arrived at SIAMTECH Online." 
              : "ตรวจสอบผลิตภัณฑ์เทคโนโลยีใหม่ล่าสุดที่เพิ่งมาถึงที่ SIAMTECH ออนไลน์"
          } 
        />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === "en" ? "New Arrivals" : "สินค้ามาใหม่"}
          </h1>
          
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
            {language === "en" 
              ? "Discover our latest products, fresh from the factory. Be the first to experience cutting-edge technology."
              : "ค้นพบผลิตภัณฑ์ล่าสุดของเรา สดใหม่จากโรงงาน เป็นคนแรกที่ได้สัมผัสเทคโนโลยีล้ำสมัย"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: product.id * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className={`overflow-hidden h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}`}>
                  <div className="p-4 aspect-square relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain" 
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {language === "en" ? "NEW" : "ใหม่"}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-primary">฿{product.price.toLocaleString()}</p>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline">
                          {language === "en" ? "View Details" : "ดูรายละเอียด"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default NewArrivals;
