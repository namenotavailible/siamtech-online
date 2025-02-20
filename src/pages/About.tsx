
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Building2, Users, Trophy, Target, Clock, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">About SIAMTECH</h1>
            <p className="text-gray-400">Pioneering Audio Innovation Since 2010</p>
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
                Our Story
              </h2>
              <p className="text-gray-300 leading-relaxed">
                From our humble beginnings in Bangkok, SIAMTECH has evolved into a leading provider of 
                professional audio equipment and accessories. What started as a small shop in the heart 
                of Thailand has grown into an international brand trusted by audio professionals, 
                content creators, and enthusiasts worldwide.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6" />
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to democratize access to professional-grade audio equipment. We believe 
                that quality sound shouldn't be a luxury, but a standard. Through innovative products 
                and exceptional service, we're making professional audio accessible to everyone who 
                shares our passion for perfect sound.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 rounded-lg p-8 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              Company Milestones
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">13+ Years</h3>
                <p className="text-gray-400">Of industry experience and innovation</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">50,000+</h3>
                <p className="text-gray-400">Satisfied customers worldwide</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">30+ Countries</h3>
                <p className="text-gray-400">Global presence and distribution</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-b from-white/5 to-transparent rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Join Our Journey</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a professional audio engineer, a content creator, or simply passionate 
              about quality sound, we invite you to be part of our story. Let's create the future 
              of audio together.
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default About;
