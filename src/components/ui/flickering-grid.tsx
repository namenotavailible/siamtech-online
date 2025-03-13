
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  height?: number;
  width?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  className,
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  height = 800,
  width = 800,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number>(0);
  const gridRef = useRef<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Scale all drawing operations
    ctx.scale(dpr, dpr);
    
    // Set display size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Calculate how many squares we can fit
    const cellSize = squareSize + gridGap;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // Initialize grid squares
    gridRef.current = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        gridRef.current.push({
          x: x * cellSize + gridGap / 2,
          y: y * cellSize + gridGap / 2,
          opacity: Math.random() * maxOpacity,
        });
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set grid color based on theme
      const actualColor = theme === "dark" ? color : color;

      // Draw and potentially update each square
      gridRef.current.forEach((square, index) => {
        // Randomly decide if this square should flicker
        if (Math.random() < flickerChance) {
          // Change opacity
          square.opacity = Math.random() * maxOpacity;
        }

        // Draw the square
        ctx.fillStyle = `${actualColor}${Math.floor(square.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fillRect(square.x, square.y, squareSize, squareSize);
      });

      // Schedule the next frame
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start the animation
    draw();

    return () => {
      // Clean up on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance, height, width, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("", className)}
      style={{ width, height }}
    />
  );
};
