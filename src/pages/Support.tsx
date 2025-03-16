import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Phone, MessageSquare, Coffee, Users, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatDialog from "@/components/ui/chat-dialog";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const faqItemsEN = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'My Orders' section. Alternatively, you can use the tracking number provided in your shipping confirmation email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, PayPal, bank transfers, and various digital wallets. All transactions are secured with industry-standard encryption."
    },
    {
      question: "How do I return a product?",
      answer: "To return a product, please contact our support team within 14 days of receiving your order. We'll provide you with a return authorization and instructions for shipping the item back to us."
    },
    {
      question: "What is your warranty policy?",
      answer: "All SIAMTECH products come with a one-year limited warranty from the date of purchase, covering manufacturing defects in materials and workmanship under normal use conditions."
    },
    {
      question: "How do I contact technical support?",
      answer: "You can reach our technical support team via email at support@siamtechonline.com, through our live chat service, or by using the contact form on this page."
    }
  ];
  
  const faqItemsTH = [
    {
      question: "ฉันสามารถติดตามคำสั่งซื้อของฉันได้อย่างไร?",
      answer: "คุณสามารถติดตามคำสั่งซื้อได้โดยเข้าสู่ระบบบัญชีของคุณและไปที่ส่วน 'คำสั่งซื้อของฉัน' หรือคุณสามารถใช้เลขติดตามที่ให้ไว้ในอีเมลยืนยันการจัดส่งของคุณ"
    },
    {
      question: "คุณรับวิธีการชำระเงินอะไรบ้าง?",
      answer: "เรารับบัตรเครดิตและเดบิตหลัก PayPal การโอนเงินผ่านธนาคาร และกระเป๋าเงินดิจิทัลต่างๆ ธุรกรรมทั้งหมดได้รับการรักษาความปลอดภัยด้วยการเข้ารหัสตามมาตรฐานอุตสาหกรรม"
    },
    {
      question: "ฉันจะคืนสินค้าได้อย่างไร?",
      answer: "เพื่อคืนสินค้า กรุณาติดต่อทีมสนับสนุนของเราภายใน 14 วันหลังจากได้รับคำสั่งซื้อของคุณ เราจะให้การอนุญาตการคืนสินค้าและคำแนะนำสำหรับการส่งสินค้ากลับมายังเรา"
    },
    {
      question: "นโยบายการรับประกันของคุณคืออะไร?",
      answer: "สินค้า SIAMTECH ทุกชิ้นมาพร้อมกับการรับประกันแบบจำกัดหนึ่งปีนับจากวันที่ซื้อ ครอบคลุมข้อบกพร่องในการผลิตในวัสดุและฝีมือภายใต้สภาวะการใช้งานปกติ"
    },
    {
      question: "ฉันจะติดต่อฝ่ายสนับสนุนทางเทคนิคได้อย่างไร?",
      answer: "คุณสามารถติดต่อทีมสนับสนุนทางเทคนิคของเราทางอีเมลที่ support@siamtechonline.com ผ่านบริการแชทสด หรือโดยใช้แบบฟอร์มติดต่อในหน้านี้"
    }
  ];

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
        <h1 className="text-4xl font-bold mb-12 text-left">
          {language === "en" ? "Support Center" : "ศูนย์ช่วยเหลือ"}
        </h1>

        <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              {language === "en" ? "Meet Our Support Team" : "พบกับทีมสนับสนุนของเรา"}
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
              {language === "en" 
                ? "Our dedicated support team is available to assist you with any questions or issues you may have. With extensive knowledge of our products and services, our team is committed to providing prompt and helpful solutions for your complete satisfaction. Our specialists have years of experience in technical support, ensuring you receive expert assistance for all your inquiries." 
                : "ทีมสนับสนุนที่ทุ่มเทของเรามีพร้อมให้ความช่วยเหลือคุณในเรื่องคำถามหรือปัญหาต่างๆ ที่คุณอาจมี ด้วยความรู้ที่กว้างขวางเกี่ยวกับสินค้าและบริการของเรา ทีมของเรามุ่งมั่นที่จะให้วิธีแก้ปัญหาที่รวดเร็วและเป็นประโยชน์เพื่อความพึงพอใจของคุณ ผู้เชี่ยวชาญของเรามีประสบการณ์หลายปีในด้านการสนับสนุนทางเทคนิค ทำให้มั่นใจได้ว่าคุณจะได้รับความช่วยเหลือจากผู้เชี่ยวชาญสำหรับทุกคำถาม"}
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === "en" 
                ? "Available Monday to Friday from 9:00 AM to 6:00 PM (Thailand time), our specialists are ready to help you through chat, email, or phone support channels." 
                : "ให้บริการวันจันทร์ถึงวันศุกร์ตั้งแต่ 9.00 น. ถึง 18.00 น. (เวลาประเทศไทย) ผู้เชี่ยวชาญของเราพร้อมช่วยเหลือคุณผ่านช่องทางการสนับสนุนทางแชท อีเมล หรือโทรศัพท์"}
            </p>
          </div>
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/bcdf99dc-db14-4a07-8243-6a3174617963.png" 
                alt={language === "en" ? "Support team mascot" : "มาสคอตทีมสนับสนุน"} 
                className="w-full h-auto"
              />
              <p className={`text-xs italic text-center mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === "en" ? "Image credit: Grok AI" : "เครดิตภาพ: Grok AI"}
              </p>
            </div>
          </div>
        </div>

        <Card className={`${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-200'} mb-12`}>
          <CardHeader className="text-left">
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
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader className="text-left">
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
            <CardHeader className="text-left">
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

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            {language === "en" ? "Frequently Asked Questions" : "คำถามที่พบบ่อย"}
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {(language === "en" ? faqItemsEN : faqItemsTH).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Footerdemo />
      <ChatDialog open={showChatDialog} onOpenChange={setShowChatDialog} />
    </div>
  );
};

export default Support;
