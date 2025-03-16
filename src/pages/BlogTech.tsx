
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogTech = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const articles = [
    {
      id: 101,
      title: language === "en" ? "The Future of AI in Consumer Electronics" : "อนาคตของ AI ในอุปกรณ์อิเล็กทรอนิกส์สำหรับผู้บริโภค",
      excerpt: language === "en" 
        ? "Exploring how artificial intelligence is revolutionizing everyday tech products." 
        : "สำรวจว่าปัญญาประดิษฐ์กำลังปฏิวัติผลิตภัณฑ์เทคโนโลยีในชีวิตประจำวันอย่างไร",
      image: "https://images.unsplash.com/photo-1677442135109-63fdb45a3fab?q=80&w=2832&auto=format&fit=crop",
      date: "2023-11-25",
      category: "tech"
    },
    {
      id: 102,
      title: language === "en" ? "5G Technology: What it Means for Gamers" : "เทคโนโลยี 5G: ความหมายสำหรับเกมเมอร์",
      excerpt: language === "en" 
        ? "How the latest network technology is changing online gaming experiences." 
        : "เทคโนโลยีเครือข่ายล่าสุดกำลังเปลี่ยนแปลงประสบการณ์การเล่นเกมออนไลน์อย่างไร",
      image: "https://images.unsplash.com/photo-1626240130051-68871c71de69?q=80&w=3000&auto=format&fit=crop",
      date: "2023-11-18",
      category: "tech"
    },
    {
      id: 103,
      title: language === "en" ? "The Rise of Smart Home Audio Systems" : "การเติบโตของระบบเสียงอัจฉริยะภายในบ้าน",
      excerpt: language === "en" 
        ? "Exploring how connected speakers are becoming the center of smart home ecosystems." 
        : "สำรวจว่าลำโพงที่เชื่อมต่อกันกำลังกลายเป็นศูนย์กลางของระบบนิเวศบ้านอัจฉริยะอย่างไร",
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=3131&auto=format&fit=crop",
      date: "2023-11-10",
      category: "tech"
    },
    {
      id: 104,
      title: language === "en" ? "Sustainable Tech: The Green Revolution" : "เทคโนโลยียั่งยืน: การปฏิวัติสีเขียว",
      excerpt: language === "en" 
        ? "How tech companies are embracing eco-friendly practices in product development." 
        : "บริษัทเทคโนโลยีกำลังนำแนวปฏิบัติที่เป็นมิตรกับสิ่งแวดล้อมมาใช้ในการพัฒนาผลิตภัณฑ์อย่างไร",
      image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=2970&auto=format&fit=crop",
      date: "2023-11-05",
      category: "tech"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>
          {language === "en" ? "Tech News - SIAMTECH Blog" : "ข่าวเทคโนโลยี - บทความ SIAMTECH"}
        </title>
        <meta 
          name="description" 
          content={
            language === "en" 
              ? "Latest tech news, trends, and insights from SIAMTECH Online." 
              : "ข่าวเทคโนโลยีล่าสุด เทรนด์ และข้อมูลเชิงลึกจาก SIAMTECH ออนไลน์"
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
          <div className="text-center mb-12">
            <Link to="/blog" className="text-sm text-primary hover:underline">
              {language === "en" ? "← Back to All Articles" : "← กลับไปดูบทความทั้งหมด"}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              {language === "en" ? "Tech News" : "ข่าวเทคโนโลยี"}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: article.id * 0.02 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className={`overflow-hidden h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}`}>
                  <div className="aspect-video relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-primary font-medium">
                        {new Date(article.date).toLocaleDateString(language === "en" ? "en-US" : "th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {language === "en" ? "Tech" : "เทคโนโลยี"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {article.excerpt}
                    </p>
                    <Link to={`/blog/${article.id}`}>
                      <Button variant="outline" size="sm">
                        {language === "en" ? "Read More" : "อ่านเพิ่มเติม"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default BlogTech;
