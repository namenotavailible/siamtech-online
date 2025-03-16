
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Team = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>
          {language === "en" ? "Our Team - SIAMTECH Online" : "ทีมงานของเรา - SIAMTECH ออนไลน์"}
        </title>
        <meta 
          name="description" 
          content={
            language === "en" 
              ? "Meet the passionate team behind SIAMTECH's success." 
              : "พบกับทีมงานที่มีความหลงใหลซึ่งอยู่เบื้องหลังความสำเร็จของ SIAMTECH"
          } 
        />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === "en" ? "Our Team" : "ทีมงานของเรา"}
          </h1>
          
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
            {language === "en" 
              ? "Meet the passionate professionals behind SIAMTECH who are dedicated to bringing you the best tech products and experiences."
              : "พบกับมืออาชีพที่มีความหลงใหลเบื้องหลัง SIAMTECH ซึ่งทุ่มเทเพื่อนำเสนอผลิตภัณฑ์และประสบการณ์ด้านเทคโนโลยีที่ดีที่สุดให้กับคุณ"}
          </p>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">
              {language === "en" ? "Team page under development" : "หน้าทีมงานอยู่ระหว่างการพัฒนา"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              {language === "en" 
                ? "We're currently updating our team information. Please check back soon to meet the talented individuals who make SIAMTECH possible."
                : "เรากำลังอัปเดตข้อมูลทีมงานของเรา โปรดกลับมาเร็ว ๆ นี้เพื่อพบกับบุคคลที่มีความสามารถซึ่งทำให้ SIAMTECH เป็นไปได้"}
            </p>
            <Button>
              {language === "en" ? "Back to Home" : "กลับไปยังหน้าหลัก"}
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default Team;
