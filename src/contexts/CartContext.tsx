
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { parsePrice } from '@/utils/priceUtils';
import { toast } from 'sonner';

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
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  updateCartCount: (userId: string) => void;
  addItemToCart: (item: CartItem, userId?: string) => void;
  removeItemFromCart: (itemId: number, color?: string, userId?: string) => void;
  updateItemQuantity: (itemId: number, quantity: number, color?: string, userId?: string) => void;
  getCartTotal: () => number;
  clearCart: (userId?: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  updateCartCount: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemQuantity: () => {},
  getCartTotal: () => 0,
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const getCartItems = (userId: string): CartItem[] => {
    try {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error getting cart items:", error);
    }
    return [];
  };

  const updateCartCount = (userId: string) => {
    try {
      const cart = getCartItems(userId);
      const count = cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
      setCartCount(count);
      setCartItems(cart);
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCartCount(0);
      setCartItems([]);
    }
  };

  const addItemToCart = (item: CartItem, userId?: string) => {
    const user = userId || auth.currentUser?.uid;
    if (!user) {
      toast.error("Please sign in to add items to your cart");
      return;
    }
    
    try {
      const currentCart = getCartItems(user);
      
      const existingItemIndex = currentCart.findIndex((cartItem: CartItem) => 
        cartItem.id === item.id && cartItem.color === item.color
      );
      
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
        toast.success("Updated item quantity in cart");
      } else {
        currentCart.push(item);
        toast.success("Item added to cart");
      }
      
      localStorage.setItem(`cart_${user}`, JSON.stringify(currentCart));
      updateCartCount(user);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeItemFromCart = (itemId: number, color?: string, userId?: string) => {
    const user = userId || auth.currentUser?.uid;
    if (!user) return;
    
    try {
      const currentCart = getCartItems(user);
      
      const updatedCart = currentCart.filter(
        item => !(item.id === itemId && item.color === color)
      );
      
      localStorage.setItem(`cart_${user}`, JSON.stringify(updatedCart));
      updateCartCount(user);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateItemQuantity = (itemId: number, quantity: number, color?: string, userId?: string) => {
    const user = userId || auth.currentUser?.uid;
    if (!user) return;
    
    try {
      const currentCart = getCartItems(user);
      
      const itemIndex = currentCart.findIndex(
        item => item.id === itemId && item.color === color
      );
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          removeItemFromCart(itemId, color, user);
          return;
        }
        
        currentCart[itemIndex].quantity = quantity;
        localStorage.setItem(`cart_${user}`, JSON.stringify(currentCart));
        updateCartCount(user);
        toast.success("Cart updated");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      toast.error("Failed to update cart");
    }
  };

  const getCartTotal = (): number => {
    try {
      return cartItems.reduce((total, item) => {
        const itemPrice = typeof item.price === 'string' ? parsePrice(item.price) : item.price;
        return total + (itemPrice * item.quantity);
      }, 0);
    } catch (error) {
      console.error("Error calculating cart total:", error);
      return 0;
    }
  };

  const clearCart = (userId?: string) => {
    const user = userId || auth.currentUser?.uid;
    if (!user) return;
    
    try {
      localStorage.removeItem(`cart_${user}`);
      setCartItems([]);
      setCartCount(0);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateCartCount(user.uid);
      } else {
        setCartCount(0);
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems,
      isCartOpen, 
      openCart, 
      closeCart, 
      toggleCart, 
      updateCartCount,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      getCartTotal,
      clearCart
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
