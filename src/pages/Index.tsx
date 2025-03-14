
import { Vortex } from "@/components/ui/vortex";
import Navigation from "@/components/Navigation";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingChat from "@/components/ui/floating-chat";
import { TopBar } from "@/components/ui/top-bar";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const Index = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": t("company_name"),
      "url": window.location.origin,
      "logo": `${window.location.origin}/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png`,
      "description": "Premium gaming and audio equipment retailer specializing in professional microphones and gaming peripherals.",
      "sameAs": [
        "https://facebook.com/siamtechonline",
        "https://twitter.com/siamtechonline",
        "https://instagram.com/siamtechonline"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [t]);

  const BackgroundComponent = () => {
    if (theme === "dark") {
      return (
        <Vortex rangeY={800} particleCount={500} baseHue={240} className="h-screen flex items-center justify-center px-4">
          {renderHeroContent()}
        </Vortex>
      );
    } else {
      return (
        <div className="h-screen flex items-center justify-center px-4 relative">
          <FlickeringGrid
            className="absolute inset-0 z-0"
            squareSize={4}
            gridGap={6}
            color="#000000"
            maxOpacity={0.15}
            flickerChance={0.3}
          />
          <div className="z-10 relative">
            {renderHeroContent()}
          </div>
        </div>
      );
    }
  };

  const renderHeroContent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.5 }} 
      className="text-center max-w-4xl mx-auto"
    >
      <span className={`text-sm uppercase tracking-wider ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        {t("company_name")}
      </span>
      <h1 className={`mt-6 text-4xl sm:text-6xl font-bold leading-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
        {t("hero_heading")}
      </h1>
      <p className={`mt-6 text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
        {t("hero_subtitle")}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          to="/products" 
          className={`px-8 py-3 ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} rounded-md hover:opacity-90 transition-colors`}
          aria-label={language === "en" ? "Browse our product catalog" : "เรียกดูแคตตาล็อกสินค้าของเรา"}
        >
          {t("shop_now")}
        </Link>
        <button 
          className={`px-8 py-3 border ${theme === "dark" ? "border-white/20 hover:bg-white/10 text-white" : "border-black/20 hover:bg-black/10 text-black"} rounded-md transition-colors`}
          aria-label={language === "en" ? "Learn more about our products and services" : "เรียนรู้เพิ่มเติมเกี่ยวกับสินค้าและบริการของเรา"}
        >
          {t("learn_more")}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"} text-white overflow-x-hidden`}>
      <Helmet>
        <title>{language === "en" ? "SIAMTECH Online | Premium Gaming & Audio Equipment Store" : "SIAMTECH ออนไลน์ | ร้านอุปกรณ์เกมและเครื่องเสียงระดับพรีเมียม"}</title>
        <meta name="description" content={language === "en" 
          ? "Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online. Shop our collection of high-quality microphones, gaming mice, and streaming gear." 
          : "ค้นพบอุปกรณ์เกมมิ่งและอุปกรณ์เสียงระดับมืออาชีพที่ SIAMTECH ออนไลน์ เลือกซื้อไมโครโฟนคุณภาพสูง เมาส์เกมมิ่ง และอุปกรณ์สตรีมมิ่งของเรา"} />
        <meta property="og:title" content={language === "en" 
          ? "SIAMTECH Online | Premium Gaming & Audio Equipment Store" 
          : "SIAMTECH ออนไลน์ | ร้านอุปกรณ์เกมและเครื่องเสียงระดับพรีเมียม"} />
        <meta property="og:description" content={language === "en" 
          ? "Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online. Shop our collection of high-quality microphones, gaming mice, and streaming gear."
          : "ค้นพบอุปกรณ์เกมมิ่งและอุปกรณ์เสียงระดับมืออาชีพที่ SIAMTECH ออนไลน์"} />
        <meta property="og:image" content="/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={language === "en" 
          ? "SIAMTECH Online | Premium Gaming & Audio Equipment Store" 
          : "SIAMTECH ออนไลน์ | ร้านอุปกรณ์เกมและเครื่องเสียงระดับพรีเมียม"} />
        <meta name="twitter:description" content={language === "en" 
          ? "Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online."
          : "ค้นพบอุปกรณ์เกมมิ่งและอุปกรณ์เสียงระดับมืออาชีพที่ SIAMTECH ออนไลน์"} />
        <meta name="twitter:image" content="/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png" />
        <meta name="canonical" content={window.location.origin} />
        <html lang={language} />
      </Helmet>

      <TopBar />
      <Navigation />
      
      <BackgroundComponent />

      <FeaturedProducts />
      <Footerdemo />
      <FloatingChat />
    </div>
  );
};

export default Index;
