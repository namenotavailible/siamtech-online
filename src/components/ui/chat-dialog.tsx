
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
      <DialogContent className="!fixed !bottom-0 !left-0 !right-0 !top-auto !translate-x-0 !translate-y-0 sm:!right-6 sm:!left-auto sm:!bottom-[88px] sm:max-w-[320px] h-[80vh] sm:h-[400px] flex flex-col p-0 rounded-t-2xl sm:rounded-2xl bg-white/5 backdrop-blur-lg border-white/10">
        <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-16 sm:pb-3">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-2.5 text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-white/90"
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
              <div className="bg-white/5 rounded-lg p-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-white/50" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
