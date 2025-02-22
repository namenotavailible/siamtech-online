
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatDialog from "@/components/ui/chat-dialog";

const Support = () => {
  const [showChatDialog, setShowChatDialog] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Support Center</h1>

        <Card className="bg-white/5 border-white/10 mb-12">
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
            <p className="text-gray-300 mb-4">
              Chat with our AI assistant for immediate help with product information, troubleshooting, and general inquiries.
            </p>
            <Button 
              onClick={() => setShowChatDialog(true)}
              className="bg-white/10 hover:bg-white/20"
            >
              Start Chat
            </Button>
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
