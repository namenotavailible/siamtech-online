
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Team = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const teamMembers = [
    {
      id: 1,
      name: language === "en" ? "Somchai Jaidee" : "สมชาย ใจดี",
      position: language === "en" ? "CEO & Founder" : "ซีอีโอและผู้ก่อตั้ง",
      bio: language === "en" 
        ? "With over 15 years of experience in the tech industry, Somchai founded SIAMTECH with a vision to bring cutting-edge technology to Thai consumers." 
        : "ด้วยประสบการณ์กว่า 15 ปีในอุตสาหกรรมเทคโนโลยี สมชายก่อตั้ง SIAMTECH ด้วยวิสัยทัศน์ที่จะนำเทคโนโลยีล้ำสมัยมาสู่ผู้บริโภคชาวไทย",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      id: 2,
      name: language === "en" ? "Wanida Thongchai" : "วนิดา ทองชัย",
      position: language === "en" ? "COO" : "ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ",
      bio: language === "en" 
        ? "Wanida oversees all operational aspects of SIAMTECH, ensuring that we deliver the best quality products and services to our customers." 
        : "วนิดาดูแลด้านปฏิบัติการทั้งหมดของ SIAMTECH เพื่อให้มั่นใจว่าเราส่งมอบผลิตภัณฑ์และบริการที่มีคุณภาพสูงสุดให้กับลูกค้าของเรา",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      id: 3,
      name: language === "en" ? "Nattapong Suksai" : "ณัฐพงษ์ สุขใส",
      position: language === "en" ? "CTO" : "ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี",
      bio: language === "en" 
        ? "As our tech visionary, Nattapong leads product development and ensures that we stay at the forefront of technological innovation." 
        : "ในฐานะผู้มีวิสัยทัศน์ด้านเทคโนโลยีของเรา ณัฐพงษ์นำทีมพัฒนาผลิตภัณฑ์และดูแลให้เราอยู่ในแนวหน้าของนวัตกรรมทางเทคโนโลยี",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      id: 4,
      name: language === "en" ? "Siriporn Rungroj" : "ศิริพร รุ่งโรจน์",
      position: language === "en" ? "CMO" : "ประธานเจ้าหน้าที่ฝ่ายการตลาด",
      bio: language === "en" 
        ? "Siriporn drives our brand strategy and marketing efforts, helping us connect with tech enthusiasts across Thailand." 
        : "ศิริพรขับเคลื่อนกลยุทธ์แบรนด์และการตลาดของเรา ช่วยให้เราเชื่อมต่อกับผู้ที่ชื่นชอบเทคโนโลยีทั่วประเทศไทย",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    }
  ];

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: member.id * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0" 
                />
                <div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default Team;
