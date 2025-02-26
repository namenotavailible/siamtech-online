import { useState } from "react";
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
import { Logo } from "./navigation/Logo";
import { ToolbarIcons } from "./navigation/ToolbarIcons";
import { User } from "lucide-react";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 bg-transparent">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="hidden md:flex items-center justify-center flex-1">
              <Menu setActive={setActiveMenuItem}>
                <MenuItem setActive={setActiveMenuItem} active={activeMenuItem} item="Products">
                  <div className="grid grid-cols-2 gap-4">
                    <ProductItem
                      title="FIFINE Ampligame AM8"
                      description="Professional dynamic microphone perfect for gaming and streaming"
                      href="/products#microphones"
                      src="/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png"
                    />
                    <ProductItem
                      title="FIFINE Ampligame A8"
                      description="High-quality condenser microphone with RGB lighting"
                      href="/products#microphones"
                      src="/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png"
                    />
                    <ProductItem
                      title="VXE Dragonfly R1"
                      description="High-performance wireless gaming mouse"
                      href="/products#gaming-mouse"
                      src="/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png"
                    />
                    <ProductItem
                      title="VGN Dragonfly F1"
                      description="Premium wireless gaming mouse"
                      href="/products#gaming-mouse"
                      src="/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png"
                    />
                  </div>
                </MenuItem>
                <MenuItem setActive={setActiveMenuItem} active={activeMenuItem} item="Warranty">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink to="/warranty#registration">Warranty Registration</HoveredLink>
                    <HoveredLink to="/warranty#policy">Warranty Policy</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActiveMenuItem} active={activeMenuItem} item="Support">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink to="/support#faqs">FAQs</HoveredLink>
                    <HoveredLink to="/support#contact">Contact Us</HoveredLink>
                    <HoveredLink to="/support#downloads">Downloads</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>

            <div className="flex items-center space-x-4">
              <ToolbarIcons 
                onSearchClick={() => setIsSearchOpen(true)}
                onCartClick={handleCartClick}
                onUserClick={handleUserClick}
                onMenuClick={() => setIsOpen(!isOpen)}
                cartCount={cartCount}
              />
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

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-center">Sign up to SIAMTECH</DialogTitle>
              <DialogDescription className="text-center">
                Create an account to access your cart
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">Full name</Label>
                <Input
                  id="signup-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-8 text-sm">
              Sign up
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">Or</span>
          </div>

          <div className="space-y-2">
            <Button variant="outline" onClick={handleGoogleSignIn} className="w-full h-8 text-sm">
              <GoogleLogo />
              Continue with Google
            </Button>
            
            <EmailLinkAuth />
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            By signing up you agree to our{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Terms
            </a>
            .
          </p>
        </DialogContent>
      </Dialog>

      <CartPanel isOpen={isCartOpen && isAuthenticated} onClose={() => setIsCartOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Navigation;
