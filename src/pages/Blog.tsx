
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { Calendar, User, AlertTriangle } from "lucide-react";

const BlogCard = ({ 
  title, 
  excerpt, 
  date, 
  author, 
  image, 
  id,
  tags = [],
  isHighlighted = false
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  author: string; 
  image: string;
  id: string;
  tags?: string[];
  isHighlighted?: boolean;
}) => {
  return (
    <Link 
      to={`/blog/${id}`} 
      className="block group"
      aria-label={`Read more about ${title}`}
    >
      <article className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full ${isHighlighted ? 'border-2 border-red-500' : ''}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          {isHighlighted && (
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs font-medium text-red-500">ข่าวสำคัญ</span>
            </div>
          )}
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

const EarthquakeFeature = () => {
  return (
    <Link 
      to="/blog/earthquake-2025" 
      className="block group col-span-full"
    >
      <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
        <div className="md:flex">
          <div className="md:w-2/5 h-64 md:h-auto">
            <img 
              src="/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png" 
              alt="แผ่นดินไหวขนาด 7.7 ในเมียนมา ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-3/5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">ข่าวสำคัญล่าสุด</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">แผ่นดินไหวในประเทศไทย</span>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">วิธีปฏิบัติตัวเมื่อเกิดแผ่นดินไหว</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              แผ่นดินไหวขนาด 7.7 ในเมียนมา: ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ สร้างความตื่นตระหนกทั่วประเทศ
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              เมื่อวันที่ 28 มีนาคม พ.ศ. 2568 เวลา 13:20 น. เกิดเหตุแผ่นดินไหวขนาด 7.7 แมกนิจูด ในประเทศเมียนมา ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ และหลายจังหวัดในไทย
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <time dateTime="28 มีนาคม 2568">28 มีนาคม 2568</time>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>ทีมข่าว SiamTech</span>
              </div>
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
    },
    // Add earthquake blog post in Thai version
    {
      id: "earthquake-2025",
      title: "แผ่นดินไหวขนาด 7.7 ในเมียนมา: ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ สร้างความตื่นตระหนกทั่วประเทศ",
      excerpt: "เมื่อวันที่ 28 มีนาคม พ.ศ. 2568 เวลา 13:20 น. เกิดเหตุแผ่นดินไหวขนาด 7.7 แมกนิจูด ในประเทศเมียนมา ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ และหลายจังหวัดในไทย",
      date: "28 มีนาคม 2568",
      author: "ทีมข่าว SiamTech",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["แผ่นดินไหวในประเทศไทย", "วิธีปฏิบัติตัวเมื่อเกิดแผ่นดินไหว"],
      isHighlighted: true
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

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <EarthquakeFeature />
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12">
          {language === "en" ? "All Articles" : "บทความทั้งหมด"}
        </h2>
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
