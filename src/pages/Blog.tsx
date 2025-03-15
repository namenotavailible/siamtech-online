
import React from "react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { BookOpen, Calendar, User } from "lucide-react";

const BlogCard = ({ 
  title, 
  excerpt, 
  date, 
  author, 
  image, 
  tags = [] 
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  author: string; 
  image: string; 
  tags?: string[];
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const { language } = useLanguage();

  // Sample blog posts
  const blogPosts = language === "en" ? [
    {
      title: "How to Choose the Right Audio Equipment for Your Studio",
      excerpt: "A comprehensive guide to selecting the perfect audio gear for your professional recording studio setup.",
      date: "May 15, 2023",
      author: "David Chen",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["Audio Equipment", "Studio Setup", "Guide"]
    },
    {
      title: "The Future of Sound Engineering: Trends to Watch",
      excerpt: "Exploring the emerging technologies and methodologies that are reshaping the audio industry.",
      date: "April 22, 2023",
      author: "Sarah Johnson",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["Technology", "Trends", "Sound Engineering"]
    },
    {
      title: "Maintaining Your Audio Equipment: Best Practices",
      excerpt: "Learn essential maintenance tips to extend the life of your professional audio gear and ensure optimal performance.",
      date: "March 10, 2023",
      author: "Michael Wong",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      tags: ["Maintenance", "Equipment Care", "Audio Gear"]
    }
  ] : [
    {
      title: "วิธีเลือกอุปกรณ์เสียงที่เหมาะสำหรับสตูดิโอของคุณ",
      excerpt: "คู่มือที่ครอบคลุมในการเลือกอุปกรณ์เสียงที่สมบูรณ์แบบสำหรับการตั้งค่าสตูดิโอบันทึกเสียงมืออาชีพของคุณ",
      date: "15 พฤษภาคม 2566",
      author: "ดาวิด เชน",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["อุปกรณ์เสียง", "การตั้งค่าสตูดิโอ", "คู่มือ"]
    },
    {
      title: "อนาคตของวิศวกรรมเสียง: แนวโน้มที่ควรจับตามอง",
      excerpt: "สำรวจเทคโนโลยีและระเบียบวิธีใหม่ๆ ที่กำลังเปลี่ยนโฉมอุตสาหกรรมเสียง",
      date: "22 เมษายน 2566",
      author: "ซาร่า จอห์นสัน",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["เทคโนโลยี", "แนวโน้ม", "วิศวกรรมเสียง"]
    },
    {
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
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Our Blog" : "บทความของเรา"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === "en" 
              ? "Latest news, insights, and guides about audio equipment and the sound industry." 
              : "ข่าวสาร, ข้อมูลเชิงลึก, และคู่มือล่าสุดเกี่ยวกับอุปกรณ์เสียงและอุตสาหกรรมเสียง"}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
      <Footerdemo />
    </div>
  );
};

export default Blog;
