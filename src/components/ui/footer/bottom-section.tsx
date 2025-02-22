import { Link } from "react-router-dom";
export function BottomSection() {
  return <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center md:flex-row">
      <p className="text-sm text-gray-400" contentEditable suppressContentEditableWarning>© 2025 Siamtech Online Group Co.,Ltd. All rights reserved.</p>
      <nav className="flex gap-6 text-sm">
        <Link to="/privacy" className="text-gray-400 transition-colors hover:text-white" contentEditable suppressContentEditableWarning>
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-gray-400 transition-colors hover:text-white" contentEditable suppressContentEditableWarning>
          Terms of Service
        </Link>
        <Link to="/cookies" className="text-gray-400 transition-colors hover:text-white" contentEditable suppressContentEditableWarning>
          Cookie Settings
        </Link>
      </nav>
    </div>;
}