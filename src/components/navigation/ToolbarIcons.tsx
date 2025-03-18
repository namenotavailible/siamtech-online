
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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
        data-auth-trigger
        className="text-black hover:text-gray-600 transition-colors"
        onClick={onUserClick}
      >
        <User className="h-5 w-5" />
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
