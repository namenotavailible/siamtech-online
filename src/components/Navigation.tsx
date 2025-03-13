import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SignUpDialog } from "@/components/auth/signup-dialog";
import { SearchPanel } from "@/components/ui/search-panel";
import { CartPanel } from "@/components/ui/cart-panel";
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
      <button onClick={openSearchPanel} className="text-gray-300 hover:text-white transition-colors">
        <Search className="h-5 w-5" aria-label="Open search panel" />
      </button>
      <button onClick={openCartPanel} className="text-gray-300 hover:text-white transition-colors relative">
        <ShoppingCart className="h-5 w-5" aria-label="Open cart panel" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
      {user ? (
        <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
          <User className="h-5 w-5" aria-label="Go to profile" />
        </Link>
      ) : (
        <button onClick={openAuthDialog} className="text-gray-300 hover:text-white transition-colors" data-auth-trigger>
          <User className="h-5 w-5" aria-label="Open authentication dialog" />
        </button>
      )}
    </div>
  );
};

const Navigation = () => {
  const { t } = useLanguage();
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

  const closeAllPanels = () => {
    setMobileMenuOpen(false);
    setIsAuthDialogOpen(false);
    setIsSearchPanelOpen(false);
    setIsCartPanelOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Logo />
          <nav className="hidden md:flex ml-10 space-x-6">
            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
              {t("home")}
            </a>
            <a href="/about" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
              {t("about")}
            </a>
            <a href="/products" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
              {t("products")}
            </a>
            <a href="/warranty" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
              {t("warranty")}
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
              {t("contact")}
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ToolbarIcons 
            openAuthDialog={openAuthDialog} 
            openSearchPanel={openSearchPanel} 
            openCartPanel={openCartPanel} 
          />
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-black/95 backdrop-blur-md border-t border-white/10`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          <a href="/" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("home")}
          </a>
          <a href="/about" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("about")}
          </a>
          <a href="/products" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("products")}
          </a>
          <a href="/warranty" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("warranty")}
          </a>
          <a href="/contact" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
            {t("contact")}
          </a>
        </div>
      </div>

      {/* Auth Dialog */}
      <SignUpDialog open={isAuthDialogOpen} setOpen={setIsAuthDialogOpen} />
      
      {/* Search Panel */}
      <SearchPanel open={isSearchPanelOpen} setOpen={setIsSearchPanelOpen} />
      
      {/* Cart Panel */}
      <CartPanel open={isCartPanelOpen} setOpen={setIsCartPanelOpen} />
    </header>
  );
};

export default Navigation;
