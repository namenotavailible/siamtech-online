
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SignUpDialog } from "@/components/auth/signup-dialog";
import { SearchPanel } from "@/components/ui/search-panel";
import { CartPanel } from "@/components/CartPanel";
import { auth } from "@/lib/firebase";
import { useCart } from '@/contexts/CartContext';
import { useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface ToolbarIconsProps {
  openAuthDialog: () => void;
  openSearchPanel: () => void;
  openCartPanel: () => void;
}

const ToolbarIcons: React.FC<ToolbarIconsProps> = ({ openAuthDialog, openSearchPanel, openCartPanel }) => {
  const { cartCount, updateCartCount } = useCart();
  const { language } = useLanguage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        updateCartCount(user.uid);
      }
    });

    return () => unsubscribe();
  }, [updateCartCount]);

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={openSearchPanel} 
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        aria-label={language === "en" ? "Open search panel" : "เปิดแผงค้นหา"}
      >
        <Search className="h-5 w-5" />
      </button>
      <button 
        onClick={openCartPanel} 
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative"
        aria-label={language === "en" ? "Open cart panel" : "เปิดแผงตะกร้าสินค้า"}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
      {user ? (
        <Link 
          to="/profile" 
          className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          aria-label={language === "en" ? "Go to profile" : "ไปที่โปรไฟล์"}
        >
          <User className="h-5 w-5" />
        </Link>
      ) : (
        <button 
          onClick={openAuthDialog} 
          className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" 
          data-auth-trigger
          aria-label={language === "en" ? "Open authentication dialog" : "เปิดหน้าต่างยืนยันตัวตน"}
        >
          <User className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

const Navigation = () => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const openSearchPanel = () => {
    setIsSearchPanelOpen(true);
  };

  const openCartPanel = () => {
    setIsCartPanelOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Logo />
          <nav className="hidden md:flex ml-4 space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-colors">
              {t("home")}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-colors">
              {t("about")}
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-colors">
              {t("products")}
            </Link>
            <Link to="/warranty" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-colors">
              {t("warranty")}
            </Link>
            <Link to="/support" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-colors">
              {t("contact")}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ToolbarIcons 
            openAuthDialog={openAuthDialog} 
            openSearchPanel={openSearchPanel} 
            openCartPanel={openCartPanel} 
          />
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            onClick={toggleMobileMenu}
            aria-label={language === "en" ? "Toggle mobile menu" : "สลับเมนูมือถือ"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("home")}
          </Link>
          <Link to="/about" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("about")}
          </Link>
          <Link to="/products" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("products")}
          </Link>
          <Link to="/warranty" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("warranty")}
          </Link>
          <Link to="/support" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("contact")}
          </Link>
        </div>
      </div>

      <SignUpDialog open={isAuthDialogOpen} setOpen={setIsAuthDialogOpen} />
      
      <SearchPanel open={isSearchPanelOpen} setOpen={setIsSearchPanelOpen} />
      
      <CartPanel isOpen={isCartPanelOpen} onClose={() => setIsCartPanelOpen(false)} />
    </header>
  );
};

export default Navigation;
