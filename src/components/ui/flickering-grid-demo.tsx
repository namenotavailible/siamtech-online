
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useTheme } from "@/contexts/ThemeContext";

export function FlickeringGridDemo() {
  const { theme } = useTheme();
  
  // Only show in light mode
  if (theme === "dark") {
    return null;
  }
  
  return (
    <div className="relative h-[500px] rounded-lg w-full bg-background overflow-hidden border">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#000000"
        maxOpacity={0.2}
        flickerChance={0.3}
        height={800}
        width={800}
      />
    </div>
  );
}
