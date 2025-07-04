import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[300px] md:w-[350px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={screenshots[currentIndex]}
              alt={`App Screenshot ${currentIndex + 1}`}
              className="w-full h-auto object-contain"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
} 