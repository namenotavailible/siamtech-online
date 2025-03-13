
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Button
            className={cn(
                "relative h-10 px-4 overflow-hidden",
                isDark ? "bg-zinc-900" : "bg-black", 
                "transition-all duration-200",
                "group",
                className
            )}
            {...props}
        >
            {/* Gradient background effect */}
            <div
                className={cn(
                    "absolute inset-0",
                    isDark 
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" 
                        : "bg-gradient-to-r from-gray-700 via-gray-800 to-black",
                    "opacity-40 group-hover:opacity-80",
                    "blur transition-opacity duration-500"
                )}
            />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span className={isDark ? "text-white" : "text-white"}>{label}</span>
                <ArrowUpRight className={isDark ? "w-3.5 h-3.5 text-white/90" : "w-3.5 h-3.5 text-white/90"} />
            </div>
        </Button>
    );
}
