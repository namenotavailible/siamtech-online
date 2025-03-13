
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatDialog from "@/components/ui/chat-dialog";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useLanguage } from "@/contexts/LanguageContext";

const Support = () => {
  const [showChatDialog, setShowChatDialog] = useState(false);
  const { t, language } = useLanguage();

  // Placeholders in both languages
  const placeholders = language === 'th' ? [
    "ฉันจะติดตามคำสั่งซื้อของฉันได้อย่างไร?",
    "คุณรับวิธีการชำระเงินแบบใดบ้าง?",
    "ฉันจะคืนสินค้าได้อย่างไร?",
    "บอกฉันเกี่ยวกับนโยบายการรับประกันของคุณ",
    "ศูนย์บริการที่ใกล้ฉันที่สุดอยู่ที่ไหน?"
  ] : [
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
        <h1 className="text-4xl font-bold mb-8 text-white">{t("support.title")}</h1>

        <Card className="bg-black border-white/10 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageSquare className="h-5 w-5" />
              {t("support.ai_chat")}
            </CardTitle>
            <CardDescription className="text-gray-200">
              {t("support.ai_chat_description")}
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
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5" />
                {t("support.email_support")}
              </CardTitle>
              <CardDescription className="text-gray-200">
                {t("support.email_support_description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-100">
                support@siamtechonline.com<br />
                {t("support.response_time")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Phone className="h-5 w-5" />
                {t("support.phone_support")}
              </CardTitle>
              <CardDescription className="text-gray-200">
                {t("support.phone_support_description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-100">
                +(66) 99 999 9999 <span className="text-red-400 font-medium">{t("support.unavailable")}</span><br />
                {t("support.business_hours")}
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
