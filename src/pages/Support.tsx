
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatDialog from "@/components/ui/chat-dialog";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const Support = () => {
  const [showChatDialog, setShowChatDialog] = useState(false);

  const placeholders = [
    "How can I track my order?",
    "What payment methods do you accept?",
    "How do I return a product?",
    "Tell me about your warranty policy",
    "Where is my nearest service center?"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowChatDialog(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Support Center</h1>

        <Card className="bg-black border-white/10 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Chat Support
            </CardTitle>
            <CardDescription className="text-gray-400">
              Get instant answers to your questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get in touch via email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                support@siamtechonline.com<br />
                Response within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Support
              </CardTitle>
              <CardDescription className="text-gray-400">
                Talk to our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                +(66) 99 999 9999 <span className="text-red-400">(Unavailable)</span><br />
                Mon-Fri: 9AM-6PM EST
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footerdemo />
      <ChatDialog open={showChatDialog} onOpenChange={setShowChatDialog} />
    </div>
  );
};

export default Support;
