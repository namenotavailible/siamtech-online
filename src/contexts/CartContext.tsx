
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';

interface CartContextType {
  cartCount: number;
  updateCartCount: (userId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (userId: string) => {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
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
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
