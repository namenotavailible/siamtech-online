
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const BlogReviews = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const reviews = [
    {
      id: 201,
      title: language === "en" ? "FIFINE Ampligame AM8 Review: Pro-Level Audio at a Fair Price" : "รีวิว FIFINE Ampligame AM8: เสียงระดับมืออาชีพในราคาที่เหมาะสม",
      excerpt: language === "en" 
        ? "Our in-depth review of the FIFINE Ampligame AM8 dynamic microphone for streamers and content creators." 
        : "รีวิวเชิงลึกของไมโครโฟนไดนามิก FIFINE Ampligame AM8 สำหรับสตรีมเมอร์และครีเอเตอร์",
      image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
      date: "2023-11-22",
      rating: 4.5,
      category: "review"
    },
    {
      id: 202,
      title: language === "en" ? "VXE Dragonfly R1 Gaming Mouse: Worth the Hype?" : "เมาส์เกมมิ่ง VXE Dragonfly R1: คุ้มค่ากับกระแสหรือไม่?",
      excerpt: language === "en" 
        ? "Is this high-performance gaming mouse really as good as everyone says? We put it to the test." 
        : "เมาส์เกมมิ่งประสิทธิภาพสูงนี้ดีจริงอย่างที่ทุกคนพูดหรือไม่? เราได้ทดสอบแล้ว",
      image: "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
      date: "2023-11-15",
      rating: 4.8,
      category: "review"
    },
    {
      id: 203,
      title: language === "en" ? "FIFINE Ampligame A8 vs Competitor Mics: The Ultimate Comparison" : "FIFINE Ampligame A8 vs ไมค์คู่แข่ง: การเปรียบเทียบขั้นสุดยอด",
      excerpt: language === "en" 
        ? "How does the FIFINE Ampligame A8 stack up against other popular streaming microphones in its price range?" 
        : "FIFINE Ampligame A8 เปรียบเทียบกับไมโครโฟนสตรีมมิ่งยอดนิยมอื่น ๆ ในช่วงราคาเดียวกันอย่างไร?",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      date: "2023-11-08",
      rating: 4.2,
      category: "review"
    },
    {
      id: 204,
      title: language === "en" ? "VGN Dragonfly F1 Review: The Perfect Mouse for FPS Gamers?" : "รีวิว VGN Dragonfly F1: เมาส์ที่สมบูรณ์แบบสำหรับเกมเมอร์ FPS?",
      excerpt: language === "en" 
        ? "Our detailed review of the VGN Dragonfly F1 gaming mouse, designed specifically for first-person shooter games." 
        : "รีวิวโดยละเอียดของเมาส์เกมมิ่ง VGN Dragonfly F1 ที่ออกแบบมาโดยเฉพาะสำหรับเกมยิงมุมมองบุคคลที่หนึ่ง",
      image: "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
      date: "2023-11-01",
      rating: 4.7,
      category: "review"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Helmet>
        <title>
          {language === "en" ? "Product Reviews - SIAMTECH Blog" : "รีวิวสินค้า - บทความ SIAMTECH"}
        </title>
        <meta 
          name="description" 
          content={
            language === "en" 
              ? "Honest and in-depth reviews of tech products from SIAMTECH Online." 
              : "รีวิวสินค้าเทคโนโลยีอย่างซื่อสัตย์และเจาะลึกจาก SIAMTECH ออนไลน์"
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
              {language === "en" ? "Product Reviews" : "รีวิวสินค้า"}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: review.id * 0.01 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className={`overflow-hidden h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}`}>
                  <div className="aspect-video relative">
                    <img 
                      src={review.image} 
                      alt={review.title}
                      className="w-full h-full object-contain p-4" 
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-primary font-medium">
                        {new Date(review.date).toLocaleDateString(language === "en" ? "en-US" : "th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {language === "en" ? "Review" : "รีวิว"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{review.title}</h3>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {review.excerpt}
                    </p>
                    <Link to={`/blog/${review.id}`}>
                      <Button variant="outline" size="sm">
                        {language === "en" ? "Read Full Review" : "อ่านรีวิวเต็ม"}
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

export default BlogReviews;
