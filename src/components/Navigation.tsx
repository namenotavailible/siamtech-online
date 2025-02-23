
import { ShoppingCart, Menu, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartPanel from "./CartPanel";
import SearchPanel from "./SearchPanel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "sonner";
import { useEffect } from "react";
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import EmailLinkAuth from './EmailLinkAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        const pendingItem = sessionStorage.getItem('pendingCartItem');
        if (pendingItem) {
          const product = JSON.parse(pendingItem);
          const savedCart = localStorage.getItem(`cart_${user.uid}`);
          const currentCart = savedCart ? JSON.parse(savedCart) : [];
          
          const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
          
          if (existingItemIndex !== -1) {
            currentCart[existingItemIndex].quantity += 1;
          } else {
            currentCart.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1
            });
          }

          localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
          sessionStorage.removeItem('pendingCartItem');
          toast.success("Added to cart successfully!");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Account created successfully!");
      setShowAuthDialog(false);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google successfully!");
      setShowAuthDialog(false);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      setIsCartOpen(true);
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      setShowAuthDialog(true);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex flex-col items-start -space-y-1">
              <span className="text-white font-medium tracking-wide text-base">SIAMTECH</span>
              <span className="text-gray-400 text-[0.65rem] font-light tracking-widest uppercase">online</span>
            </a>

            <div className="flex items-center justify-end flex-1">
              <div className="hidden md:flex items-center space-x-8 mr-8">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 data-[state=open]:text-white">
                    Products
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-black/90 backdrop-blur-lg border border-white/10">
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/products/laptops" className="w-full">Laptops</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/products/desktops" className="w-full">Desktop PCs</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/products/accessories" className="w-full">Accessories</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 data-[state=open]:text-white">
                    Warranty
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-black/90 backdrop-blur-lg border border-white/10">
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/warranty/registration" className="w-full">Product Registration</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/warranty/check" className="w-full">Check Status</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/warranty/terms" className="w-full">Terms & Conditions</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 data-[state=open]:text-white">
                    Support
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-black/90 backdrop-blur-lg border border-white/10">
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/support/contact" className="w-full">Contact Us</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/support/faq" className="w-full">FAQ</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                      <a href="/support/downloads" className="w-full">Downloads</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center">
                <button 
                  className="p-3 sm:p-4 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button 
                  className="p-3 sm:p-4 text-gray-300 hover:text-white transition-colors relative"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-white text-black text-[0.65rem] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  data-auth-trigger
                  className="p-3 sm:p-4 text-gray-300 hover:text-white transition-colors"
                  onClick={handleUserClick}
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button 
                  className="md:hidden p-3 sm:p-4 text-gray-300 hover:text-white transition-colors ml-1" 
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/95 backdrop-blur-lg"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                <a href="/products" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Products
                </a>
                <a href="/warranty" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Warranty
                </a>
                <a href="/support" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartPanel isOpen={isCartOpen && isAuthenticated} onClose={() => setIsCartOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Navigation;
