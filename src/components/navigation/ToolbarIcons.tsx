
import { Search, ShoppingCart, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ToolbarIconsProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  onAuthClick: (type: 'login' | 'signup') => void;
  isAuthenticated: boolean;
  cartCount: number;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  toggleTheme: () => void;
}

export function ToolbarIcons({
  onSearchClick,
  onCartClick,
  onAuthClick,
  isAuthenticated,
  cartCount,
  isSearchOpen,
  toggleSearch,
  toggleTheme
}: ToolbarIconsProps) {
  const { theme } = useTheme();

  return (
    <>
      <button 
        className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}
        onClick={toggleSearch}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
      <button 
        className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors relative`}
        onClick={onCartClick}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <button 
        className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}
        onClick={() => onAuthClick('login')}
        aria-label="User account"
      >
        <User className="h-5 w-5" />
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-yellow-200" aria-hidden="true" />
        ) : (
          <Moon size={20} className="text-gray-700" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
