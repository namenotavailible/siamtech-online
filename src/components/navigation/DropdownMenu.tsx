
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DropdownMenuItem {
  href: string;
  label: {
    en: string;
    th: string;
  };
}

export function DropdownMenu() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { language } = useLanguage();

  const productItems: DropdownMenuItem[] = [
    { href: "/products", label: { en: "All Products", th: "สินค้าทั้งหมด" } },
    { href: "/featured", label: { en: "Featured", th: "แนะนำ" } },
    { href: "/new-arrivals", label: { en: "New Arrivals", th: "มาใหม่" } }
  ];

  const supportItems: DropdownMenuItem[] = [
    { href: "/support", label: { en: "Support Center", th: "ศูนย์ช่วยเหลือ" } },
    { href: "/warranty", label: { en: "Warranty", th: "การรับประกัน" } }
  ];

  return (
    <div className="flex space-x-6">
      <div className="relative">
        <button
          onClick={() => setIsProductsOpen(!isProductsOpen)}
          className="flex items-center space-x-1 transition-colors"
        >
          <span>{language === 'en' ? 'Products' : 'สินค้า'}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        {isProductsOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/10">
            {productItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                {language === 'en' ? item.label.en : item.label.th}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsSupportOpen(!isSupportOpen)}
          className="flex items-center space-x-1 transition-colors"
        >
          <span>{language === 'en' ? 'Support' : 'ช่วยเหลือ'}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        {isSupportOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/10">
            {supportItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                onClick={() => setIsSupportOpen(false)}
              >
                {language === 'en' ? item.label.en : item.label.th}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link to="/blog" className="transition-colors">
        {language === 'en' ? 'Blog' : 'บทความ'}
      </Link>
      
      <Link to="/about" className="transition-colors">
        {language === 'en' ? 'About' : 'เกี่ยวกับเรา'}
      </Link>
    </div>
  );
}
