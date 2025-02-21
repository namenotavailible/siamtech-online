
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

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

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      )}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl z-50"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-800/50 p-4 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <button className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-200 transition-colors">
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
