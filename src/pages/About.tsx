
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Trophy, 
  Target, 
  Clock, 
  Globe, 
  Lightbulb, 
  HeadphonesMic, 
  ShieldCheck, 
  TrendingUp 
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16 relative"
          >
            <div className="h-[20rem] w-full absolute top-[-8rem] left-0">
              <SparklesCore
                id="tsparticlesabout"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor={theme === 'dark' ? "#FFFFFF" : "#000000"}
                speed={0.5}
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 relative z-10">{t("about_siamtech")}</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} relative z-10 max-w-2xl mx-auto`}>
              Innovative electronics and gadget retailer bringing premium technology to your fingertips since 2023
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Company Overview
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Founded in August 2023, SIAMTECH is a dynamic online retailer specializing in high-quality electronics 
                and tech gadgets. We offer a curated selection of products, including microphones, audio equipment, 
                and innovative tech solutions, all designed to meet the evolving needs of tech enthusiasts and 
                professionals alike.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                At SIAMTECH, we aim to make premium technology accessible to everyone. We're committed to offering 
                cutting-edge electronics at competitive prices, ensuring exceptional service through fast shipping 
                and responsive support, and continuously expanding our product range to meet growing consumer demands.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center">
              <Lightbulb className="h-6 w-6 text-primary" />
              Our Brand Story
            </h2>
            <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded-lg p-8`}>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                SIAMTECH began as a small e-commerce store with a clear vision: to provide premium-quality 
                electronics at accessible prices. Despite our relatively recent launch, we've grown rapidly, 
                attracting thousands of customers who trust our product quality and service.
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mt-4`}>
                Our success is driven by an unwavering commitment to innovation, product reliability, and 
                customer satisfaction. By carefully curating our product range, we ensure that whether you're 
                a seasoned tech enthusiast, a working professional, or an everyday user, you'll find the 
                perfect tech solutions for your needs.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white'} transition-all hover:shadow-md`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <HeadphonesMic className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Products</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Carefully selected premium electronics for optimal performance
                  </p>
                </CardContent>
              </Card>
              
              <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white'} transition-all hover:shadow-md`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Reliable Service</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Fast shipping, responsive support, and dependable warranties
                  </p>
                </CardContent>
              </Card>
              
              <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white'} transition-all hover:shadow-md`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Competitive Pricing</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Premium technology at accessible price points
                  </p>
                </CardContent>
              </Card>
              
              <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white'} transition-all hover:shadow-md`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Customer Focus</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Built on trust, transparency, and exceptional customer experiences
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} rounded-lg p-8 mb-16`}
          >
            <h2 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Company Milestones
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Growing Fast</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Rapidly expanding since our inception in 2023
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3,000+ Orders</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Thousands of orders fulfilled through Shopee and other platforms
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Growing Reach</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expanding online presence with increasing customer trust
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`text-center ${theme === 'dark' ? 'bg-gradient-to-b from-white/5 to-transparent' : 'bg-gradient-to-b from-gray-100 to-transparent'} rounded-lg p-8`}
          >
            <h2 className="text-2xl font-semibold mb-6">Join Our Journey</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto`}>
              At SIAMTECH, we're just getting started. As we continue to grow and expand our offerings, 
              we invite you to join us on this exciting journey. Whether you're looking for premium audio 
              equipment, innovative tech gadgets, or reliable electronics, we're here to exceed your expectations.
            </p>
            <button className={`px-8 py-3 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-md transition-colors`}>
              {t("get_started")}
            </button>
          </motion.div>
        </div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default About;
