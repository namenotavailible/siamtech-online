
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import FeaturedProducts from "@/components/FeaturedProducts";

const Featured = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>
          {language === "en" ? "Featured Products - SIAMTECH Online" : "สินค้าแนะนำ - SIAMTECH ออนไลน์"}
        </title>
        <meta 
          name="description" 
          content={
            language === "en" 
              ? "Discover our featured and best-selling tech products at SIAMTECH Online." 
              : "ค้นพบสินค้าเทคโนโลยีแนะนำและขายดีที่ SIAMTECH ออนไลน์"
          } 
        />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {language === "en" ? "Featured Products" : "สินค้าแนะนำ"}
        </h1>
        
        <FeaturedProducts />
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default Featured;
