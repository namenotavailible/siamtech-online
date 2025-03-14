
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatDialog from "@/components/ui/chat-dialog";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";
import { useTheme } from "@/contexts/ThemeContext";

const Support = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [showChatDialog, setShowChatDialog] = useState(false);

  const placeholdersTH = [
    "ฉันสามารถติดตามคำสั่งซื้อของฉันได้อย่างไร?",
    "คุณรับวิธีการชำระเงินอะไรบ้าง?",
    "ฉันจะคืนสินค้าได้อย่างไร?",
    "ข้อมูลเกี่ยวกับนโยบายการรับประกันของคุณ",
    "ศูนย์บริการที่ใกล้ฉันที่สุดอยู่ที่ไหน?"
  ];

  const placeholdersEN = [
    "How can I track my order?",
    "What payment methods do you accept?",
    "How do I return a product?",
    "Tell me about your warranty policy",
    "Where is my nearest service center?"
  ];

  const placeholders = language === "th" ? placeholdersTH : placeholdersEN;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowChatDialog(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>{language === "en" ? "Support - SIAMTECH Online" : "บริการช่วยเหลือ - SIAMTECH ออนไลน์"}</title>
        <meta name="description" content={language === "en" 
          ? "Get help with your SIAMTECH products, track orders, and access customer support." 
          : "รับความช่วยเหลือเกี่ยวกับสินค้า SIAMTECH ติดตามคำสั่งซื้อ และเข้าถึงฝ่ายบริการลูกค้า"} />
        <html lang={language} />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {language === "en" ? "Support Center" : "ศูนย์ช่วยเหลือ"}
        </h1>

        <Card className={`${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-200'} mb-12`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {language === "en" ? "AI Chat Support" : "บริการแชทอัจฉริยะ"}
            </CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}>
              {language === "en" ? "Get instant answers to your questions" : "รับคำตอบทันทีสำหรับคำถามของคุณ"}
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
          <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {language === "en" ? "Email Support" : "สนับสนุนทางอีเมล"}
              </CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}>
                {language === "en" ? "Get in touch via email" : "ติดต่อทางอีเมล"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
                support@siamtechonline.com<br />
                {language === "en" ? "Response within 24 hours" : "ตอบกลับภายใน 24 ชั่วโมง"}
              </p>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {language === "en" ? "Phone Support" : "สนับสนุนทางโทรศัพท์"}
              </CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}>
                {language === "en" ? "Talk to our support team" : "พูดคุยกับทีมสนับสนุนของเรา"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
                +(66) 99 999 9999 <span className="text-red-400 font-medium">
                  {language === "en" ? "(Unavailable)" : "(ไม่พร้อมให้บริการ)"}
                </span><br />
                {language === "en" ? "Mon-Fri: 9AM-6PM EST" : "จันทร์-ศุกร์: 9.00-18.00 น."}
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
