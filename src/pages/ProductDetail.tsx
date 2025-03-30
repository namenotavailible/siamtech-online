
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { X, ChevronLeft, Check, ShoppingCart, Star, Heart, Share2, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "FIFINE Ampligame AM8",
    name_th: "FIFINE Ampligame AM8",
    price: 2490,
    originalPrice: 2990,
    image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
    gallery: [
      "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
      "/lovable-uploads/9a3c3a9c-b2c9-4953-a581-32e79e85cf73.png",
      "/lovable-uploads/a4eefbee-12f4-4538-a894-35864e07fe99.png",
      "/lovable-uploads/0c3ec78b-5e9e-472a-9c82-5217d1019e5e.png",
      "/lovable-uploads/97e40566-5cee-4dee-9fc7-221e8a3a12e6.png",
      "/lovable-uploads/30d59c91-0ea4-4ce3-8e4f-f233d15f429d.png"
    ],
    category: "Dynamic Microphone",
    category_th: "ไมโครโฟนไดนามิก",
    description: "Professional dynamic microphone perfect for gaming, streaming, and content creation. Features crystal clear audio capture and robust build quality.",
    description_th: "ไมโครโฟนไดนามิก FIFINE รุ่น AM8 (Global Version) เชื่อมต่อด้วยพอร์ต USB-C หรือ XLR ใช้รูปแบบการรับเสียงหรือ Polar Pattern แบบ Cardioid มาพร้อมกับไฟ RGB ปรับเฉดสีได้ ตอบโจทย์การใช้งานที่หลากหลาย อาทิ เช่น Audio Podcast, อัดเสียง, อัดเพลง, ประชุม, ดิสคอร์ด, แต่งโต๊ะคอมพ์ ฯลฯ",
    features: [
      {
        title: "Superior Sound Quality",
        title_th: "คุณภาพเสียงเหนือชั้น",
        description: "Engineered for crystal-clear voice capture with minimal background noise",
        description_th: "ออกแบบมาเพื่อการบันทึกเสียงที่คมชัดโดยมีเสียงรบกวนรอบข้างน้อยที่สุด"
      },
      {
        title: "Plug & Play USB Connection",
        title_th: "การเชื่อมต่อ USB แบบพร้อมใช้งาน",
        description: "Simple setup with no drivers required, just plug in and start creating",
        description_th: "Plug and Play: รองรับการใช้งานแบบ Plug and Play ไม่จำเป็นต้องติดตั้งไดรเวอร์เพิ่มเติม"
      },
      {
        title: "Durable Construction",
        title_th: "การก่อสร้างที่ทนทาน",
        description: "Built to last with premium materials and solid construction",
        description_th: "สร้างขึ้นเพื่อความทนทานด้วยวัสดุคุณภาพสูงและการก่อสร้างที่แข็งแรง"
      },
      {
        title: "Cardioid Pickup Pattern",
        title_th: "รูปแบบการรับเสียงแบบ Cardioid",
        description: "Focuses on capturing your voice while rejecting off-axis sounds",
        description_th: "ลดเสียงรบกวนรอบข้าง: รูปแบบการรับเสียงแบบทิศทางเดียว (cardioid) สามารถลดเสียงรบกวนจากรอบข้างได้ดี"
      },
      {
        title: "RGB Lighting",
        title_th: "ไฟ RGB",
        description: "Customizable RGB lighting with multiple color options",
        description_th: "RGB: แสงสีที่ลงตัว สามารถปรับได้ถึง 10 เฉดสีโดยการสัมผัสเบาๆ และสามารถสัมผัสค้างเพื่อปิดได้"
      },
      {
        title: "Professional Controls",
        title_th: "การควบคุมระดับมืออาชีพ",
        description: "Integrated gain control and headphone monitoring",
        description_th: "Mute / Unmute: สัมผัสเพื่อเปิด/ปิดเสียง, Mic Gain knob: ปุ่มปรับการขยายเสียงของไมโครโฟน, Headphone Monitoring Gain Knob: ปุ่มปรับเสียงดังเบาสำหรับ Monitor เสียง"
      }
    ],
    specs: [
      { name: "Type", name_th: "ประเภท", value: "Dynamic", value_th: "ไดนามิก" },
      { name: "Polar Pattern", name_th: "รูปแบบโพลาร์", value: "Cardioid", value_th: "คาร์ดิออยด์" },
      { name: "Output Connection", name_th: "การเชื่อมต่อขาออก", value: "USB type-C (mic end) to type-A 2.0 (computer end)/XLR", value_th: "USB type-C (ฝั่งไมค์) เป็น type-A 2.0 (ฝั่งคอมพิวเตอร์)/XLR" },
      { name: "USB Power Consumption", name_th: "การใช้พลังงาน USB", value: "Voltage: 5±0.25 V", value_th: "แรงดัน: 5±0.25 V" },
      { name: "Bit Depth/Sample Rate", name_th: "ความลึกบิต/อัตราการสุ่มตัวอย่าง", value: "16-bit/44.1k-48k Hz", value_th: "16-bit/44.1k-48k Hz" },
      { name: "Frequency Response", name_th: "การตอบสนองความถี่", value: "50-16kHz", value_th: "50-16kHz" },
      { name: "S/N Ratio", name_th: "อัตราส่วนสัญญาณต่อเสียงรบกวน", value: "＞80 dB", value_th: "＞80 dB" },
      { name: "Sensitivity", name_th: "ความไว", value: "-50±3dB", value_th: "-50±3dB" },
      { name: "Shipping Weight", name_th: "น้ำหนักการจัดส่ง", value: "1.0 kg", value_th: "1.0 กก." }
    ],
    inBox: [
      { name: "Microphone", name_th: "Fifine AM8" },
      { name: "USB-C Cable", name_th: "USB to USB Type-C Cable" },
      { name: "Desktop Stand", name_th: "ฐานไมโครโฟน" },
      { name: "User Manual", name_th: "คู่มือการใช้งาน" }
    ],
    stock: 15,
    rating: 4.8,
    reviews: 126,
    isNew: true,
    isBestSeller: true,
    warranty: {
      en: "1-year warranty (replace with new unit)",
      th: "ประกันสินค้า 1 ปี - ประกันคุณภาพสินค้า 1 ปี (เสียเปลี่ยนตัวใหม่)* - การันตีของแท้ 100%"
    },
    compatibility: {
      en: "Mac, Laptop, PC, PlayStation and Smartphone (dongle not included)",
      th: "Mac, Laptop, PC, Play station และ โทรศัพท์มือถือบางรุ่นโดยเชื่อมต่อผ่าน USB adapter"
    },
    connections: {
      en: "USB Type-C, XLR (RGB lighting not available with XLR), 3.5mm Jack (for audio monitoring)",
      th: "USB Type-C, XLR (ไม่สามารถเปิด RGB ได้), Jack 3.5 (สำหรับมอนิเตอร์เสียง)"
    }
  },
  {
    id: 2,
    name: "FIFINE Ampligame A8",
    name_th: "FIFINE Ampligame A8",
    price: 1990,
    originalPrice: 2490,
    image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
    gallery: [
      "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
      "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
      "/lovable-uploads/8cb78da9-2dc4-4442-9bef-1c1424f43d37.png"
    ],
    category: "Condenser Microphone",
    category_th: "ไมโครโฟนคอนเดนเซอร์",
    description: "High-quality condenser microphone featuring RGB lighting effects and professional audio quality, perfect for streaming and content creation.",
    description_th: "ไมโครโฟนคอนเดนเซอร์คุณภาพสูงพร้อมเอฟเฟกต์ไฟ RGB และคุณภาพเสียงระดับมืออาชีพ เหมาะอย่างยิ่งสำหรับการสตรีมและการสร้างคอนเทนต์",
    features: [
      {
        title: "Studio-Quality Sound",
        title_th: "เสียงคุณภาพสตูดิโอ",
        description: "Capture professional audio with exceptional clarity and detail",
        description_th: "บันทึกเสียงระดับมืออาชีพด้วยความคมชัดและรายละเอียดที่ยอดเยี่ยม"
      },
      {
        title: "Customizable RGB Lighting",
        title_th: "ไฟ RGB ที่ปรับแต่งได้",
        description: "Multiple lighting modes to match your streaming setup",
        description_th: "โหมดแสงหลากหลายเพื่อให้เข้ากับการตั้งค่าการสตรีมของคุณ"
      },
      {
        title: "Zero-Latency Monitoring",
        title_th: "การตรวจสอบแบบไม่มีความล่าช้า",
        description: "Built-in headphone output for real-time audio monitoring",
        description_th: "มีช่องเสียบหูฟังในตัวสำหรับการตรวจสอบเสียงแบบเรียลไทม์"
      },
      {
        title: "Adjustable Gain Control",
        title_th: "การควบคุมอัตราขยายที่ปรับได้",
        description: "Fine-tune your input levels directly on the microphone",
        description_th: "ปรับระดับอินพุตของคุณได้โดยตรงบนไมโครโฟน"
      }
    ],
    specs: [
      { name: "Type", name_th: "ประเภท", value: "Condenser", value_th: "คอนเดนเซอร์" },
      { name: "Frequency Response", name_th: "การตอบสนองความถี่", value: "20Hz-20kHz", value_th: "20Hz-20kHz" },
      { name: "Sensitivity", name_th: "ความไว", value: "-34dB ±2dB", value_th: "-34dB ±2dB" },
      { name: "Connectivity", name_th: "การเชื่อมต่อ", value: "USB Type-C", value_th: "USB Type-C" },
      { name: "Cable Length", name_th: "ความยาวสาย", value: "2 meters", value_th: "2 เมตร" },
      { name: "Compatibility", name_th: "ความเข้ากันได้", value: "Windows, Mac, PS4, PS5", value_th: "Windows, Mac, PS4, PS5" }
    ],
    inBox: [
      { name: "Microphone", name_th: "ไมโครโฟน" },
      { name: "USB-C Cable", name_th: "สาย USB-C" },
      { name: "Shock Mount", name_th: "ช็อคเมาท์" },
      { name: "Pop Filter", name_th: "ฟิลเตอร์ป๊อป" },
      { name: "User Manual", name_th: "คู่มือการใช้งาน" }
    ],
    stock: 8,
    rating: 4.7,
    reviews: 98,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 5,
    name: "VXE Dragonfly R1",
    name_th: "VXE Dragonfly R1",
    price: 1290,
    originalPrice: 1590,
    image: "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
    gallery: [
      "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
      "/lovable-uploads/c3c23368-ed7d-4264-a5be-e2767c592def.png",
      "/lovable-uploads/bcdf99dc-db14-4a07-8243-6a3174617963.png"
    ],
    category: "Gaming Mouse",
    category_th: "เมาส์เกมมิ่ง",
    description: "High-performance gaming mouse featuring a high-precision optical sensor, ultra-lightweight design, and customizable RGB lighting.",
    description_th: "เมาส์เกมมิ่งประสิทธิภาพสูงที่มีเซ็นเซอร์ออปติคอลความแม่นยำสูง น้ำหนักเบาพิเศษ และไฟ RGB ที่ปรับแต่งได้",
    features: [
      {
        title: "16,000 DPI Optical Sensor",
        title_th: "เซ็นเซอร์ออปติคอล 16,000 DPI",
        description: "Track with pixel-perfect precision for competitive gaming",
        description_th: "ติดตามด้วยความแม่นยำระดับพิกเซลสำหรับการเล่นเกมแข่งขัน"
      },
      {
        title: "Ultra-Lightweight Design",
        title_th: "การออกแบบที่เบาพิเศษ",
        description: "Only 68 grams for extended, fatigue-free gaming sessions",
        description_th: "เพียง 68 กรัมสำหรับการเล่นเกมยาวนานโดยไม่เมื่อยล้า"
      },
      {
        title: "Programmable Buttons",
        title_th: "ปุ่มที่ตั้งโปรแกรมได้",
        description: "6 customizable buttons for optimized gameplay",
        description_th: "ปุ่มที่ปรับแต่งได้ 6 ปุ่มสำหรับการเล่นเกมที่เหมาะสมที่สุด"
      },
      {
        title: "Honeycomb Shell",
        title_th: "เปลือกรังผึ้ง",
        description: "Ventilated design for cooler hands during intense gameplay",
        description_th: "การออกแบบระบายอากาศเพื่อให้มือเย็นลงระหว่างการเล่นเกมที่เข้มข้น"
      }
    ],
    specs: [
      { name: "Sensor", name_th: "เซ็นเซอร์", value: "PixArt PMW3389", value_th: "PixArt PMW3389" },
      { name: "DPI Range", name_th: "ช่วง DPI", value: "400-16,000", value_th: "400-16,000" },
      { name: "Buttons", name_th: "ปุ่ม", value: "6 Programmable", value_th: "6 ตั้งโปรแกรมได้" },
      { name: "Weight", name_th: "น้ำหนัก", value: "68g", value_th: "68 กรัม" },
      { name: "Polling Rate", name_th: "อัตราการส่งข้อมูล", value: "1000Hz", value_th: "1000Hz" },
      { name: "Cable", name_th: "สายเคเบิล", value: "1.8m Paracord", value_th: "1.8 เมตร Paracord" }
    ],
    inBox: [
      { name: "Gaming Mouse", name_th: "เมาส์เกมมิ่ง" },
      { name: "Replacement Skates", name_th: "สเก็ตสำรอง" },
      { name: "User Manual", name_th: "คู่มือการใช้งาน" }
    ],
    stock: 22,
    rating: 4.6,
    reviews: 87,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: "VGN Dragonfly F1",
    name_th: "VGN Dragonfly F1",
    price: 1690,
    originalPrice: 1990,
    image: "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
    gallery: [
      "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
      "/lovable-uploads/bcdf99dc-db14-4a07-8243-6a3174617963.png",
      "/lovable-uploads/3cdd087c-645e-4a74-a9e9-59680079c17f.png"
    ],
    category: "Gaming Mouse",
    category_th: "เมาส์เกมมิ่ง",
    description: "Premium gaming mouse with advanced optical sensor, customizable weight system, and extensive RGB lighting customization options.",
    description_th: "เมาส์เกมมิ่งระดับพรีเมียมพร้อมเซ็นเซอร์ออปติคอลขั้นสูง ระบบน้ำหนักที่ปรับแต่งได้ และตัวเลือกการปรับแต่งไฟ RGB อย่างหลากหลาย",
    features: [
      {
        title: "24,000 DPI Sensor",
        title_th: "เซ็นเซอร์ 24,000 DPI",
        description: "Industry-leading sensor technology for unmatched precision",
        description_th: "เทคโนโลยีเซ็นเซอร์ชั้นนำของอุตสาหกรรมเพื่อความแม่นยำที่ไม่มีใครเทียบได้"
      },
      {
        title: "Adjustable Weight System",
        title_th: "ระบบน้ำหนักที่ปรับได้",
        description: "Customize weight from 95-120g with removable weights",
        description_th: "ปรับแต่งน้ำหนักจาก 95-120 กรัมด้วยน้ำหนักที่ถอดได้"
      },
      {
        title: "10 Programmable Buttons",
        title_th: "ปุ่มที่ตั้งโปรแกรมได้ 10 ปุ่ม",
        description: "Create complex macros and shortcuts for any game",
        description_th: "สร้างแมโครและทางลัดที่ซับซ้อนสำหรับเกมใดก็ได้"
      },
      {
        title: "PTFE Skates",
        title_th: "สเก็ต PTFE",
        description: "Premium mouse feet for smooth, consistent gliding",
        description_th: "ขาเมาส์ระดับพรีเมียมสำหรับการเลื่อนที่ราบรื่นและสม่ำเสมอ"
      }
    ],
    specs: [
      { name: "Sensor", name_th: "เซ็นเซอร์", value: "PixArt PAW3395", value_th: "PixArt PAW3395" },
      { name: "DPI Range", name_th: "ช่วง DPI", value: "100-24,000", value_th: "100-24,000" },
      { name: "Buttons", name_th: "ปุ่ม", value: "10 Programmable", value_th: "10 ตั้งโปรแกรมได้" },
      { name: "Weight", name_th: "น้ำหนัก", value: "95-120g (Adjustable)", value_th: "95-120 กรัม (ปรับได้)" },
      { name: "Polling Rate", name_th: "อัตราการส่งข้อมูล", value: "8000Hz", value_th: "8000Hz" },
      { name: "Connectivity", name_th: "การเชื่อมต่อ", value: "Wired/Wireless", value_th: "มีสาย/ไร้สาย" }
    ],
    inBox: [
      { name: "Gaming Mouse", name_th: "เมาส์เกมมิ่ง" },
      { name: "Weight System", name_th: "ระบบน้ำหนัก" },
      { name: "Wireless Receiver", name_th: "ตัวรับสัญญาณไร้สาย" },
      { name: "Charging Cable", name_th: "สายชาร์จ" },
      { name: "Extra Skates", name_th: "สเก็ตเพิ่มเติม" },
      { name: "User Manual", name_th: "คู่มือการใช้งาน" }
    ],
    stock: 5,
    rating: 4.9,
    reviews: 152,
    isNew: false,
    isBestSeller: true
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH').format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [activeTab, setActiveTab] = useState("features");

  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedColor("Black");
    setActiveTab("features");
  }, [id, product]);

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      const authButton = document.querySelector('[data-auth-trigger]');
      if (authButton instanceof HTMLElement) {
        authButton.click();
      }
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = currentCart.findIndex((item: any) => 
      item.id === product?.id && item.color === selectedColor
    );
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else if (product) {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor
      });
    }

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
    toast.success(language === "en" ? "Added to cart successfully!" : "เพิ่มลงในตะกร้าเรียบร้อยแล้ว!");
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  if (!id) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <h1 className="text-2xl">{language === "en" ? "Product not found" : "ไม่พบสินค้า"}</h1>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  const colors = ["Black", "White"];

  const metaDescription = language === "en" 
    ? `FIFINE Ampligame AM8 - Professional dynamic microphone with USB-C/XLR connectivity, Cardioid polar pattern, and RGB lighting. Perfect for podcasting, streaming, and recording.`
    : `ไมโครโฟนไดนามิก FIFINE รุ่น AM8 (Global Version) เชื่อมต่อด้วยพอร์ต USB-C หรือ XLR ใช้รูปแบบการรับเสียงแบบ Cardioid มาพร้อมกับไฟ RGB ปรับเฉดสีได้`;

  const pageTitle = language === "en" 
    ? `FIFINE AM8 Dynamic Microphone | Professional Audio for Gaming and Streaming` 
    : `ไมโครโฟนไดนามิก FIFINE AM8 | ไมค์คุณภาพสูงสำหรับเกมมิ่งและสตรีมมิ่ง`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="FIFINE AM8, dynamic microphone, gaming microphone, streaming microphone, USB-C microphone, XLR microphone, Cardioid microphone, RGB microphone, ไมโครโฟนไดนามิก, ไมค์เกมมิ่ง" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="og:price:amount" content={product.price.toString()} />
        <meta property="og:price:currency" content="THB" />
        <meta property="og:availability" content={product.stock > 0 ? "instock" : "outofstock"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={product.image} />
        <link rel="canonical" href={`/product/${product.id}`} />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>
            {language === "en" ? "Home" : "หน้าแรก"}
          </span>
          <span className="mx-2">/</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/products")}>
            {language === "en" ? "Products" : "สินค้า"}
          </span>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {language === "en" ? product.category : product.category_th}
          </span>
        </div>
      </div>

      <div className="fixed top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="fixed top-4 right-4 flex items-center space-x-2 z-10">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/")} 
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
          <ResizablePanel defaultSize={50} minSize={40}>
            <div className="flex h-full flex-col">
              <div className="flex-1 p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <AspectRatio ratio={1/1} className="bg-muted">
                    <img
                      src={product.gallery[selectedImage]}
                      alt={language === "en" ? product.name : product.name_th}
                      className="object-contain h-full w-full"
                    />
                  </AspectRatio>
                </div>
                
                <div className="grid grid-cols-6 gap-3">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden ${
                        selectedImage === index 
                          ? `ring-2 ring-primary bg-primary/10` 
                          : `bg-muted`
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${language === "en" ? product.name : product.name_th} - ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={40}>
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-auto p-6">
                <div className="mb-2 text-left">
                  <span className="text-primary font-medium tracking-wide">
                    {language === "en" ? "Fifine Ampligame AM8" : "Fifine Ampligame AM8"}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold mb-3 text-left leading-tight">
                  {language === "en" ? "Fifine Ampligame AM8" : "Fifine Ampligame AM8"} {language === "en" ? "Premium" : "พรีเมียม"} 
                  {product.category.includes("Microphone") ? (language === "en" ? " Microphone" : " ไมโครโฟน") : ""}
                </h1>
                
                <div className="mb-6 text-left">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{formatPrice(product.price)} ฿</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm line-through text-muted-foreground">
                        {formatPrice(product.originalPrice)} ฿
                      </span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <p className="text-red-500 text-sm font-medium mt-1">
                      {language === "en" 
                        ? `Save ${discount}%` 
                        : `ประหยัด ${discount}%`}
                    </p>
                  )}
                </div>
                
                <div className="mb-8 space-y-3 text-left">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <span className="text-base">
                        {language === "en" ? feature.title : feature.title_th}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="mb-6 text-left">
                  <h3 className="text-base font-medium mb-3">
                    {language === "en" ? "Choose color" : "เลือกสี"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                        className={`min-w-[80px] ${
                          color === "Black" 
                            ? selectedColor === "Black" ? "bg-black text-white" : "border-black text-black" 
                            : selectedColor === "White" ? "bg-white text-black border border-gray-200" : "bg-transparent text-black border border-gray-200"
                        }`}
                      >
                        {language === "en" ? color : color === "Black" ? "สีดำ" : "สีขาว"}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6 text-left">
                  <h3 className="text-base font-medium mb-3">
                    {language === "en" ? "Quantity" : "จำนวน"}
                  </h3>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => decrementQuantity()} 
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-l-md rounded-r-none"
                    >
                      <span className="text-lg">−</span>
                    </Button>
                    <div className="flex items-center justify-center h-10 w-20 border-y">
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => incrementQuantity()} 
                      disabled={product ? quantity >= product.stock : false}
                      className="h-10 w-10 rounded-l-none rounded-r-md"
                    >
                      <span className="text-lg">+</span>
                    </Button>
                  </div>
                  
                  <p className="text-sm mt-2 text-muted-foreground">
                    {language === "en" 
                      ? `${product.stock} units available` 
                      : `มีสินค้าเหลือ ${product.stock} ชิ้น`}
                  </p>
                </div>
                
                <div className="mt-8 mb-4 space-y-4">
                  <Button 
                    onClick={() => handleAddToCart()} 
                    className="w-full py-6 text-base font-medium"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {language === "en" ? "Add to Cart" : "เพิ่มลงตะกร้า"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {product.rating.toFixed(1)} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:text-rose-500"
                      aria-label={language === "en" ? "Add to wishlist" : "เพิ่มในรายการโปรด"}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      aria-label={language === "en" ? "Share product" : "แชร์สินค้า"}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                  <TabsList className="grid grid-cols-4 h-auto">
                    <TabsTrigger value="features" className="py-3">
                      {language === "en" ? "Features" : "คุณสมบัติ"}
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="py-3">
                      {language === "en" ? "Specifications" : "สเปค"}
                    </TabsTrigger>
                    <TabsTrigger value="compatibility" className="py-3">
                      {language === "en" ? "Compatibility" : "การเชื่อมต่อ"}
                    </TabsTrigger>
                    <TabsTrigger value="warranty" className="py-3">
                      {language === "en" ? "Warranty" : "การรับประกัน"}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="pt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm font-medium">{language === "en" ? "Key Features" : "คุณสมบัติสำคัญ"}</p>
                          <ul className="space-y-2 text-sm">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{language === "en" ? feature.description : feature.description_th}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="specifications" className="pt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm font-medium">{language === "en" ? "Technical Specifications" : "ข้อมูลจำเพาะทางเทคนิค"}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.specs.map((spec, index) => (
                              <div key={index} className="py-2 border-b last:border-0">
                                <p className="text-sm text-muted-foreground">{language === "en" ? spec.name : spec.name_th}</p>
                                <p className="text-sm font-medium">{language === "en" ? spec.value : spec.value_th}</p>
                              </div>
                            ))}
                          </div>
                          
                          <p className="text-sm font-medium mt-6">{language === "en" ? "What's in the Box" : "อุปกรณ์ในกล่อง"}</p>
                          <ul className="space-y-1 text-sm">
                            {product.inBox.map((item, index) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2 text-primary">•</span>
                                <span>{language === "en" ? item.name : item.name_th}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="compatibility" className="pt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm font-medium">{language === "en" ? "Compatible Systems" : "ระบบที่รองรับ"}</p>
                          <p className="text-sm">{language === "en" ? product.compatibility.en : product.compatibility.th}</p>
                          
                          <p className="text-sm font-medium mt-4">{language === "en" ? "Connection Types" : "ประเภทการเชื่อมต่อ"}</p>
                          <p className="text-sm">{language === "en" ? product.connections.en : product.connections.th}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="warranty" className="pt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm font-medium">{language === "en" ? "Warranty Information" : "ข้อมูลการรับประกัน"}</p>
                          <p className="text-sm">{language === "en" ? product.warranty.en : product.warranty.th}</p>
                          
                          <div className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20">
                            <p className="text-sm font-medium flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              {language === "en" ? "Authentic Product Guarantee" : "การรับประกันผลิตภัณฑ์แท้"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProductDetail;
