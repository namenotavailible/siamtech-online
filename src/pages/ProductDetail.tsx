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
    description_th: "ไมโครโฟนไดนามิกระดับมืออาชีพที่เหมาะสำหรับการเล่นเกม สตรีมมิ่ง และการสร้างคอนเทนต์ มาพร้อมคุณสมบัติในการบันทึกเสียงที่คมชัดและคุณภาพการสร้างที่แข็งแรงทนทาน",
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
        description_th: "การติดตั้งที่ง่ายดายโดยไม่ต้องใช้ไดรเวอร์ เพียงเสียบและเริ่มใช้งานได้ทันที"
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
        description_th: "เน้นการบันทึกเสียงของคุณในขณะที่ปฏิเสธเสียงนอกแกน"
      }
    ],
    specs: [
      { name: "Type", name_th: "ประเภท", value: "Dynamic", value_th: "ไดนามิก" },
      { name: "Frequency Response", name_th: "การตอบสนองความถี่", value: "50Hz-16kHz", value_th: "50Hz-16kHz" },
      { name: "Sensitivity", name_th: "ความไว", value: "-54dB ±3dB", value_th: "-54dB ±3dB" },
      { name: "Connectivity", name_th: "การเชื่อมต่อ", value: "USB Type-C", value_th: "USB Type-C" },
      { name: "Cable Length", name_th: "ความยาวสาย", value: "2 meters", value_th: "2 เมตร" },
      { name: "Compatibility", name_th: "ความเข้ากันได้", value: "Windows, Mac, PS4, PS5", value_th: "Windows, Mac, PS4, PS5" }
    ],
    inBox: [
      { name: "Microphone", name_th: "ไมโครโฟน" },
      { name: "USB-C Cable", name_th: "สาย USB-C" },
      { name: "Desktop Stand", name_th: "ขาตั้งโต๊ะ" },
      { name: "User Manual", name_th: "คู่มือการใช้งาน" }
    ],
    stock: 15,
    rating: 4.8,
    reviews: 126,
    isNew: true,
    isBestSeller: true
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

  const product = products.find(p => p.id === Number(id));

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
    
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product?.id);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else if (product) {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
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

  useEffect(() => {
    // Reset selection when product changes
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

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

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme === 'dark' ? 'from-black to-gray-900 text-white' : 'from-white to-gray-50 text-gray-900'} relative`}>
      <div className="absolute top-4 left-4 z-10 flex space-x-4">
        <Button variant="link" onClick={() => navigate(-1)} className={theme === 'dark' ? 'text-white' : 'text-black'}>
          <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          {language === "en" ? "Go back" : "กลับไป"}
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center space-x-4 z-10">
        <LanguageSwitcher />
        <ThemeToggle />
        <button 
          onClick={() => navigate("/")}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} transition-colors`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className={`aspect-square overflow-hidden rounded-xl ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-100 shadow-lg'}`}>
              <img
                src={product.gallery[selectedImage]}
                alt={language === "en" ? product.name : product.name_th}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg ${selectedImage === index 
                    ? (theme === 'dark' ? 'ring-2 ring-white' : 'ring-2 ring-black') 
                    : (theme === 'dark' ? 'border border-white/10' : 'border border-gray-200')}`}
                >
                  <img
                    src={image}
                    alt={`${language === "en" ? product.name : product.name_th} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant={theme === 'dark' ? "outline" : "secondary"} className="capitalize">
                  {language === "en" ? product.category : product.category_th}
                </Badge>
                {product.isNew && (
                  <Badge variant="destructive">
                    {language === "en" ? "New Arrival" : "สินค้าใหม่"}
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    {language === "en" ? "Best Seller" : "ขายดี"}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                {language === "en" ? product.name : product.name_th}
              </h1>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  ({product.reviews} {language === "en" ? "reviews" : "รีวิว"})
                </span>
              </div>
              
              <div className="mt-4 space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold">{formatPrice(product.price)} ฿</p>
                  {product.originalPrice > product.price && (
                    <p className={`text-lg line-through ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatPrice(product.originalPrice)} ฿
                    </p>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <p className="text-red-500 font-medium">
                    {language === "en" 
                      ? `Save ${discount}% (${formatPrice(product.originalPrice - product.price)} ฿)` 
                      : `ประหยัด ${discount}% (${formatPrice(product.originalPrice - product.price)} ฿)`}
                  </p>
                )}
              </div>
            </div>
            
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === "en" ? product.description : product.description_th}
            </p>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <span>
                  {language === "en" 
                    ? `Stock: ${product.stock} units` 
                    : `สินค้าคงเหลือ: ${product.stock} ชิ้น`}
                </span>
                <span className={product.stock > 10 
                  ? "text-green-500" 
                  : product.stock > 5 
                    ? "text-amber-500" 
                    : "text-red-500"}>
                  {product.stock > 10 
                    ? (language === "en" ? "In Stock" : "มีสินค้า") 
                    : product.stock > 5 
                      ? (language === "en" ? "Limited Stock" : "สินค้าเหลือน้อย") 
                      : (language === "en" ? "Almost Sold Out" : "ใกล้หมด")}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex space-x-4 items-center">
                <span className="font-medium">{language === "en" ? "Quantity:" : "จำนวน:"}</span>
                <div className={`flex border rounded-md ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`px-3 py-1 ${theme === 'dark' 
                      ? (quantity <= 1 ? 'text-gray-600' : 'text-white hover:bg-white/10') 
                      : (quantity <= 1 ? 'text-gray-300' : 'text-black hover:bg-gray-100')}`}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 flex items-center justify-center min-w-[40px]">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    disabled={product && quantity >= product.stock}
                    className={`px-3 py-1 ${theme === 'dark' 
                      ? (product && quantity >= product.stock ? 'text-gray-600' : 'text-white hover:bg-white/10') 
                      : (product && quantity >= product.stock ? 'text-gray-300' : 'text-black hover:bg-gray-100')}`}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="h-12 text-base font-medium"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t("add_to_cart")}
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 text-base font-medium"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {language === "en" ? "Add to Wishlist" : "เพิ่มในรายการโปรด"}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-sm opacity-70">{language === "en" ? "Free Shipping" : "จัดส่งฟรี"}</div>
                <div className="font-medium">{language === "en" ? "For orders over 1,500 ฿" : "สำหรับคำสั่งซื้อมากกว่า 1,500 ฿"}</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-sm opacity-70">{language === "en" ? "Warranty" : "รับประกัน"}</div>
                <div className="font-medium">{language === "en" ? "1 Year Official Warranty" : "รับประกันอย่างเป็นทางการ 1 ปี"}</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className={theme === 'dark' ? 'text-white' : 'text-black'}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="features">{language === "en" ? "Features" : "คุณสมบัติ"}</TabsTrigger>
              <TabsTrigger value="specifications">{language === "en" ? "Specifications" : "ข้อมูลจำเพาะ"}</TabsTrigger>
              <TabsTrigger value="package">{language === "en" ? "What's in the Box" : "สิ่งที่อยู่ในกล่อง"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {language === "en" ? feature.title : feature.title_th}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {language === "en" ? feature.description : feature.description_th}
