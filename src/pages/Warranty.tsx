
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";

const Warranty = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold">Warranty Information</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Warranty Policy</h2>
            <p className="text-gray-300">
              At SIAMTECH, we stand behind the quality of our products. All our equipment comes with a standard warranty that covers manufacturing defects and malfunctions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Coverage Period</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Microphones: 1 year warranty</li>
              <li>Gaming Accessories: 2 years warranty</li>
              <li>Audio Equipment: 1 year warranty</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Claim</h2>
            <p className="text-gray-300">
              To claim your warranty, please contact our support team with your proof of purchase and product details. We'll guide you through the process and ensure your equipment gets the care it needs.
            </p>
          </section>

          <section className="mt-8 p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <p className="text-gray-300">
              Need help with a warranty claim? Our support team is ready to assist you.
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
              Contact Support
            </button>
          </section>
        </motion.div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default Warranty;
