import { Vortex } from "@/components/ui/vortex";
import Navigation from "@/components/Navigation";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
const Index = () => {
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      
      <Vortex backgroundColor="black" rangeY={800} particleCount={500} baseHue={240} className="h-screen flex items-center justify-center px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} className="text-center max-w-4xl mx-auto">
          <span className="text-sm uppercase tracking-wider text-gray-400">WELCOME TO SIAMTECH ONLINE GROUP</span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight">Professional Equipment for Every Need</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Discover our premium selection of accessories and audio gear, crafted for professionals and enthusiasts alike.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-white/20 rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </Vortex>

      <FeaturedProducts />
      <Footerdemo />
    </div>;
};
export default Index;