
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
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onSearchClick}
      >
        <Search className="h-5 w-5" />
      </button>
      <button 
        className="text-gray-300 hover:text-white transition-colors relative"
        onClick={onCartClick}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <button 
        data-auth-trigger
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onUserClick}
      >
        <User className="h-5 w-5" />
      </button>
      <button 
        className="md:hidden text-gray-300 hover:text-white transition-colors" 
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}
