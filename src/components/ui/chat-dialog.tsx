
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
      <DialogContent className="!fixed !bottom-0 !left-0 !right-0 !top-auto !translate-x-0 !translate-y-0 sm:!right-6 sm:!left-auto sm:!bottom-[88px] sm:max-w-[400px] h-[85vh] sm:h-[600px] flex flex-col p-0 rounded-t-2xl sm:rounded-2xl bg-zinc-900 border-zinc-800">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 sm:pb-4 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700">
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
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-100"
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
              <div className="bg-zinc-800 rounded-2xl px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 absolute bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 items-center"
          >
            <Input
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl h-11"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-11 shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
