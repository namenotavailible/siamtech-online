
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface ToolbarIconsProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  onUserClick: () => void;
  onMenuClick: () => void;
}

export function ToolbarIcons({
  onSearchClick,
  onCartClick,
  onUserClick,
  onMenuClick
}: ToolbarIconsProps) {
  const { cartCount } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <>
      <button 
        className="text-black hover:text-gray-600 transition-colors"
        onClick={onSearchClick}
      >
        <Search className="h-5 w-5" />
      </button>
      <button 
        className="text-black hover:text-gray-600 transition-colors relative"
        onClick={onCartClick}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <button 
        data-auth-trigger={!isAuthenticated}
        className="text-black hover:text-gray-600 transition-colors"
        onClick={onUserClick}
      >
        <User className="h-5 w-5" />
        {isAuthenticated && (
          <span className="absolute -top-2 -right-2 bg-green-500 w-2 h-2 rounded-full"></span>
        )}
      </button>
      <button 
        className="md:hidden text-black hover:text-gray-600 transition-colors" 
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}
