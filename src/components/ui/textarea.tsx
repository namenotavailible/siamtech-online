
import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, autoFocus = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-white/10 bg-transparent backdrop-blur-sm px-3 py-2 text-sm text-white shadow-sm transition-shadow placeholder:text-white/50 focus-visible:outline-none focus-visible:border-white/20 focus-visible:ring-[2px] focus-visible:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        autoFocus={autoFocus}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
