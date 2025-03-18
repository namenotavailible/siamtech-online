import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginDialog } from "./auth/login-dialog";
import { DropdownMenu } from "./navigation/DropdownMenu";
import { ToolbarIcons } from "./navigation/ToolbarIcons";
import { Logo } from "./navigation/Logo";
import { SearchPanel } from "./SearchPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useCart } from "@/contexts/CartContext";
import SignUpDialog from "./SignUpDialog";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showAuthDialog, setShowAuthDialog] = useState<'login' | 'signup' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsMenuOpen(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleAuthClick = (type: 'login' | 'signup') => {
    setShowAuthDialog(type);
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const headerClass = `fixed top-0 w-full z-40 transition-all duration-300 ${
    isScrolled
      ? theme === 'dark'
        ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-black/10'
        : 'bg-white/80 backdrop-blur-md shadow-lg'
      : theme === 'dark'
      ? 'bg-transparent'
      : 'bg-white'
  }`;

  const linkClass = `px-4 py-2 transition-colors ${
    theme === 'dark'
      ? 'text-gray-300 hover:text-white'
      : 'text-gray-700 hover:text-black'
  }`;

  const mobileMenuClass = `fixed inset-0 flex flex-col pt-24 pb-8 px-8 overflow-y-auto ${
    theme === 'dark' ? 'bg-black/95' : 'bg-white'
  } backdrop-blur-md z-30`;

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <DropdownMenu />
          </nav>

          <div className="flex items-center space-x-4">
            <ToolbarIcons 
              onSearchClick={toggleSearch}
              onCartClick={toggleCart}
              onAuthClick={handleAuthClick}
              isAuthenticated={isAuthenticated}
              cartCount={cartCount}
              isSearchOpen={isSearchOpen}
              toggleSearch={toggleSearch}
              toggleTheme={toggleTheme}
            />

            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={handleLanguageChange}
                className="flex items-center text-sm font-medium space-x-1 opacity-80 hover:opacity-100 transition-opacity"
                aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
              >
                <Globe size={18} className="mr-1" aria-hidden="true" />
                <span>{language === 'en' ? 'EN' : 'TH'}</span>
                <ChevronDown size={15} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={mobileMenuClass}
          >
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Home' : 'หน้าแรก'}
              </Link>
              <Link to="/products" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Products' : 'สินค้า'}
              </Link>
              <Link to="/featured" className={`${linkClass} pl-8`} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Featured' : 'แนะนำ'}
              </Link>
              <Link to="/new-arrivals" className={`${linkClass} pl-8`} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'New Arrivals' : 'มาใหม่'}
              </Link>
              <Link to="/support" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Support' : 'ช่วยเหลือ'}
              </Link>
              <Link to="/warranty" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Warranty' : 'การรับประกัน'}
              </Link>
              <Link to="/blog" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Blog' : 'บทความ'}
              </Link>
              <Link to="/about" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'About' : 'เกี่ยวกับเรา'}
              </Link>
            </nav>

            <div className="flex items-center mt-8 space-x-6">
              <button
                onClick={handleLanguageChange}
                className="flex items-center text-sm font-medium space-x-1 opacity-80 hover:opacity-100 transition-opacity"
                aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
              >
                <Globe size={18} className="mr-1" aria-hidden="true" />
                <span>{language === 'en' ? 'EN' : 'TH'}</span>
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-200" aria-hidden="true" />
                ) : (
                  <Moon size={20} className="text-gray-700" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchPanel open={isSearchOpen} setOpen={setIsSearchOpen} />
      
      <LoginDialog
        open={showAuthDialog === 'login'}
        setOpen={(open) => setShowAuthDialog(open ? 'login' : null)}
        onShowSignUp={() => setShowAuthDialog('signup')}
      />
      <SignUpDialog
        open={showAuthDialog === 'signup'}
        setOpen={(open) => setShowAuthDialog(open ? 'signup' : null)}
        onShowSignUp={() => setShowAuthDialog('signup')}
      />

      {/* Data attribute for triggering auth dialog from other components */}
      <button
        data-auth-trigger
        className="hidden"
        onClick={() => setShowAuthDialog('login')}
        aria-hidden="true"
      />
    </header>
  );
};

export default Navigation;
