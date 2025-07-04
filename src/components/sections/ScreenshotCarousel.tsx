import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BlurImage } from "../ui/BlurImage";

const screenshots = [
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 2.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 3.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 4.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 5.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 6.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 7.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 8.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 9.png",
  "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 10.png",
];

export function ScreenshotCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--brand)_12%,transparent_12.5%,transparent_87%,var(--brand)_87.5%,var(--brand))] opacity-[0.025]" style={{ backgroundSize: '10px 10px' }} />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container px-4 mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand/5 text-brand text-sm font-medium">
              Smart Interface
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
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
        <div className="relative max-w-sm mx-auto">
          {/* Phone Frame */}
          <div className="relative aspect-[9/19.5] rounded-[3rem] border-8 border-gray-900 shadow-2xl bg-gray-900 overflow-hidden">
            {/* Screenshots */}
            <div className="absolute inset-0 bg-white">
              {screenshots.map((screenshot, index) => (
                <motion.div
                  key={screenshot}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    y: currentIndex === index ? 0 : 20,
                    scale: currentIndex === index ? 1 : 0.95,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <BlurImage
                    src={screenshot}
                    alt={`App Screenshot ${index + 1}`}
                    width={390}
                    height={844}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group p-1.5"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-white w-4"
                        : "bg-white/50 group-hover:bg-white/75"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-16 top-1/4 bg-white rounded-xl shadow-lg p-4"
          >
            <div className="text-sm font-medium">Active Benefits</div>
            <div className="text-2xl font-bold text-brand">12</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -right-16 bottom-1/4 bg-white rounded-xl shadow-lg p-4"
          >
            <div className="text-sm font-medium">Monthly Savings</div>
            <div className="text-2xl font-bold text-green-500">$324</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 