import { motion, AnimatePresence, useInView } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import CountUp from "react-countup";
import confetti from "canvas-confetti";
import { useState, useRef, useEffect } from "react";
import { WaitlistCTA } from "../ui/WaitlistCTA";
import { Text } from "../ui/Text";
import { Gradient } from "../ui/Gradient";
import { fadeIn, fadeInUp, scaleIn, transition } from "../../lib/animations";

export function Hero() {
  const [showCounter, setShowCounter] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const animationRef = useRef(null);
  const isInView = useInView(animationRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setShowCounter(true);
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  const triggerConfetti = () => {
    // Multiple confetti bursts for a more celebratory effect
    const count = 3;
    const defaults = {
      origin: { y: 0.7 },
      spread: 50,
      startVelocity: 30,
      ticks: 200,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    }

    for (let i = 0; i < count; i++) {
      fire(0.25, {
        spread: 26,
        decay: 0.91,
        scalar: 0.8,
        startVelocity: 25,
      });

      fire(0.2, {
        spread: 60,
        decay: 0.92,
        scalar: 1.2,
        startVelocity: 45,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.85,
        scalar: 1.4,
        startVelocity: 35,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
    }
  };

  return (
    <section className="relative min-h-[100dvh] bg-gray-50 overflow-hidden">
      {/* Confetti Canvas Container */}
      <div className="absolute inset-0 pointer-events-none" id="confetti-canvas" />
      
      <div className="container px-4 mx-auto py-16 md:py-24 min-h-[100dvh] flex flex-col">
        <div className="max-w-[640px] mx-auto text-center flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={transition}
            >
              <Text variant="h1" as="h1" className="mb-6 text-4xl sm:text-5xl lg:text-6xl">
                The effortless way to claim your $1,564/yr in card benefits
              </Text>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.1 }}
            >
              <Text variant="subtitle" className="mb-8 text-lg sm:text-xl text-gray-600">
                Credify automatically tracks and helps you redeem every hidden benefit and credit from your cards, so you never miss a perk again.
              </Text>
            </motion.div>

            {/* Waitlist Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.2 }}
              className="mb-8"
            >
              <WaitlistCTA variant="secondary" />
            </motion.div>

            {/* App Store Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
              {/* iOS App Store */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <Text variant="tiny" as="div">Download on the</Text>
                  <Text variant="body" as="div" className="font-semibold">App Store</Text>
                </div>
              </motion.a>

              {/* Android Play Store (Coming Soon) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-500 rounded-xl"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <Text variant="tiny" as="div">Coming soon to</Text>
                  <Text variant="body" as="div" className="font-semibold">Google Play</Text>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Counter and App Preview */}
          <motion.div
            ref={animationRef}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.4 }}
            className="relative mt-16 md:mt-24 h-[640px] max-w-[360px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {showCounter && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={transition}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Gradient variant="brand" type="dark" className="w-full h-full rounded-[32px] shadow-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                        $<CountUp
                          start={0}
                          end={1564}
                          duration={2}
                          onEnd={() => {
                            triggerConfetti();
                            setTimeout(() => {
                              setShowCounter(false);
                              setShowApp(true);
                            }, 1500);
                          }}
                        />
                      </div>
                      <Text variant="subtitle" as="p" className="text-gray-300">
                        Annual Value Unlocked
                      </Text>
                    </div>
                  </Gradient>
                </motion.div>
              )}

              {showApp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={transition}
                  className="absolute inset-0"
                >
                  <BlurImage
                    src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png"
                    alt="Credify ROI Tracking Interface"
                    width={360}
                    height={640}
                    className="rounded-[32px] shadow-2xl w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 