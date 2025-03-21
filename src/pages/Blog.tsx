import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { Calendar, User } from "lucide-react";

const BlogCard = ({ 
  title, 
  excerpt, 
  date, 
  author, 
  image, 
  id,
  tags = [] 
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  author: string; 
  image: string;
  id: string;
  tags?: string[];
}) => {
  return (
    <Link 
      to={`/blog/${id}`} 
      className="block group"
      aria-label={`Read more about ${title}`}
    >
      <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full"
                role="note"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center" aria-label="Published date">
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <time dateTime={date}>{date}</time>
            </div>
            <div className="flex items-center" aria-label="Author">
              <User className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{author}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

const Blog = () => {
  const { language } = useLanguage();

  const blogPosts = language === "en" ? [
    {
      id: "dynamic-vs-condenser",
      title: "Dynamic vs Condenser Microphones: Which One Is Right for You?",
      excerpt: "Understanding the differences between dynamic and condenser microphones is crucial for selecting the right tool for your recording or performance needs.",
      date: "March 17, 2025",
      author: "Michael Wong",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
      tags: ["Microphones", "Audio Equipment", "Recording"]
    },
    {
      id: "microphone-selection-guide",
      title: "How to Choose the Right Microphone for Your Needs",
      excerpt: "Selecting the appropriate microphone is crucial whether you're a content creator, gamer, podcaster, or musician. This guide helps you consider important factors for choosing the perfect microphone.",
      date: "March 17, 2025",
      author: "Alex Thompson",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
      tags: ["Audio Equipment", "Microphones", "Buying Guide"]
    }
  ] : [
    {
      id: "dynamic-vs-condenser",
      title: "ไมโครโฟนไดนามิกกับคอนเดนเซอร์: การเลือกที่เหมาะสมกับการใช้งานของคุณ",
      excerpt: "การเข้าใจความแตกต่างระหว่างไมโครโฟนไดนามิกและคอนเดนเซอร์มีความสำคัญอย่างยิ่งในการเลือกเครื่องมือที่เหมาะสมสำหรับการบันทึกหรือการแสดงของคุณ",
      date: "17 มีนาคม 2568",
      author: "ไมเคิล หว่อง",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
      tags: ["ไมโครโฟน", "อุปกรณ์เสียง", "การบันทึกเสียง"]
    },
    {
      id: "microphone-selection-guide",
      title: "วิธีเลือกไมโครโฟนที่เหมาะสมกับความต้องการของคุณ",
      excerpt: "การเลือกไมโครโฟนที่เหมาะสมเป็นสิ่งสำคัญ ไม่ว่าคุณจะเป็นนักสร้างคอนเทนต์ เกมเมอร์ พอดแคสเตอร์ หรือแม้แต่นักดนตรี บทความนี้จะช่วยคุณพิจารณาปัจจัยสำคัญในการเลือกไมโครโฟน",
      date: "17 มีนาคม 2568",
      author: "อเล็กซ์ ทอมป์สัน",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
      tags: ["อุปกรณ์เสียง", "ไมโครโฟน", "คู่มือการซื้อ"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Our Blog" : "บทความของเรา"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === "en" 
              ? "Latest news, insights, and guides about audio equipment and the sound industry." 
              : "ข่าวสาร, ข้อมูลเชิงลึก, และคู่มือล่าสุดเกี่ยวกับอุปกรณ์เสียงและอุตสาหกรรมเสียง"}
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </main>
      <Footerdemo />
    </div>
  );
};

export default Blog;
