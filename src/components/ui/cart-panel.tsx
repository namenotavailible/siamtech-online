
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartPanelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CartPanel({ open, setOpen }: CartPanelProps) {
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
    setOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setOpen(false)} />
      )}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed right-0 top-0 h-full w-full max-w-xs ${isDark ? 'bg-white/5' : 'bg-white'} backdrop-blur-xl ${isDark ? 'border-l border-white/10' : 'border-l border-gray-200'} shadow-xl z-50`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Cart</h2>
            <button onClick={() => setOpen(false)} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className={`flex gap-3 ${isDark ? 'bg-white/5' : 'bg-gray-50'} p-3 rounded-lg`}>
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>{item.name}</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}>{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`px-2 py-1 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} rounded`}
                        >
                          -
                        </button>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`px-2 py-1 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} rounded`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className={`mt-4 pt-4 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
                <button 
                  onClick={handleCheckout}
                  className={`w-full ${isDark ? 'bg-white text-black' : 'bg-black text-white'} py-2 rounded-md ${isDark ? 'hover:bg-gray-200' : 'hover:bg-gray-800'} transition-colors`}
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
}
