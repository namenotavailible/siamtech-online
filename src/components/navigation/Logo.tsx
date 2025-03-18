
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Logo() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use the current theme to determine which logo to display
  const logoPath = theme === "dark" 
    ? "/lovable-uploads/8cb78da9-2dc4-4442-9bef-1c1424f43d37.png" 
    : "/lovable-uploads/9f7f3e91-1510-4ec4-8391-68411a8131e6.png";
  
  return (
    <Link to="/" className="flex items-center pl-0">
      <div className="h-32 w-32 relative">
        <img 
          src={logoPath}
          alt={language === "en" ? "SIAMTECH Online" : "บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"}
          className="h-32 w-auto object-contain pt-2"
          loading="eager" 
          fetchPriority="high"
          decoding="sync"
        />
      </div>
    </Link>
  );
}
