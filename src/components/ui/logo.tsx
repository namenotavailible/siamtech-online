
import React from "react";
import { useTheme, DARK_LOGO_PATH, LIGHT_LOGO_PATH } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Logo() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use the current theme to determine which logo to display
  const logoPath = theme === "dark" ? DARK_LOGO_PATH : LIGHT_LOGO_PATH;
  
  return (
    <a href="/" className="flex items-center pl-0">
      <div className="h-32 w-32 relative">
        <img 
          src={logoPath}
          alt={language === "en" ? "SIAMTECH Online" : "บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"}
          className="h-32 w-auto object-contain pt-2"
          loading="eager" 
          fetchpriority="high"
          decoding="sync"
        />
      </div>
    </a>
  );
}
