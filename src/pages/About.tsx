
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Building2, Users, Trophy, Target, Clock, Globe } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

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
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} relative z-10`}>{t("about_subtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                {t("our_story")}
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {t("our_story_content")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6" />
                {t("our_mission")}
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {t("our_mission_content")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} rounded-lg p-8 mb-16`}
          >
            <h2 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              {t("company_milestones")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("experience")}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t("experience_description")}</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("customers")}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t("customers_description")}</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("countries")}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t("countries_description")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`text-center ${theme === 'dark' ? 'bg-gradient-to-b from-white/5 to-transparent' : 'bg-gradient-to-b from-gray-100 to-transparent'} rounded-lg p-8`}
          >
            <h2 className="text-2xl font-semibold mb-6">{t("join_journey")}</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto`}>
              {t("join_journey_description")}
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
