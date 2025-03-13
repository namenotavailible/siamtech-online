import { Vortex } from "@/components/ui/vortex";
import Navigation from "@/components/Navigation";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingChat from "@/components/ui/floating-chat";
import { TopBar } from "@/components/ui/top-bar";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SIAMTECH Online Group",
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
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>SIAMTECH Online | Premium Gaming & Audio Equipment Store</title>
        <meta name="description" content="Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online. Shop our collection of high-quality microphones, gaming mice, and streaming gear." />
        <meta name="keywords" content="gaming equipment, professional microphones, gaming mice, streaming gear, FIFINE, VXE, VGN, gaming peripherals" />
        <meta property="og:title" content="SIAMTECH Online | Premium Gaming & Audio Equipment Store" />
        <meta property="og:description" content="Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online. Shop our collection of high-quality microphones, gaming mice, and streaming gear." />
        <meta property="og:image" content="/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SIAMTECH Online | Premium Gaming & Audio Equipment Store" />
        <meta name="twitter:description" content="Discover premium gaming peripherals and professional audio equipment at SIAMTECH Online." />
        <meta name="twitter:image" content="/lovable-uploads/112d7d82-ab6b-4f9c-9ac7-69b9fb882a79.png" />
        <meta name="canonical" content={window.location.origin} />
        <html lang={language} />
      </Helmet>

      <TopBar />
      <Navigation />
      
      <Vortex backgroundColor="black" rangeY={800} particleCount={500} baseHue={240} className="h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-sm uppercase tracking-wider text-gray-400">
            {t("company_name")}
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight">
            {t("hero_heading")}
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            {t("hero_subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/products" 
              className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Browse our product catalog"
            >
              {t("shop_now")}
            </Link>
            <button 
              className="px-8 py-3 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Learn more about our products and services"
            >
              {t("learn_more")}
            </button>
          </div>
        </motion.div>
      </Vortex>

      <FeaturedProducts />
      <Footerdemo />
      <FloatingChat />
    </div>
  );
};

export default Index;
