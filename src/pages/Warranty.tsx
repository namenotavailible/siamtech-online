
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { FeatureSteps } from "@/components/ui/feature-section";
import { toast } from "sonner";

const features = [
  {
    step: "Step 1",
    title: "Create an Account",
    content: "Sign up for a SIAMTECH account to access warranty registration.",
    image: "/placeholder.svg"
  },
  {
    step: "Step 2",
    title: "Register Your Product",
    content: "Enter your product details and proof of purchase information.",
    image: "/placeholder.svg"
  },
  {
    step: "Step 3",
    title: "Activate Warranty",
    content: "Complete the registration to activate your 1-year warranty coverage.",
    image: "/placeholder.svg"
  }
];

const Warranty = () => {
  const navigate = useNavigate();

  const handleActivateWarranty = () => {
    if (!auth.currentUser) {
      toast.error("Please sign in to activate your warranty");
      return;
    }
    // We'll implement the warranty registration form in the next step
    toast.info("Warranty registration coming soon!");
  };

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
              At SIAMTECH, we stand behind the quality of our products. All our equipment comes with a 1-year standard warranty that covers manufacturing defects and malfunctions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Coverage Details</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>All Products: 1-year comprehensive warranty</li>
              <li>Coverage includes manufacturing defects and malfunctions</li>
              <li>Free repair or replacement of defective parts</li>
              <li>Technical support throughout the warranty period</li>
            </ul>
          </section>

          <section>
            <FeatureSteps 
              features={features}
              title="How to Activate Your Warranty"
              autoPlayInterval={4000}
              className="bg-gray-900/50 rounded-lg backdrop-blur-sm"
            />
          </section>

          <section className="mt-8 p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Activate Your Warranty</h2>
            <p className="text-gray-300 mb-4">
              Ready to activate your warranty? Sign in to your account and register your product to get started.
            </p>
            <Button
              onClick={handleActivateWarranty}
              className="bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Activate Warranty
            </Button>
          </section>
        </motion.div>
      </main>

      <Footerdemo />
    </div>
  );
};

export default Warranty;
