
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";

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
            <p className="text-gray-400">Empowering professionals with premium equipment since 2010</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                Founded with a vision to provide professionals with the highest quality equipment, 
                SIAMTECH has grown to become a trusted name in the industry. Our journey began 
                with a simple mission: to deliver exceptional products that enhance the capabilities 
                of our customers.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                We strive to maintain the highest standards in product quality and customer service. 
                Our commitment to excellence drives us to continuously innovate and expand our 
                offerings, ensuring that our clients have access to the best equipment available.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 rounded-lg p-8 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose SIAMTECH?</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-gray-400">Premium products carefully selected for professionals</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-400">Dedicated team of industry professionals</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-400">Serving customers worldwide with fast shipping</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              We'd love to hear from you. Contact us to learn more about our products and services.
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default About;
