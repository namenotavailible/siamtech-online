
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatDialog = ({ open, onOpenChange }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Improved keyboard detection logic
  useEffect(() => {
    if (!isMobile || !open) return;
    
    const detectKeyboard = () => {
      if (!window.visualViewport) return;
      
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;
      
      // Only update if the difference is significant (keyboard is likely open)
      if (heightDiff > 60) {
        // Position chat just above keyboard with some padding
        setKeyboardHeight(heightDiff);
      } else {
        setKeyboardHeight(0);
      }
    };
    
    // Initial detection
    detectKeyboard();
    
    // Listen to viewport and window size changes
    window.visualViewport?.addEventListener('resize', detectKeyboard);
    window.addEventListener('resize', detectKeyboard);
    
    return () => {
      window.visualViewport?.removeEventListener('resize', detectKeyboard);
      window.removeEventListener('resize', detectKeyboard);
    };
  }, [isMobile, open]);
  
  // Automatically scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use a small timeout to ensure scrolling happens after render
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, keyboardHeight]);

  // Handle body scrolling when dialog is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isMobile]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() } as const;
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { prompt: input.trim() }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: "assistant", content: data.generatedText }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate appropriate height for mobile chat
  const getMobileHeight = () => {
    if (keyboardHeight > 0) {
      // When keyboard is open, use a percentage of the available space
      return `calc(${window.visualViewport?.height || window.innerHeight}px - ${keyboardHeight}px - 20px)`;
    }
    // Default height when keyboard is closed
    return "60vh";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        ref={dialogRef}
        className={`
          fixed p-0 flex flex-col
          bg-black/40 backdrop-blur-xl border border-white/10
          transition-all duration-300 ease-in-out
          
          ${isMobile 
            ? "w-full max-w-full rounded-t-2xl" 
            : "sm:max-w-[400px] sm:rounded-2xl sm:right-6 sm:left-auto sm:bottom-[88px] sm:h-[600px]"
          }
        `}
        style={{
          bottom: isMobile ? (keyboardHeight > 0 ? `${keyboardHeight}px` : 0) : undefined,
          left: isMobile ? 0 : undefined,
          right: isMobile ? 0 : undefined,
          top: "auto",
          transform: "none",
          maxHeight: isMobile ? getMobileHeight() : undefined,
          height: isMobile ? getMobileHeight() : undefined,
          zIndex: 100,
        }}
      >
        <DialogTitle className="sr-only">Chat Dialog</DialogTitle>
        <DialogDescription className="sr-only">
          Chat with our AI assistant
        </DialogDescription>
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 sm:pb-24 
                    scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-white/10"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-white/10 text-white backdrop-blur-sm"
                    : "bg-white/5 text-white/90 backdrop-blur-sm"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-white/50" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSendMessage}
            loading={isLoading}
            className="bg-transparent border-white/10"
          >
            <ChatInputTextArea 
              placeholder="Message..." 
              className="text-white placeholder:text-white/50"
            />
            <ChatInputSubmit className="bg-white/10 hover:bg-white/20 text-white border-white/10" />
          </ChatInput>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
