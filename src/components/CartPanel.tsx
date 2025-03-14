
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Load cart items when component mounts or auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const savedCart = localStorage.getItem(`cart_${user.uid}`);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    const user = auth.currentUser;
    if (user && cartItems.length > 0) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
      updateCartCount(user.uid);
    }
  }, [cartItems, updateCartCount]);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose} 
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50"
          >
            <SidebarProvider>
              <Sidebar 
                variant="floating" 
                side="right" 
                className={`${isDark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md h-full`}
              >
                <SidebarHeader className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Your Cart ({cartItems.length})
                  </h2>
                  <button 
                    onClick={onClose} 
                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close cart"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SidebarHeader>

                <SidebarContent>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <ShoppingCart className={`h-10 w-10 ${isDark ? 'text-gray-600' : 'text-gray-300'} mb-3`} />
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Your cart is empty
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(100vh-180px)]">
                      <div className="p-4 space-y-3">
                        {cartItems.map((item) => (
                          <div 
                            key={item.id} 
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              isDark 
                                ? 'bg-white/5 hover:bg-white/10' 
                                : 'bg-gray-50 hover:bg-gray-100'
                            } transition-colors`}
                          >
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-16 w-16 object-cover rounded-md flex-shrink-0" 
                              loading="lazy"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-2">
                                <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium text-sm line-clamp-2`}>
                                  {item.name}
                                </h3>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                                  aria-label="Remove item"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                                  {item.price}
                                </p>
                                
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className={`${
                                      isDark 
                                        ? 'bg-white/10 hover:bg-white/20' 
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    } rounded p-1 flex items-center justify-center`}
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  
                                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm mx-1`}>
                                    {item.quantity}
                                  </span>
                                  
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className={`${
                                      isDark 
                                        ? 'bg-white/10 hover:bg-white/20' 
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    } rounded p-1 flex items-center justify-center`}
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </SidebarContent>
                
                <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ฿{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className={`w-full py-3 rounded-lg transition-colors ${
                      isDark 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-black text-white hover:bg-gray-800'
                    } font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                </SidebarFooter>
              </Sidebar>
            </SidebarProvider>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
