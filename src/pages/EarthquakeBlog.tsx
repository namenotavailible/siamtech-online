
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { Calendar, User, ArrowLeft, AlertTriangle, Info, BarChart, HelpCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const EarthquakeBlog = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const publishDate = "28 มีนาคม 2568";
  const author = "ทีมข่าว SiamTech";
  
  // SEO keywords and related tags
  const tags = ["แผ่นดินไหวในประเทศไทย", "วิธีปฏิบัติตัวเมื่อเกิดแผ่นดินไหว", "แผ่นดินไหวเมียนมา", "ความปลอดภัยจากแผ่นดินไหว"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex-grow">
        {/* Back link */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/blog')} 
            className="inline-flex items-center text-primary hover:underline"
            aria-label={language === "en" ? "Back to all posts" : "กลับไปยังบทความทั้งหมด"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en" ? "Back to all posts" : "กลับไปยังบทความทั้งหมด"}
          </button>
        </div>
        
        {/* Post header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span className="text-red-500 font-medium">ข่าวสำคัญ</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-left">
            แผ่นดินไหวขนาด 7.7 ในเมียนมา: ส่งแรงสั่นสะเทือนถึงกรุงเทพฯ สร้างความตื่นตระหนกทั่วประเทศ
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center" aria-label="วันที่เผยแพร่">
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <time dateTime={publishDate}>{publishDate}</time>
            </div>
            <div className="flex items-center" aria-label="ผู้เขียน">
              <User className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{author}</span>
            </div>
          </div>
        </header>
        
        {/* Featured alert box */}
        <div className="mb-8 p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-amber-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700 dark:text-amber-200">
                ติดตามข้อมูลและคำแนะนำจากหน่วยงานที่เกี่ยวข้องอย่างใกล้ชิด เพื่อความปลอดภัยของท่านและครอบครัว
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src="/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png"
            alt="แผ่นดินไหวเมียนมา 7.7 แมกนิจูด ส่งแรงสั่นสะเทือนถึงไทย"
            className="w-full h-auto object-cover"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center">
            ภาพประกอบ: แผนที่แสดงจุดศูนย์กลางแผ่นดินไหวและพื้นที่ที่ได้รับผลกระทบ
          </p>
        </div>
        
        {/* Post content with improved readability */}
        <article className="prose dark:prose-invert max-w-none text-left [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6">
          {/* Main content */}
          <p>
            เมื่อวันที่ 28 มีนาคม พ.ศ. 2568 เวลา 13:20 น. ได้เกิดเหตุแผ่นดินไหวขนาด 7.7 แมกนิจูด ลึก 10 กิโลเมตร ในประเทศเมียนมา
            แรงสั่นสะเทือนจากแผ่นดินไหวดังกล่าวสามารถรับรู้ได้ในหลายพื้นที่ของประเทศไทย โดยเฉพาะในกรุงเทพมหานครและปริมณฑล
            ผู้ที่อยู่บนอาคารสูงในกรุงเทพฯ รายงานว่ารู้สึกถึงการสั่นไหวอย่างชัดเจน ทำให้เกิดความตื่นตระหนกและมีการอพยพลงจากอาคารเพื่อความปลอดภัย
          </p>
          
          <p>
            อย่างไรก็ตาม ขณะนี้ยังไม่มีรายงานความเสียหายหรือผู้บาดเจ็บในประเทศไทย เหตุการณ์นี้เป็นการเตือนให้เราตระหนักถึงความสำคัญของการเตรียมความพร้อมรับมือกับแผ่นดินไหว 
            แม้ว่าไทยจะไม่ใช่ประเทศที่มีแผ่นดินไหวบ่อยครั้ง แต่การมีแผนปฏิบัติและความรู้ในการป้องกันตนเองเมื่อเกิดเหตุการณ์ดังกล่าวจะช่วยลดความเสี่ยงและความเสียหายที่อาจเกิดขึ้นได้
          </p>
          
          <h2>ผลกระทบของแผ่นดินไหวในประเทศไทย</h2>
          
          <p>
            แผ่นดินไหวครั้งนี้ส่งผลให้เกิดการสั่นสะเทือนที่รับรู้ได้ในหลายจังหวัดของไทย โดยเฉพาะในพื้นที่ภาคเหนือและกรุงเทพมหานคร 
            อาคารสูงหลายแห่งในกรุงเทพฯ มีการอพยพผู้คนออกจากตัวอาคารตามมาตรการความปลอดภัย หลังจากผู้อยู่อาศัยและผู้ทำงานในอาคารรู้สึกถึงการสั่นไหว
          </p>
          
          <p>
            กรมอุตุนิยมวิทยาได้ออกประกาศเตือนให้ประชาชนในพื้นที่ที่อาจได้รับผลกระทบเฝ้าระวังและติดตามสถานการณ์อย่างใกล้ชิด 
            พร้อมทั้งแนะนำให้ประชาชนปฏิบัติตามคำแนะนำของหน่วยงานที่เกี่ยวข้องอย่างเคร่งครัด
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-8">
            <h3 className="flex items-center text-blue-800 dark:text-blue-300 font-semibold text-lg mb-2">
              <BarChart className="inline-block mr-2 h-5 w-5" />
              ข้อมูลแผ่นดินไหว
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-200">
              <li><strong>ขนาด:</strong> 7.7 แมกนิจูด</li>
              <li><strong>ความลึก:</strong> 10 กิโลเมตร</li>
              <li><strong>ศูนย์กลาง:</strong> ประเทศเมียนมา</li>
              <li><strong>เวลา:</strong> 13:20 น. วันที่ 28 มีนาคม 2568</li>
              <li><strong>พื้นที่รับรู้แรงสั่นสะเทือน:</strong> หลายจังหวัดในประเทศไทย โดยเฉพาะกรุงเทพฯ และปริมณฑล</li>
            </ul>
          </div>
          
          <h2>วิธีปฏิบัติตัวเมื่อเกิดแผ่นดินไหว</h2>
          
          <p>
            หากท่านอยู่ในพื้นที่ที่มีความเสี่ยงต่อการเกิดแผ่นดินไหวหรือสามารถรับรู้แรงสั่นสะเทือนได้ ควรปฏิบัติตามคำแนะนำต่อไปนี้:
          </p>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-6">
            <h3 className="flex items-center text-green-800 dark:text-green-300 font-semibold text-lg mb-2">
              <HelpCircle className="inline-block mr-2 h-5 w-5" />
              ขณะอยู่ในอาคาร
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li>หมอบลงใต้โต๊ะหรือเฟอร์นิเจอร์ที่แข็งแรง แล้วเกาะยึดไว้จนกว่าการสั่นไหวจะหยุด</li>
              <li>อยู่ห่างจากกระจก หน้าต่าง และสิ่งของที่อาจตกลงมาทำอันตราย</li>
              <li>หากไม่สามารถหาที่กำบังได้ ให้นั่งหรือนอนลงบริเวณที่ไม่มีสิ่งของที่อาจตกลงมาโดนศีรษะ</li>
              <li>ไม่ควรใช้ลิฟต์ ให้ใช้บันไดในการอพยพ</li>
              <li>หากอยู่บนเตียง ให้อยู่นิ่งๆ และใช้หมอนปกป้องศีรษะ</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg my-6">
            <h3 className="flex items-center text-amber-800 dark:text-amber-300 font-semibold text-lg mb-2">
              <HelpCircle className="inline-block mr-2 h-5 w-5" />
              ขณะอยู่นอกอาคาร
            </h3>
            <ul className="space-y-2 text-amber-700 dark:text-amber-200">
              <li>อยู่ห่างจากอาคาร เสาไฟฟ้า และโครงสร้างที่อาจพังทลาย</li>
              <li>หาพื้นที่โล่งและปลอดภัย แล้วนั่งหรือนอนลงจนกว่าการสั่นไหวจะหยุด</li>
              <li>ระวังวัตถุที่อาจตกลงมาจากอาคารข้างเคียง</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg my-6">
            <h3 className="flex items-center text-purple-800 dark:text-purple-300 font-semibold text-lg mb-2">
              <HelpCircle className="inline-block mr-2 h-5 w-5" />
              ขณะขับรถ
            </h3>
            <ul className="space-y-2 text-purple-700 dark:text-purple-200">
              <li>ค่อยๆ ชะลอความเร็วและจอดรถที่ปลอดภัย ห่างจากอาคาร สะพาน และเสาไฟฟ้า</li>
              <li>อยู่ในรถจนกว่าการสั่นไหวจะหยุด</li>
              <li>หลีกเลี่ยงการขับรถข้ามสะพานหรือทางด่วนที่อาจได้รับความเสียหาย</li>
            </ul>
          </div>
          
          <h2>การเตรียมความพร้อมรับมือแผ่นดินไหว</h2>
          
          <p>
            แม้ว่าประเทศไทยจะไม่ได้อยู่ในเขตที่มีแผ่นดินไหวรุนแรงบ่อยครั้ง แต่เหตุการณ์ครั้งนี้เป็นการเตือนให้เราควรเตรียมพร้อมรับมือกับภัยพิบัติที่อาจเกิดขึ้นได้ทุกเมื่อ 
            ต่อไปนี้เป็นคำแนะนำในการเตรียมความพร้อม:
          </p>
          
          <ul>
            <li>จัดเตรียมชุดอุปกรณ์ฉุกเฉิน ประกอบด้วยน้ำดื่ม อาหารสำรอง ไฟฉาย วิทยุพกพา แบตเตอรี่สำรอง ยาที่จำเป็น และของใช้ส่วนตัว</li>
            <li>วางแผนการอพยพและจุดนัดพบของสมาชิกในครอบครัว</li>
            <li>ตรวจสอบโครงสร้างบ้านและซ่อมแซมจุดที่อาจเป็นอันตรายเมื่อเกิดแผ่นดินไหว</li>
            <li>ยึดตู้ ชั้นวางของ และเฟอร์นิเจอร์ขนาดใหญ่ให้มั่นคงกับผนังหรือพื้น</li>
            <li>จดจำตำแหน่งวาล์วปิดแก๊สและสวิตช์ไฟฟ้าหลักของบ้าน</li>
            <li>ศึกษาข้อมูลเกี่ยวกับแผ่นดินไหวและการปฏิบัติตัวอย่างถูกต้อง</li>
          </ul>
          
          <h2>ติดตามสถานการณ์</h2>
          
          <p>
            กรมอุตุนิยมวิทยาและหน่วยงานที่เกี่ยวข้องกำลังติดตามสถานการณ์อย่างใกล้ชิด หากมีการเปลี่ยนแปลงหรือประกาศเตือนเพิ่มเติม จะมีการแจ้งให้ประชาชนทราบผ่านช่องทางต่างๆ 
            ขอให้ประชาชนติดตามข้อมูลจากแหล่งที่เชื่อถือได้ และปฏิบัติตามคำแนะนำของเจ้าหน้าที่อย่างเคร่งครัด
          </p>
          
          <p>
            เหตุการณ์แผ่นดินไหวครั้งนี้เป็นการเตือนว่าภัยธรรมชาติสามารถเกิดขึ้นได้โดยไม่คาดคิด การเตรียมความพร้อมและมีความรู้ที่ถูกต้องจะช่วยให้เราสามารถรับมือกับสถานการณ์ฉุกเฉินได้อย่างปลอดภัย
          </p>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ขอให้ประชาชนติดตามข้อมูลและคำแนะนำจากหน่วยงานที่เกี่ยวข้องอย่างใกล้ชิด เพื่อความปลอดภัยของตนเองและครอบครัว
            </p>
          </div>
        </article>
        
        {/* Related posts section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">บทความที่เกี่ยวข้อง</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/blog/audio-equipment-guide" className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">วิธีเลือกอุปกรณ์เสียงที่เหมาะสมสำหรับสตูดิโอของคุณ</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">การตั้งค่าสตูดิโอบันทึกเสียงมืออาชีพต้องพิจารณาอุปกรณ์เสียงต่างๆ อย่างรอบคอบ</p>
                </div>
              </div>
            </Link>
            <Link to="/blog/sound-engineering-future" className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">อนาคตของวิศวกรรมเสียง: แนวโน้มที่ควรจับตามอง</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">อุตสาหกรรมเสียงมีการพัฒนาอย่างต่อเนื่องด้วยเทคโนโลยีและวิธีการใหม่ๆ</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footerdemo />
    </div>
  );
};

export default EarthquakeBlog;
