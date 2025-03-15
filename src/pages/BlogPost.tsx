
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { Calendar, User, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Sample blog posts data with full content - in a real app this would come from an API
  const blogPosts = language === "en" ? {
    "audio-equipment-guide": {
      title: "How to Choose the Right Audio Equipment for Your Studio",
      content: `
        <p>Setting up a professional recording studio requires careful consideration of various audio equipment. The quality of your recordings heavily depends on the tools you use, so it's essential to make informed decisions when investing in audio gear.</p>
        
        <h2>Microphones: The Starting Point</h2>
        <p>Microphones are perhaps the most crucial piece of equipment in any recording setup. Different types of microphones serve different purposes:</p>
        <ul>
          <li><strong>Dynamic microphones</strong> are versatile and durable, perfect for loud sound sources and live performances.</li>
          <li><strong>Condenser microphones</strong> offer greater sensitivity and frequency response, ideal for capturing vocals and acoustic instruments.</li>
          <li><strong>Ribbon microphones</strong> provide warm, vintage tones, suitable for certain instruments and vocal styles.</li>
        </ul>
        
        <h2>Audio Interfaces: The Bridge</h2>
        <p>An audio interface serves as the bridge between your microphones and your computer. When selecting an interface, consider the following factors:</p>
        <ul>
          <li>Number of inputs/outputs needed</li>
          <li>Preamp quality</li>
          <li>Conversion quality (bit depth and sample rate)</li>
          <li>Connectivity options (USB, Thunderbolt, etc.)</li>
        </ul>
        
        <h2>Monitors: Your Critical Listening Tool</h2>
        <p>Studio monitors allow you to hear your recordings and mixes with accuracy. Unlike consumer speakers that may color the sound, studio monitors aim to reproduce audio as neutrally as possible. Important considerations include:</p>
        <ul>
          <li>Near-field vs. mid-field</li>
          <li>Active vs. passive</li>
          <li>Frequency response</li>
          <li>Room acoustics and placement</li>
        </ul>
        
        <h2>Headphones: For Detailed Work</h2>
        <p>Quality headphones are essential for detailed listening and recording sessions. Consider:</p>
        <ul>
          <li><strong>Closed-back headphones</strong> for recording (to prevent bleed)</li>
          <li><strong>Open-back headphones</strong> for mixing (for a wider soundstage)</li>
        </ul>
        
        <h2>Acoustic Treatment: Often Overlooked</h2>
        <p>While not equipment per se, acoustic treatment dramatically affects the quality of your recordings and your ability to mix accurately. Basic acoustic treatment includes:</p>
        <ul>
          <li>Bass traps for corners</li>
          <li>Absorption panels for early reflections</li>
          <li>Diffusers for maintaining some liveness</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Choosing the right audio equipment involves understanding your specific needs, budget constraints, and the acoustic environment you're working in. Start with the essentials, focus on quality over quantity, and gradually build your studio as your needs evolve.</p>
      `,
      date: "May 15, 2023",
      author: "David Chen",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["Audio Equipment", "Studio Setup", "Guide"]
    },
    "sound-engineering-future": {
      title: "The Future of Sound Engineering: Trends to Watch",
      content: `
        <p>The audio industry is continuously evolving with new technologies and methodologies reshaping how we record, mix, and distribute sound. Here are some emerging trends that sound engineers should watch.</p>
        
        <h2>Immersive Audio Formats</h2>
        <p>Spatial audio and immersive formats like Dolby Atmos and Sony 360 Reality Audio are becoming increasingly popular. These technologies create three-dimensional soundscapes that envelop listeners, providing a more engaging experience than traditional stereo.</p>
        
        <h2>AI-Powered Tools</h2>
        <p>Artificial intelligence is making significant inroads into audio production. AI-powered tools can now:</p>
        <ul>
          <li>Automatically mix and master tracks</li>
          <li>Separate stems from mixed recordings</li>
          <li>Generate realistic instrument sounds</li>
          <li>Enhance vocal performances</li>
          <li>Reduce noise and restore audio</li>
        </ul>
        
        <h2>Virtual Collaboration</h2>
        <p>Remote collaboration tools have become essential in modern sound engineering. Platforms that allow real-time collaboration between artists and engineers in different locations will continue to evolve, offering lower latency and better integration with DAWs.</p>
        
        <h2>Blockchain for Rights Management</h2>
        <p>Blockchain technology is beginning to transform how rights and royalties are managed in the audio industry. Smart contracts can ensure that creators are properly compensated for their work, with transparent tracking of usage and automatic payments.</p>
        
        <h2>Virtual and Augmented Reality</h2>
        <p>VR and AR technologies are opening new frontiers for sound design and engineering. Creating convincing soundscapes for virtual environments requires specialized skills in spatial audio and interactive sound design.</p>
        
        <h2>Sustainable Practices</h2>
        <p>Sustainability is becoming a priority across all industries, including audio production. This includes:</p>
        <ul>
          <li>Energy-efficient equipment</li>
          <li>Cloud-based solutions that reduce hardware needs</li>
          <li>Ethical manufacturing and sourcing of components</li>
          <li>Digital distribution reducing physical media waste</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>The future of sound engineering lies at the intersection of technology, creativity, and accessibility. Engineers who stay adaptable and continue learning will be well-positioned to take advantage of these emerging trends and technologies.</p>
      `,
      date: "April 22, 2023",
      author: "Sarah Johnson",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["Technology", "Trends", "Sound Engineering"]
    },
    "audio-maintenance": {
      title: "Maintaining Your Audio Equipment: Best Practices",
      content: `
        <p>Professional audio equipment represents a significant investment. Proper maintenance not only extends the life of your gear but also ensures optimal performance. Here are some essential best practices for maintaining your audio equipment.</p>
        
        <h2>Regular Cleaning</h2>
        <p>Dust and debris can affect the performance of your equipment and potentially cause damage over time. Establish a regular cleaning routine:</p>
        <ul>
          <li>Use compressed air to remove dust from knobs, faders, and connectors</li>
          <li>Clean faders and potentiometers with specialized contact cleaner</li>
          <li>Wipe down surfaces with appropriate cleaners (avoid alcohol on certain surfaces)</li>
          <li>Clean microphone grilles to prevent buildup that can affect sound quality</li>
        </ul>
        
        <h2>Cable Management</h2>
        <p>Proper cable management prevents damage and makes troubleshooting easier:</p>
        <ul>
          <li>Coil cables properly using the over-under technique</li>
          <li>Store cables neatly, avoiding kinks and sharp bends</li>
          <li>Label cables for quick identification</li>
          <li>Inspect cables regularly for wear and damage</li>
          <li>Replace damaged cables promptly rather than using temporary fixes</li>
        </ul>
        
        <h2>Power Management</h2>
        <p>Power issues can damage equipment and affect audio quality:</p>
        <ul>
          <li>Use quality surge protectors or power conditioners</li>
          <li>Follow proper power-up and power-down sequences</li>
          <li>Avoid overloading circuits</li>
          <li>Consider uninterruptible power supplies (UPS) for critical equipment</li>
        </ul>
        
        <h2>Environmental Control</h2>
        <p>The environment in which you store and use your equipment matters:</p>
        <ul>
          <li>Maintain stable temperature and humidity levels</li>
          <li>Avoid direct sunlight on equipment</li>
          <li>Keep food and drinks away from audio gear</li>
          <li>Use dehumidifiers in damp environments to prevent corrosion</li>
        </ul>
        
        <h2>Regular Testing and Calibration</h2>
        <p>Periodic testing ensures your equipment is performing correctly:</p>
        <ul>
          <li>Test all channels and functions regularly</li>
          <li>Calibrate monitors and other equipment as needed</li>
          <li>Keep track of maintenance schedules and history</li>
        </ul>
        
        <h2>Proper Storage</h2>
        <p>When not in use, store equipment properly:</p>
        <ul>
          <li>Use protective cases for portable equipment</li>
          <li>Cover stationary equipment to prevent dust accumulation</li>
          <li>Store microphones upright to prevent moisture buildup in the capsule</li>
          <li>Remove batteries from devices during long-term storage</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Investing time in proper maintenance saves money in the long run and ensures your equipment performs at its best. Develop a routine maintenance schedule and stick to it to protect your audio investment.</p>
      `,
      date: "March 10, 2023",
      author: "Michael Wong",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      tags: ["Maintenance", "Equipment Care", "Audio Gear"]
    }
  } : {
    "audio-equipment-guide": {
      title: "วิธีเลือกอุปกรณ์เสียงที่เหมาะสำหรับสตูดิโอของคุณ",
      content: `
        <p>การตั้งค่าสตูดิโอบันทึกเสียงมืออาชีพต้องพิจารณาอุปกรณ์เสียงต่างๆ อย่างรอบคอบ คุณภาพของการบันทึกของคุณขึ้นอยู่กับเครื่องมือที่คุณใช้อย่างมาก ดังนั้นจึงจำเป็นต้องตัดสินใจอย่างมีข้อมูลเมื่อลงทุนในอุปกรณ์เสียง</p>
        
        <h2>ไมโครโฟน: จุดเริ่มต้น</h2>
        <p>ไมโครโฟนอาจเป็นอุปกรณ์ที่สำคัญที่สุดในการตั้งค่าการบันทึกใดๆ ไมโครโฟนประเภทต่างๆ มีไว้เพื่อวัตถุประสงค์ที่แตกต่างกัน:</p>
        <ul>
          <li><strong>ไมโครโฟนแบบไดนามิก</strong> มีความหลากหลายและทนทาน เหมาะสำหรับแหล่งเสียงที่ดังและการแสดงสด</li>
          <li><strong>ไมโครโฟนคอนเดนเซอร์</strong> มีความไวและการตอบสนองความถี่ที่มากกว่า เหมาะสำหรับการบันทึกเสียงร้องและเครื่องดนตรีอะคูสติก</li>
          <li><strong>ไมโครโฟนริบบอน</strong> ให้โทนเสียงอบอุ่น แบบวินเทจ เหมาะสำหรับเครื่องดนตรีและสไตล์เสียงร้องบางประเภท</li>
        </ul>
        
        <h2>อินเตอร์เฟซเสียง: สะพานเชื่อม</h2>
        <p>อินเตอร์เฟซเสียงทำหน้าที่เป็นสะพานเชื่อมระหว่างไมโครโฟนและคอมพิวเตอร์ของคุณ เมื่อเลือกอินเตอร์เฟซ ให้พิจารณาปัจจัยต่อไปนี้:</p>
        <ul>
          <li>จำนวนอินพุต/เอาต์พุตที่ต้องการ</li>
          <li>คุณภาพของพรีแอมป์</li>
          <li>คุณภาพการแปลงสัญญาณ (ความลึกบิตและอัตราการสุ่มตัวอย่าง)</li>
          <li>ตัวเลือกการเชื่อมต่อ (USB, Thunderbolt เป็นต้น)</li>
        </ul>
        
        <h2>มอนิเตอร์: เครื่องมือฟังที่สำคัญของคุณ</h2>
        <p>มอนิเตอร์สตูดิโอช่วยให้คุณได้ยินการบันทึกและการมิกซ์ของคุณอย่างแม่นยำ ไม่เหมือนกับลำโพงทั่วไปที่อาจปรับแต่งเสียง มอนิเตอร์สตูดิโอมีเป้าหมายเพื่อสร้างเสียงที่เป็นกลางมากที่สุด ข้อพิจารณาที่สำคัญได้แก่:</p>
        <ul>
          <li>Near-field กับ mid-field</li>
          <li>แบบแอ็คทีฟกับแบบพาสซีฟ</li>
          <li>การตอบสนองความถี่</li>
          <li>อะคูสติกของห้องและการจัดวาง</li>
        </ul>
        
        <h2>หูฟัง: สำหรับงานที่ต้องการความละเอียด</h2>
        <p>หูฟังคุณภาพดีเป็นสิ่งจำเป็นสำหรับการฟังอย่างละเอียดและเซสชันการบันทึก พิจารณา:</p>
        <ul>
          <li><strong>หูฟังแบบปิด</strong> สำหรับการบันทึก (เพื่อป้องกันเสียงรั่วไหล)</li>
          <li><strong>หูฟังแบบเปิด</strong> สำหรับการมิกซ์ (เพื่อให้มี soundstage ที่กว้างขึ้น)</li>
        </ul>
        
        <h2>การปรับแต่งอะคูสติก: มักถูกมองข้าม</h2>
        <p>แม้จะไม่ใช่อุปกรณ์โดยตรง แต่การปรับแต่งอะคูสติกส่งผลอย่างมากต่อคุณภาพของการบันทึกและความสามารถในการมิกซ์อย่างแม่นยำ การปรับแต่งอะคูสติกพื้นฐานประกอบด้วย:</p>
        <ul>
          <li>กับดักเสียงทุ้มสำหรับมุมห้อง</li>
          <li>แผงดูดซับสำหรับการสะท้อนแรก</li>
          <li>ตัวกระจายเสียงเพื่อรักษาความมีชีวิตชีวาบางส่วน</li>
        </ul>
        
        <h2>บทสรุป</h2>
        <p>การเลือกอุปกรณ์เสียงที่เหมาะสมเกี่ยวข้องกับการเข้าใจความต้องการเฉพาะของคุณ ข้อจำกัดด้านงบประมาณ และสภาพแวดล้อมทางเสียงที่คุณกำลังทำงาน เริ่มต้นด้วยสิ่งที่จำเป็น มุ่งเน้นที่คุณภาพมากกว่าปริมาณ และค่อยๆ สร้างสตูดิโอของคุณตามความต้องการที่เปลี่ยนไป</p>
      `,
      date: "15 พฤษภาคม 2566",
      author: "ดาวิด เชน",
      image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      tags: ["อุปกรณ์เสียง", "การตั้งค่าสตูดิโอ", "คู่มือ"]
    },
    "sound-engineering-future": {
      title: "อนาคตของวิศวกรรมเสียง: แนวโน้มที่ควรจับตามอง",
      content: `
        <p>อุตสาหกรรมเสียงมีการพัฒนาอย่างต่อเนื่องด้วยเทคโนโลยีและวิธีการใหม่ๆ ที่กำลังเปลี่ยนรูปแบบการบันทึก การมิกซ์ และการกระจายเสียง นี่คือแนวโน้มที่กำลังเกิดขึ้นที่วิศวกรเสียงควรจับตามอง</p>
        
        <h2>รูปแบบเสียงแบบโอบล้อม</h2>
        <p>เสียงเชิงพื้นที่และรูปแบบแบบโอบล้อมเช่น Dolby Atmos และ Sony 360 Reality Audio กำลังได้รับความนิยมมากขึ้น เทคโนโลยีเหล่านี้สร้างภูมิทัศน์เสียงสามมิติที่ห่อหุ้มผู้ฟัง มอบประสบการณ์ที่น่าสนใจมากกว่าระบบสเตอริโอแบบดั้งเดิม</p>
        
        <h2>เครื่องมือที่ขับเคลื่อนด้วย AI</h2>
        <p>ปัญญาประดิษฐ์กำลังเข้ามามีบทบาทสำคัญในการผลิตเสียง เครื่องมือที่ขับเคลื่อนด้วย AI ตอนนี้สามารถ:</p>
        <ul>
          <li>มิกซ์และมาสเตอร์แทร็คโดยอัตโนมัติ</li>
          <li>แยกสเต็มจากการบันทึกที่มิกซ์แล้ว</li>
          <li>สร้างเสียงเครื่องดนตรีที่สมจริง</li>
          <li>เพิ่มประสิทธิภาพการร้อง</li>
          <li>ลดเสียงรบกวนและฟื้นฟูเสียง</li>
        </ul>
        
        <h2>การทำงานร่วมกันเสมือนจริง</h2>
        <p>เครื่องมือการทำงานร่วมกันระยะไกลได้กลายเป็นสิ่งจำเป็นในวิศวกรรมเสียงสมัยใหม่ แพลตฟอร์มที่อนุญาตให้มีการทำงานร่วมกันแบบเรียลไทม์ระหว่างศิลปินและวิศวกรในสถานที่ต่างๆ จะยังคงพัฒนาต่อไป โดยมีความหน่วงเวลาที่ต่ำลงและการผสานรวมกับ DAW ที่ดีขึ้น</p>
        
        <h2>บล็อกเชนสำหรับการจัดการสิทธิ์</h2>
        <p>เทคโนโลยีบล็อกเชนกำลังเริ่มเปลี่ยนแปลงวิธีการจัดการสิทธิ์และค่าลิขสิทธิ์ในอุตสาหกรรมเสียง สัญญาอัจฉริยะสามารถรับประกันได้ว่าผู้สร้างจะได้รับค่าตอบแทนอย่างเหมาะสมสำหรับผลงานของพวกเขา ด้วยการติดตามการใช้งานอย่างโปร่งใสและการชำระเงินอัตโนมัติ</p>
        
        <h2>เทคโนโลยีเสมือนจริงและเสริมความเป็นจริง</h2>
        <p>เทคโนโลยี VR และ AR กำลังเปิดพรมแดนใหม่สำหรับการออกแบบเสียงและวิศวกรรม การสร้างภูมิทัศน์เสียงที่น่าเชื่อถือสำหรับสภาพแวดล้อมเสมือนจริงต้องใช้ทักษะเฉพาะทางในด้านเสียงเชิงพื้นที่และการออกแบบเสียงแบบโต้ตอบ</p>
        
        <h2>แนวทางปฏิบัติที่ยั่งยืน</h2>
        <p>ความยั่งยืนกำลังกลายเป็นสิ่งสำคัญในทุกอุตสาหกรรมรวมถึงการผลิตเสียง ซึ่งรวมถึง:</p>
        <ul>
          <li>อุปกรณ์ที่ประหยัดพลังงาน</li>
          <li>โซลูชันบนคลาวด์ที่ลดความต้องการฮาร์ดแวร์</li>
          <li>การผลิตและการจัดหาส่วนประกอบอย่างมีจริยธรรม</li>
          <li>การกระจายแบบดิจิทัลลดขยะจากสื่อกายภาพ</li>
        </ul>
        
        <h2>บทสรุป</h2>
        <p>อนาคตของวิศวกรรมเสียงอยู่ที่จุดตัดของเทคโนโลยี ความคิดสร้างสรรค์ และการเข้าถึง วิศวกรที่ปรับตัวได้และเรียนรู้อย่างต่อเนื่องจะอยู่ในตำแหน่งที่ดีในการใช้ประโยชน์จากแนวโน้มและเทคโนโลยีที่กำลังเกิดขึ้นเหล่านี้</p>
      `,
      date: "22 เมษายน 2566",
      author: "ซาร่า จอห์นสัน",
      image: "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png",
      tags: ["เทคโนโลยี", "แนวโน้ม", "วิศวกรรมเสียง"]
    },
    "audio-maintenance": {
      title: "การดูแลรักษาอุปกรณ์เสียงของคุณ: แนวทางปฏิบัติที่ดีที่สุด",
      content: `
        <p>อุปกรณ์เสียงมืออาชีพถือเป็นการลงทุนที่สำคัญ การบำรุงรักษาที่เหมาะสมไม่เพียงแต่ช่วยยืดอายุการใช้งานของอุปกรณ์เท่านั้น แต่ยังช่วยให้มั่นใจในประสิทธิภาพสูงสุดอีกด้วย นี่คือแนวทางปฏิบัติที่ดีที่สุดบางประการสำหรับการบำรุงรักษาอุปกรณ์เสียงของคุณ</p>
        
        <h2>การทำความสะอาดเป็นประจำ</h2>
        <p>ฝุ่นและเศษขยะสามารถส่งผลกระทบต่อประสิทธิภาพของอุปกรณ์และอาจทำให้เกิดความเสียหายในระยะยาว กำหนดตารางการทำความสะอาดเป็นประจำ:</p>
        <ul>
          <li>ใช้ลมอัดเพื่อกำจัดฝุ่นออกจากปุ่มควบคุม เฟดเดอร์ และขั้วต่อ</li>
          <li>ทำความสะอาดเฟดเดอร์และโพเทนชิโอมิเตอร์ด้วยน้ำยาทำความสะอาดหน้าสัมผัสเฉพาะทาง</li>
          <li>เช็ดพื้นผิวด้วยน้ำยาทำความสะอาดที่เหมาะสม (หลีกเลี่ยงแอลกอฮอล์บนพื้นผิวบางชนิด)</li>
          <li>ทำความสะอาดตะแกรงไมโครโฟนเพื่อป้องกันการสะสมที่อาจส่งผลต่อคุณภาพเสียง</li>
        </ul>
        
        <h2>การจัดการสายสัญญาณ</h2>
        <p>การจัดการสายสัญญาณที่เหมาะสมช่วยป้องกันความเสียหายและทำให้การแก้ไขปัญหาง่ายขึ้น:</p>
        <ul>
          <li>ม้วนสายให้ถูกต้องโดยใช้เทคนิค over-under</li>
          <li>เก็บสายอย่างเป็นระเบียบ หลีกเลี่ยงการหักงอและการงอมุมแหลม</li>
          <li>ติดป้ายสายเพื่อการระบุที่รวดเร็ว</li>
          <li>ตรวจสอบสายเป็นประจำเพื่อหาการสึกหรอและความเสียหาย</li>
          <li>เปลี่ยนสายที่เสียหายทันทีแทนที่จะใช้การแก้ไขชั่วคราว</li>
        </ul>
        
        <h2>การจัดการพลังงาน</h2>
        <p>ปัญหาพลังงานสามารถสร้างความเสียหายให้กับอุปกรณ์และส่งผลต่อคุณภาพเสียง:</p>
        <ul>
          <li>ใช้เครื่องป้องกันไฟกระชากหรือเครื่องปรับแต่งไฟฟ้าที่มีคุณภาพ</li>
          <li>ปฏิบัติตามลำดับการเปิดและปิดเครื่องที่เหมาะสม</li>
          <li>หลีกเลี่ยงการใช้วงจรเกินกำลัง</li>
          <li>พิจารณาใช้เครื่องสำรองไฟฟ้า (UPS) สำหรับอุปกรณ์สำคัญ</li>
        </ul>
        
        <h2>การควบคุมสภาพแวดล้อม</h2>
        <p>สภาพแวดล้อมที่คุณเก็บและใช้อุปกรณ์มีความสำคัญ:</p>
        <ul>
          <li>รักษาระดับอุณหภูมิและความชื้นให้คงที่</li>
          <li>หลีกเลี่ยงแสงแดดโดยตรงที่อุปกรณ์</li>
          <li>เก็บอาหารและเครื่องดื่มให้ห่างจากอุปกรณ์เสียง</li>
          <li>ใช้เครื่องลดความชื้นในสภาพแวดล้อมที่ชื้นเพื่อป้องกันการกัดกร่อน</li>
        </ul>
        
        <h2>การทดสอบและการปรับเทียบเป็นประจำ</h2>
        <p>การทดสอบเป็นระยะช่วยให้มั่นใจว่าอุปกรณ์ของคุณทำงานอย่างถูกต้อง:</p>
        <ul>
          <li>ทดสอบทุกช่องและฟังก์ชันเป็นประจำ</li>
          <li>ปรับเทียบมอนิเตอร์และอุปกรณ์อื่นๆ ตามความจำเป็น</li>
          <li>ติดตามตารางการบำรุงรักษาและประวัติ</li>
        </ul>
        
        <h2>การเก็บรักษาที่เหมาะสม</h2>
        <p>เมื่อไม่ใช้งาน ให้เก็บอุปกรณ์อย่างเหมาะสม:</p>
        <ul>
          <li>ใช้กล่องป้องกันสำหรับอุปกรณ์พกพา</li>
          <li>คลุมอุปกรณ์ที่อยู่กับที่เพื่อป้องกันการสะสมของฝุ่น</li>
          <li>เก็บไมโครโฟนในแนวตั้งเพื่อป้องกันความชื้นสะสมในแคปซูล</li>
          <li>ถอดแบตเตอรี่ออกจากอุปกรณ์ระหว่างการเก็บรักษาระยะยาว</li>
        </ul>
        
        <h2>บทสรุป</h2>
        <p>การลงทุนเวลาในการบำรุงรักษาอย่างเหมาะสมช่วยประหยัดเงินในระยะยาวและช่วยให้มั่นใจว่าอุปกรณ์ของคุณทำงานได้ดีที่สุด พัฒนาตารางการบำรุงรักษาเป็นประจำและยึดมั่นในตารางนั้นเพื่อปกป้องการลงทุนด้านเสียงของคุณ</p>
      `,
      date: "10 มีนาคม 2566",
      author: "ไมเคิล หว่อง",
      image: "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png",
      tags: ["การบำรุงรักษา", "การดูแลอุปกรณ์", "อุปกรณ์เสียง"]
    }
  };

  const post = blogPosts[id as string];

  if (!post) {
    // Redirect to blog listing if post not found
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Navigation />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex-grow">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">
              {language === "en" ? "Post Not Found" : "ไม่พบบทความ"}
            </h1>
            <p className="mb-8">
              {language === "en" 
                ? "The blog post you're looking for doesn't exist or has been removed." 
                : "ไม่พบบทความที่คุณกำลังมองหาหรือถูกลบออกไปแล้ว"}
            </p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "en" ? "Back to all posts" : "กลับไปยังบทความทั้งหมด"}
            </Link>
          </div>
        </main>
        <Footerdemo />
      </div>
    );
  }

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
            {post.tags.map((tag: string, index: number) => (
              <span 
                key={index} 
                className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full"
                role="note"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center" aria-label="Published date">
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center" aria-label="Author">
              <User className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Post content */}
        <article 
          className="prose dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
      <Footerdemo />
    </div>
  );
};

export default BlogPost;
