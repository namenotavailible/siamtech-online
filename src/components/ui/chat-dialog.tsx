
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const isMobile = useIsMobile();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Detect keyboard visibility and height on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const detectKeyboard = () => {
      // Check if the viewport height has changed significantly
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;
      
      // If the difference is significant, we assume keyboard is visible
      const isVisible = heightDiff > 150;
      setKeyboardVisible(isVisible);
      setKeyboardHeight(isVisible ? heightDiff : 0);
    };
    
    // Listen to viewport and window size changes
    window.visualViewport?.addEventListener('resize', detectKeyboard);
    window.addEventListener('resize', detectKeyboard);
    
    return () => {
      window.visualViewport?.removeEventListener('resize', detectKeyboard);
      window.removeEventListener('resize', detectKeyboard);
    };
  }, [isMobile]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`
          !fixed !translate-x-0 
          sm:!right-6 sm:!left-auto sm:!bottom-[88px] sm:max-w-[400px] sm:h-[600px]
          ${keyboardVisible 
            ? `!bottom-[${keyboardHeight}px] h-[40vh]` 
            : '!bottom-0 !left-0 !right-0 !top-auto !translate-y-0 h-[60vh]'
          }
          flex flex-col p-0 rounded-t-2xl sm:rounded-2xl 
          bg-black/40 backdrop-blur-xl border border-white/10
          transition-all duration-300 ease-in-out
          ${keyboardVisible ? 'keyboard-visible' : ''}
        `}
        style={{
          bottom: keyboardVisible ? keyboardHeight : 0,
          left: 0,
          right: 0,
          top: keyboardVisible ? 'auto' : 'auto',
        }}
      >
        <DialogTitle className="sr-only">Chat Dialog</DialogTitle>
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 sm:pb-24 
                    scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-white/10 
                    max-h-[calc(60vh-80px)] sm:max-h-[520px]"
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
