
"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string;
  isDark?: boolean;
  onDarkModeChange?: (isDark: boolean) => void;
}

export function ThemeToggle({ className, isDark = true, onDarkModeChange }: ThemeToggleProps) {
  const [internalIsDark, setInternalIsDark] = useState(isDark)

  const toggleDark = () => {
    const newValue = !internalIsDark;
    setInternalIsDark(newValue);
    onDarkModeChange?.(newValue);
  }

  // Use the controlled or uncontrolled isDark value
  const actualIsDark = onDarkModeChange ? isDark : internalIsDark;

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        actualIsDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={toggleDark}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            actualIsDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {actualIsDark ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-gray-700" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            actualIsDark 
              ? "bg-transparent" 
              : "transform -translate-x-8"
          )}
        >
          {actualIsDark ? (
            <Sun 
              className="w-4 h-4 text-gray-500" 
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className="w-4 h-4 text-black" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}
