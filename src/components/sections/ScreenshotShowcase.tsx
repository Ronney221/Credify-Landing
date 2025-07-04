import { motion, useScroll, useTransform } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useRef } from "react";

const screenshots = [
  {
    title: "Smart Advice",
    description: "Ask our AI which card to use",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png",
  },
  {
    title: "Benefit Tracking",
    description: "Never miss a reward or perk",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 2.png",
  },
  {
    title: "Monthly Insights",
    description: "Track your savings and ROI",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 3.png",
  },
];

export function ScreenshotShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="container px-4 mx-auto" ref={containerRef}>
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-brand mb-2"
        >
          Smart Interface
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Designed for Clarity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Track your benefits with our intuitive interface. Never miss a reward or perk again.
        </motion.p>
      </div>

      {/* Screenshots Display */}
      <motion.div 
        style={{ opacity }}
        className="relative flex justify-center items-center min-h-[600px]"
      >
        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute left-0 top-1/4 bg-white rounded-xl shadow-lg p-4 z-10"
        >
          <div className="text-sm font-medium">Active Benefits</div>
          <div className="text-2xl font-bold text-brand">12</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute right-0 bottom-1/4 bg-white rounded-xl shadow-lg p-4 z-10"
        >
          <div className="text-sm font-medium">Monthly Savings</div>
          <div className="text-2xl font-bold text-green-500">$324</div>
        </motion.div>

        {/* Screenshots */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.title}
                style={{ y: y }}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative aspect-[9/19.5] shadow-2xl rounded-3xl overflow-hidden bg-gray-100">
                  <BlurImage
                    src={screenshot.image}
                    alt={screenshot.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-lg font-semibold mb-1">{screenshot.title}</h3>
                  <p className="text-sm text-gray-600">{screenshot.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 