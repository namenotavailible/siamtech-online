
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

  // Sample blog posts with added id field
  const blogPosts = language === "en" ? [
    {
      id: "dynamic-vs-condenser",
      title: "Dynamic vs Condenser Microphones: Which One Is Right for You?",
      excerpt: "Understanding the differences between dynamic and condenser microphones is crucial for selecting the right tool for your recording or performance needs.",
      date: "August 15, 2023",
      author: "Michael Wong",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
      tags: ["Microphones", "Audio Equipment", "Recording"]
    },
    {
      id: "microphone-selection-guide",
      title: "How to Choose the Right Microphone for Your Needs",
      excerpt: "Selecting the appropriate microphone is crucial whether you're a content creator, gamer, podcaster, or musician. This guide helps you consider important factors for choosing the perfect microphone.",
      date: "June 10, 2023",
      author: "Alex Thompson",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
      tags: ["Audio Equipment", "Microphones", "Buying Guide"]
    },
    {
      id: "audio-equipment-guide",
      title: "How to Choose the Right Audio Equipment for Your Studio",
      excerpt: "A comprehensive guide to selecting the perfect audio gear for your professional recording studio setup.",
      date: "May 15, 2023",
      author: "David Chen",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["Audio Equipment", "Studio Setup", "Guide"]
    },
    {
      id: "sound-engineering-future",
      title: "The Future of Sound Engineering: Trends to Watch",
      excerpt: "Exploring the emerging technologies and methodologies that are reshaping the audio industry.",
      date: "April 22, 2023",
      author: "Sarah Johnson",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["Technology", "Trends", "Sound Engineering"]
    },
    {
      id: "audio-maintenance",
      title: "Maintaining Your Audio Equipment: Best Practices",
      excerpt: "Learn essential maintenance tips to extend the life of your professional audio gear and ensure optimal performance.",
      date: "March 10, 2023",
      author: "Michael Wong",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      tags: ["Maintenance", "Equipment Care", "Audio Gear"]
    }
  ] : [
    {
      id: "dynamic-vs-condenser",
      title: "ไมโครโฟนไดนามิกกับคอนเดนเซอร์: การเลือกที่เหมาะกับการใช้งานของคุณ",
      excerpt: "การเข้าใจความแตกต่างระหว่างไมโครโฟนไดนามิกและคอนเดนเซอร์มีความสำคัญอย่างยิ่งในการเลือกเครื่องมือที่เหมาะสมสำหรับการบันทึกหรือการแสดงของคุณ",
      date: "15 สิงหาคม 2566",
      author: "ไมเคิล หว่อง",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
      tags: ["ไมโครโฟน", "อุปกรณ์เสียง", "การบันทึกเสียง"]
    },
    {
      id: "microphone-selection-guide",
      title: "วิธีเลือกไมโครโฟนที่เหมาะสมกับความต้องการของคุณ",
      excerpt: "การเลือกไมโครโฟนที่เหมาะสมเป็นสิ่งสำคัญ ไม่ว่าคุณจะเป็นนักสร้างคอนเทนต์ เกมเมอร์ พอดแคสเตอร์ หรือแม้แต่นักดนตรี บทความนี้จะช่วยคุณพิจารณาปัจจัยสำคัญในการเลือกไมโครโฟน",
      date: "10 มิถุนายน 2566",
      author: "อเล็กซ์ ทอมป์สัน",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
      tags: ["อุปกรณ์เสียง", "ไมโครโฟน", "คู่มือการซื้อ"]
    },
    {
      id: "audio-equipment-guide",
      title: "วิธีเลือกอุปกรณ์เสียงที่เหมาะสำหรับสตูดิโอของคุณ",
      excerpt: "คู่มือที่ครอบคลุมในการเลือกอุปกรณ์เสียงที่สมบูรณ์แบบสำหรับการตั้งค่าสตูดิโอบันทึกเสียงมืออาชีพของคุณ",
      date: "15 พฤษภาคม 2566",
      author: "ดาวิด เชน",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["อุปกรณ์เสียง", "การตั้งค่าสตูดิโอ", "คู่มือ"]
    },
    {
      id: "sound-engineering-future",
      title: "อนาคตของวิศวกรรมเสียง: แนวโน้มที่ควรจับตามอง",
      excerpt: "สำรวจเทคโนโลยีและระเบียบวิธีใหม่ๆ ที่กำลังเปลี่ยนโฉมอุตสาหกรรมเสียง",
      date: "22 เมษายน 2566",
      author: "ซาร่า จอห์นสัน",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["เทคโนโลยี", "แนวโน้ม", "วิศวกรรมเสียง"]
    },
    {
      id: "audio-maintenance",
      title: "การดูแลรักษาอุปกรณ์เสียงของคุณ: แนวทางปฏิบัติที่ดีที่สุด",
      excerpt: "เรียนรู้เคล็ดลับการบำรุงรักษาที่สำคัญเพื่อยืดอายุการใช้งานของอุปกรณ์เสียงมืออาชีพของคุณและรับรองประสิทธิภาพสูงสุด",
      date: "10 มีนาคม 2566",
      author: "ไมเคิล หว่อง",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      tags: ["การบำรุงรักษา", "การดูแลอุปกรณ์", "อุปกรณ์เสียง"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Page Header */}
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

        {/* Blog Posts Grid */}
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
