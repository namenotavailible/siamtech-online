
import { Link } from "react-router-dom";

export function QuickLinks() {
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-white"
        contentEditable
        suppressContentEditableWarning
      >
        Quick Links
      </h3>
      <nav className="flex flex-col space-y-3 text-sm">
        <Link 
          to="/" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          About Us
        </Link>
        <Link 
          to="/products" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          Products
        </Link>
        <Link 
          to="/contact" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
