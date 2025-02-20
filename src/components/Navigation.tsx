
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex flex-col items-start -space-y-1">
              <span className="text-white text-lg font-medium tracking-wide">SIAMTECH</span>
              <span className="text-gray-400 text-[0.65rem] font-light tracking-widest uppercase">online</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </a>
            <a href="/collections" className="text-gray-300 hover:text-white transition-colors">
              Collections
            </a>
            <a href="/support" className="text-gray-300 hover:text-white transition-colors">
              Support
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button 
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="/products" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Products
              </a>
              <a href="/collections" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Collections
              </a>
              <a href="/support" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Support
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
