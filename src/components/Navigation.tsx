
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SignUpDialog } from "@/components/auth/signup-dialog";
import { SearchPanel } from "@/components/ui/search-panel";
import CartPanel from "@/components/CartPanel";
import { auth } from "@/lib/firebase";
import { useCart } from '@/contexts/CartContext';
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/ui/navbar-menu";

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
  const [active, setActive] = useState<string | null>(null);

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
          <div className="hidden md:block">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item={t("home")} to="/">
                <div className="flex flex-col space-y-4 text-sm p-2">
                  <HoveredLink to="/">{language === "en" ? "Homepage" : "หน้าหลัก"}</HoveredLink>
                  <HoveredLink to="/featured">{language === "en" ? "Featured" : "แนะนำ"}</HoveredLink>
                  <HoveredLink to="/new-arrivals">{language === "en" ? "New Arrivals" : "สินค้ามาใหม่"}</HoveredLink>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActive} active={active} item={t("about")} to="/about">
                <div className="flex flex-col space-y-4 text-sm p-2">
                  <HoveredLink to="/about">{language === "en" ? "Our Story" : "เรื่องราวของเรา"}</HoveredLink>
                  <HoveredLink to="/team">{language === "en" ? "Our Team" : "ทีมงานของเรา"}</HoveredLink>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActive} active={active} item={t("products")} to="/products">
                <div className="text-sm grid grid-cols-2 gap-10 p-4 w-[400px]">
                  <ProductItem
                    title={language === "en" ? "FIFINE Ampligame AM8" : "FIFINE Ampligame AM8"}
                    href="/products/1"
                    src="/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png"
                    description={language === "en" ? "Professional dynamic microphone" : "ไมโครโฟนไดนามิกระดับมืออาชีพ"}
                  />
                  <ProductItem
                    title={language === "en" ? "FIFINE Ampligame A8" : "FIFINE Ampligame A8"}
                    href="/products/2"
                    src="/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png"
                    description={language === "en" ? "Condenser microphone with RGB" : "ไมโครโฟนคอนเดนเซอร์พร้อม RGB"}
                  />
                  <ProductItem
                    title={language === "en" ? "VXE Dragonfly R1" : "VXE Dragonfly R1"}
                    href="/products/5"
                    src="/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png"
                    description={language === "en" ? "High-performance gaming mouse" : "เมาส์เกมมิ่งประสิทธิภาพสูง"}
                  />
                  <ProductItem
                    title={language === "en" ? "VGN Dragonfly F1" : "VGN Dragonfly F1"}
                    href="/products/6"
                    src="/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png"
                    description={language === "en" ? "Premium gaming mouse" : "เมาส์เกมมิ่งระดับพรีเมียม"}
                  />
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActive} active={active} item={language === "en" ? "Blog" : "บทความ"} to="/blog">
                <div className="flex flex-col space-y-4 text-sm p-2">
                  <HoveredLink to="/blog">{language === "en" ? "All Articles" : "บทความทั้งหมด"}</HoveredLink>
                  <HoveredLink to="/blog/tech">{language === "en" ? "Tech News" : "ข่าวเทคโนโลยี"}</HoveredLink>
                  <HoveredLink to="/blog/reviews">{language === "en" ? "Reviews" : "รีวิว"}</HoveredLink>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActive} active={active} item={t("warranty")} to="/warranty">
                <div className="flex flex-col space-y-4 text-sm p-2">
                  <HoveredLink to="/warranty">{language === "en" ? "Warranty Info" : "ข้อมูลการรับประกัน"}</HoveredLink>
                  <HoveredLink to="/warranty/register">{language === "en" ? "Register Product" : "ลงทะเบียนสินค้า"}</HoveredLink>
                  <HoveredLink to="/warranty/claim">{language === "en" ? "File a Claim" : "ส่งเรื่องเคลม"}</HoveredLink>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActive} active={active} item={t("contact")} to="/support">
                <div className="flex flex-col space-y-4 text-sm p-2">
                  <HoveredLink to="/support">{language === "en" ? "Customer Support" : "ฝ่ายสนับสนุนลูกค้า"}</HoveredLink>
                  <HoveredLink to="/support/faq">{language === "en" ? "FAQ" : "คำถามที่พบบ่อย"}</HoveredLink>
                  <HoveredLink to="/support/contact">{language === "en" ? "Contact Us" : "ติดต่อเรา"}</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>
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
              <MenuIcon className="h-6 w-6" />
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
          <Link to="/blog" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md transition-colors">
            {language === "en" ? "Blog" : "บทความ"}
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
