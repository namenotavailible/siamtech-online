
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const FloatingChat = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative bg-black/90 backdrop-blur-lg text-white rounded-full p-4 shadow-lg flex items-center gap-2 border border-white/10">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-medium pr-2">Chat</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 absolute -top-2 -right-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingChat;
