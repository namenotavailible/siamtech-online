
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollArea } from "@/components/ui/scroll-area";

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

  // Load cart items from localStorage when auth state changes
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

  // Use framer-motion for smooth animations
  return (
    <>
      {/* Backdrop overlay when the cart is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose} 
          aria-hidden="true"
        />
      )}
      
      {/* Cart panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 overflow-hidden ${
          isDark 
            ? 'bg-black/80 backdrop-blur-xl border-l border-white/10' 
            : 'bg-white/90 backdrop-blur-xl border-l border-gray-200'
        } shadow-xl`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Cart
            </h2>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'} transition-colors`}
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart content */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <>
              {/* Scrollable cart items */}
              <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`flex gap-4 ${
                        isDark 
                          ? 'bg-white/5 hover:bg-white/10' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } p-4 rounded-lg transition-colors`}
                    >
                      <div className="relative h-24 w-24 overflow-hidden rounded-md bg-gradient-to-tr from-gray-100 to-gray-50 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium line-clamp-2`}>
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className={`ml-2 p-1 rounded-full ${
                              isDark 
                                ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-900'
                            } transition-colors`}
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                          {item.price}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`p-1 ${
                              isDark 
                                ? 'bg-white/10 hover:bg-white/20' 
                                : 'bg-gray-200 hover:bg-gray-300'
                            } rounded transition-colors w-8 h-8 flex items-center justify-center`}
                            aria-label="Decrease quantity"
                          >
                            <span className="text-lg">-</span>
                          </button>
                          <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg min-w-[24px] text-center`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`p-1 ${
                              isDark 
                                ? 'bg-white/10 hover:bg-white/20' 
                                : 'bg-gray-200 hover:bg-gray-300'
                            } rounded transition-colors w-8 h-8 flex items-center justify-center`}
                            aria-label="Increase quantity"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Cart total and checkout */}
              <div className={`mt-6 pt-4 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
                <div className="flex justify-between mb-6">
                  <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total</span>
                  <span className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ฿{totalAmount.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className={`w-full py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  } font-medium text-lg`}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CartPanel;
