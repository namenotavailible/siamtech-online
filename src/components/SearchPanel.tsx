
import { motion } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchProducts = (query: string) => {
    // This is a mock search function. In a real app, you'd fetch from an API
    const allProducts = [
      {
        id: 1,
        name: "FIFINE Ampligame AM8",
        price: "2,490 ฿",
        image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
        category: "Dynamic Microphone"
      },
      {
        id: 2,
        name: "FIFINE Ampligame A8",
        price: "1,990 ฿",
        image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
        category: "Condenser Microphone"
      },
      // Add more products as needed
    ];

    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchQuery) {
      const searchResults = searchProducts(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      )}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-0 left-0 right-0 bg-gray-900 shadow-xl z-50 ${!isOpen && 'pointer-events-none'}`}
      >
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-4">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              {results.map((result) => (
                <Link
                  key={result.id}
                  to={`/product/${result.id}`}
                  className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  <img src={result.image} alt={result.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="text-white font-medium">{result.name}</h3>
                    <p className="text-gray-400">{result.category}</p>
                    <p className="text-gray-400">{result.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchQuery && results.length === 0 && (
            <div className="mt-6 text-center text-gray-400">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SearchPanel;
