import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { User, ShieldCheck } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { ButtonColorful } from "@/components/ui/button-colorful";
import { GoogleLogo } from "@/components/ui/google-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const products = [{
  id: 1,
  name: "FIFINE Ampligame AM8",
  price: "2,490 ฿",
  image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
  category: "Dynamic Microphone"
}, {
  id: 2,
  name: "FIFINE Ampligame A8",
  price: "1,990 ฿",
  image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
  category: "Condenser Microphone"
}, {
  id: 5,
  name: "VXE Dragonfly R1",
  price: "1,290 ฿",
  image: "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
  category: "Gaming Mouse"
}, {
  id: 6,
  name: "VGN Dragonfly F1",
  price: "1,690 ฿",
  image: "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
  category: "Gaming Mouse"
}];

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {
    updateCartCount
  } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Account created successfully!");
      setShowAuthDialog(false);
      if (pendingProduct) {
        handleAddToCart(pendingProduct, null, true);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google successfully!");
      setShowAuthDialog(false);
      if (pendingProduct) {
        handleAddToCart(pendingProduct, null, true);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent | null, skipAuthCheck = false) => {
    if (e) {
      e.preventDefault();
    }
    const user = auth.currentUser;
    if (!user && !skipAuthCheck) {
      setPendingProduct(product);
      setShowAuthDialog(true);
      return;
    }
    if (!user) return;
    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
    updateCartCount(user.uid);
    toast.success("Added to cart successfully!");
    setPendingProduct(null);
  };

  return <section className={`py-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="text-center mb-24">
          <ShieldCheck className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-white' : 'text-black'}`} />
          <h2 className={`font-bold mb-6 text-4xl text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>{t("warranty_info")}</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl mx-auto text-lg text-center`}>
            บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด ("บริษัท") ให้การรับประกันสินค้าแบบจำกัดเป็นระยะเวลาหนึ่งปีสำหรับสินค้าทั้งหมด ครอบคลุมข้อบกพร่องจากการผลิตในวัสดุและงานฝีมือภายใต้การใช้งานปกติ ระยะเวลารับประกันเริ่มต้นจากวันที่ชำระเงินและต้องลงทะเบียนรับประกันสินค้าภายใน 30 วันนับจากวันที่ชำระเงิน*
          </p>
          <ButtonColorful label={t("activate_warranty_button")} onClick={() => window.location.href = '/warranty'} className={`mx-auto ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`} />
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t("our_products")}</h2>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ค้นหาอุปกรณ์ระดับพรีเมี่ยมของคุณ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className={`group relative ${isDark ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg overflow-hidden ${isDark ? 'border border-white/10 hover:border-white/20' : 'border border-gray-200 hover:border-gray-300'} transition-all`}>
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{product.category}</span>
                  <h3 className={`mt-1 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                  <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{product.price}</p>
                  <button onClick={e => handleAddToCart(product, e)} className={`mt-4 w-full ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'} py-2 rounded-md transition-colors`}>
                    {t("add_to_cart")}
                  </button>
                </div>
              </motion.div>
            </Link>)}
        </div>

        <div className="mt-16 text-center">
          <Link to="/products" className={`inline-flex items-center justify-center px-8 py-3 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'border border-gray-300 hover:bg-gray-100'} rounded-md transition-colors`}>
            {t("products")}
          </Link>
        </div>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px] max-h-[90vh] w-[95%] p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-center text-base">{t("signup_title")}</DialogTitle>
              <DialogDescription className="text-center text-sm">
                {t("signup_warranty_description")}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4 mt-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">{t("full_name")}</Label>
                <Input id="signup-name" placeholder={t("full_name_placeholder")} value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">{t("email")}</Label>
                <Input id="signup-email" type="email" placeholder={t("email_placeholder")} value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">{t("password")}</Label>
                <Input id="signup-password" type="password" placeholder={t("password_placeholder")} value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t("signup_button")}
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">{t("or")}</span>
          </div>

          <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
            {t("continue_with_google")}
          </Button>

          <p className="text-center text-xs text-gray-400">
            {t("terms_agreement")}{" "}
            <a href="/privacy" className="underline hover:no-underline">
              {t("terms")}
            </a>
            .
          </p>
        </DialogContent>
      </Dialog>
    </section>;
};

export default FeaturedProducts;
