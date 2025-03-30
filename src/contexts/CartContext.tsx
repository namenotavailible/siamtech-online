
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { parsePrice } from '@/utils/priceUtils';

export interface CartItem {
  id: number;
  name: string;
  price: string | number;
  image: string;
  quantity: number;
  color?: string;
}

interface CartContextType {
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  updateCartCount: (userId: string) => void;
  addItemToCart: (item: CartItem, userId?: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  updateCartCount: () => {},
  addItemToCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const updateCartCount = (userId: string) => {
    try {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCartCount(0);
    }
  };

  const addItemToCart = (item: CartItem, userId?: string) => {
    const user = userId || auth.currentUser?.uid;
    if (!user) return;
    
    try {
      const savedCart = localStorage.getItem(`cart_${user}`);
      const currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = currentCart.findIndex((cartItem: CartItem) => 
        cartItem.id === item.id && cartItem.color === item.color
      );
      
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
      } else {
        currentCart.push(item);
      }
      
      localStorage.setItem(`cart_${user}`, JSON.stringify(currentCart));
      updateCartCount(user);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateCartCount(user.uid);
      } else {
        setCartCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      isCartOpen, 
      openCart, 
      closeCart, 
      toggleCart, 
      updateCartCount,
      addItemToCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
