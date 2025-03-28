
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
    <div className={`min-h-screen bg-background text-foreground`}>
      {/* Navigation Controls */}
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
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className={`aspect-square rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <img
                src={product.gallery[selectedImage]}
                alt={language === "en" ? product.name : product.name_th}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden ${
                    selectedImage === index 
                      ? `ring-2 ${theme === 'dark' ? 'ring-primary' : 'ring-primary'} bg-primary/10` 
                      : `${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`
                  }`}
                >
                  <img
                    src={image}
                    alt={`${language === "en" ? product.name : product.name_th} - ${index + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply p-1"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-full">
                  {language === "en" ? product.category : product.category_th}
                </Badge>
                {product.isNew && (
                  <Badge variant="destructive" className="rounded-full">
                    {language === "en" ? "New" : "ใหม่"}
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 rounded-full">
                    {language === "en" ? "Best Seller" : "ขายดี"}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight">
                {language === "en" ? product.name : product.name_th}
              </h1>
              
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews})
                </span>
              </div>
              
              <div className="pt-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{formatPrice(product.price)} ฿</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)} ฿
                    </span>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <p className="text-red-500 text-sm font-medium mt-1">
                    {language === "en" 
                      ? `${discount}% off` 
                      : `ประหยัด ${discount}%`}
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {language === "en" ? product.description : product.description_th}
            </p>
            
            <Separator />
            
            {/* Stock Information */}
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {language === "en" 
                  ? `Stock: ${product.stock} units` 
                  : `สินค้าคงเหลือ: ${product.stock} ชิ้น`}
              </span>
              <Badge variant={product.stock > 10 
                ? "outline" 
                : product.stock > 5 
                  ? "secondary" 
                  : "destructive"}
                className="rounded-full"
              >
                {product.stock > 10 
                  ? (language === "en" ? "In Stock" : "มีสินค้า") 
                  : product.stock > 5 
                    ? (language === "en" ? "Limited Stock" : "สินค้าเหลือน้อย") 
                    : (language === "en" ? "Almost Sold Out" : "ใกล้หมด")}
              </Badge>
            </div>
            
            {/* Quantity Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium">{language === "en" ? "Quantity:" : "จำนวน:"}</p>
              <div className="flex items-center w-full max-w-[140px]">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity} 
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
                  onClick={incrementQuantity} 
                  disabled={product && quantity >= product.stock}
                  className="h-10 w-10 rounded-r-md rounded-l-none"
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            
            {/* Shipping & Warranty Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-none">
                <CardContent className="p-4 text-center space-y-1">
                  <p className="text-xs text-muted-foreground">{language === "en" ? "Free Shipping" : "จัดส่งฟรี"}</p>
                  <p className="text-sm font-medium">{language === "en" ? "Orders over 1,500 ฿" : "คำสั่งซื้อมากกว่า 1,500 ฿"}</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-none">
                <CardContent className="p-4 text-center space-y-1">
                  <p className="text-xs text-muted-foreground">{language === "en" ? "Warranty" : "รับประกัน"}</p>
                  <p className="text-sm font-medium">{language === "en" ? "1 Year Official" : "รับประกัน 1 ปี"}</p>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center text-muted-foreground"
              onClick={() => window.open("https://line.me", "_blank")}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {language === "en" ? "Share this product" : "แชร์สินค้านี้"}
            </Button>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="features">{language === "en" ? "Features" : "คุณสมบัติ"}</TabsTrigger>
              <TabsTrigger value="specifications">{language === "en" ? "Specifications" : "ข้อมูลจำเพาะ"}</TabsTrigger>
              <TabsTrigger value="package">{language === "en" ? "In the Box" : "สิ่งที่อยู่ในกล่อง"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="text-lg font-semibold">
                      {language === "en" ? feature.title : feature.title_th}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en" ? feature.description : feature.description_th}
                    </p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications">
              <div className="rounded-lg overflow-hidden border">
                <div className="grid divide-y">
                  {product.specs.map((spec, index) => (
                    <div 
                      key={index} 
                      className={`grid grid-cols-2 p-4 ${index % 2 === 0 ? 'bg-muted/50' : ''}`}
                    >
                      <div className="font-medium">{language === "en" ? spec.name : spec.name_th}</div>
                      <div>{language === "en" ? spec.value : spec.value_th}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="package">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {product.inBox.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{language === "en" ? item.name : item.name_th}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg overflow-hidden"
          >
            <Card className="border-0 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold">
                  {language === "en" 
                    ? "Premium Performance" 
                    : "ประสิทธิภาพระดับพรีเมียม"}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === "en" 
                    ? "Join thousands of satisfied customers who have upgraded their setup with our premium products."
                    : "เข้าร่วมกับลูกค้าที่พึงพอใจนับพันที่ได้อัพเกรดการตั้งค่าของพวกเขาด้วยผลิตภัณฑ์ระดับพรีเมียมของเรา"}
                </p>
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="px-8"
                >
                  {t("add_to_cart")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
