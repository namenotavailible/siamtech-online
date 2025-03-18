
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChatDialog from "./chat-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingChat = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const isMobile = useIsMobile();

  // Add effect to handle body scrolling when dialog is open on mobile
  useEffect(() => {
    if (isMobile && showDialog) {
      // Prevent background scrolling when chat is open on mobile
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showDialog, isMobile]);

  // Close dialog when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDialog) {
        setShowDialog(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showDialog]);

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div 
            className="relative bg-black/90 backdrop-blur-lg text-white rounded-full p-4 shadow-lg flex items-center gap-2 border border-white/10 cursor-pointer hover:bg-black/80 transition-colors"
            onClick={() => setShowDialog(true)}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium pr-2">Chat</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 absolute -top-2 -right-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <ChatDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
};

export default FloatingChat;
