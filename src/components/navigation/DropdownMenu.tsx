
import { ChevronDown } from "lucide-react";

interface DropdownMenuItem {
  href: string;
  label: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export function DropdownMenu({ label, items, isOpen, onToggle }: DropdownMenuProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/10">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
