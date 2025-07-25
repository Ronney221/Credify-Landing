import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { BlurImage } from "../ui/BlurImage";
import { Text } from "../ui/Text";
import { fadeIn, fadeInUp, scaleIn, transition } from "../../lib/animations";
import { SimpleWaitlistDialog } from "../ui/SimpleWaitlistDialog";
import { ROICalculatorDialog } from "../ui/ROICalculatorDialog";

// Notification messages positioned around the phone mockup
const notificationMessages = [
  // Left side notifications
  {
    id: 1,
    message: "Wanderlust loading... ✈️ Your Travel Credit is waiting to be used on flights, hotels, or more. Don't let it fly away!",
    position: { side: 'left', top: '10%' },
    screenIndex: 0
  },
  {
    id: 2,
    message: "Sushi, tacos, or boba? 🍽️ Your DoorDash restaurant credit is getting cold. Order something delicious tonight!",
    position: { side: 'left', top: '40%' },
    screenIndex: 1
  },
  {
    id: 3,
    message: "Vacay mode: activated! ☀️ Your Hilton Resort Credit is ready for you. Book that poolside cabana!",
    position: { side: 'left', top: '70%' },
    screenIndex: 2
  },
  // Right side notifications
  {
    id: 4,
    message: "Your monthly Dunkin' credit is here to make your day sweeter. You literally can't say no. 🍩",
    position: { side: 'right', top: '15%' },
    screenIndex: 0
  },
  {
    id: 5,
    message: "Slay your workout! 🚴‍♀️ Your Peloton Membership Credit is expiring. Clip in and feel the burn!",
    position: { side: 'right', top: '45%' },
    screenIndex: 1
  },
  {
    id: 6,
    message: "Fueling your boba cravings or a late-night snack run. 🚕 Your Uber Cash is about to vanish. Use it before it's gone!",
    position: { side: 'right', top: '75%' },
    screenIndex: 2
  }
];

// Phone screenshot data
const phoneScreenshots = [
  {
    src: "/assets/screenshots/hero-1.jfif",
    alt: "Credify Main Dashboard"
  },
  {
    src: "/assets/screenshots/hero-2.jfif", 
    alt: "Credify Card Benefits"
  },
  {
    src: "/assets/screenshots/hero-3.jfif",
    alt: "Credify AI Assistant"
  }
];

// Floating Notification Component
const FloatingNotification = memo(({ notification, isHighlighted, currentScreenIndex }: { 
  notification: typeof notificationMessages[0], 
  isHighlighted: boolean,
  currentScreenIndex: number
}) => {
  const getPositioning = () => {
    if (notification.position.side === 'left') {
      return {
        right: '180px', // Position to the left of phone (phone width ~320px, so 160px from center + 20px gap)
        top: notification.position.top
      };
    } else {
      return {
        left: '180px', // Position to the right of phone
        top: notification.position.top
      };
    }
  };

  return (
    <motion.div
      className="absolute z-0 hidden lg:block"
      style={getPositioning()}
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isHighlighted ? 1 : 0.3,
        scale: isHighlighted ? 1 : 0.95,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div className={`max-w-[280px] rounded-2xl p-4 shadow-xl transition-all duration-300 ${
        isHighlighted 
          ? 'bg-white/95 backdrop-blur-sm border border-gray-200' 
          : 'bg-gray-100/50 backdrop-blur-sm border border-gray-100 grayscale'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isHighlighted 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : 'bg-gray-400'
          }`}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Text variant="tiny" className={`leading-relaxed transition-all duration-300 ${
              isHighlighted ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {notification.message}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

FloatingNotification.displayName = 'FloatingNotification';

function Hero2Component() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isROICalculatorOpen, setIsROICalculatorOpen] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isPhoneFixed, setIsPhoneFixed] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const topTriggerRef = useRef<HTMLDivElement>(null);
  const bottomTriggerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to screenshot index
  const screenIndex = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 2]);

  // Update current screen based on scroll
  useEffect(() => {
    const unsubscribe = screenIndex.onChange((latest) => {
      const newIndex = Math.round(latest);
      if (newIndex !== currentScreenIndex && newIndex >= 0 && newIndex < phoneScreenshots.length) {
        setCurrentScreenIndex(newIndex);
      }
    });
    return unsubscribe;
  }, [screenIndex, currentScreenIndex]);

  // Use scroll position to determine phone fixed state
  useEffect(() => {
    const handleScroll = () => {
      const topTrigger = topTriggerRef.current;
      const bottomTrigger = bottomTriggerRef.current;
      
      if (!topTrigger || !bottomTrigger) return;

      const topTriggerRect = topTrigger.getBoundingClientRect();
      const bottomTriggerRect = bottomTrigger.getBoundingClientRect();
      
      // Phone should be fixed when:
      // - Top trigger has scrolled past the top of viewport (topTriggerRect.top < 0)
      // - Bottom trigger hasn't reached the top of viewport (bottomTriggerRect.top > 0)
      const shouldBeFixed = topTriggerRect.top < 0 && bottomTriggerRect.top > 0;
      
      setIsPhoneFixed(shouldBeFixed);
    };

    // Check on mount
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Memoize event handlers
  const handleOpenWaitlist = useCallback(() => setIsWaitlistOpen(true), []);
  const handleCloseWaitlist = useCallback(() => setIsWaitlistOpen(false), []);
  const handleOpenROICalculator = useCallback(() => setIsROICalculatorOpen(true), []);
  const handleCloseROICalculator = useCallback(() => setIsROICalculatorOpen(false), []);

  return (
    <section ref={containerRef} id="hero2" className="relative min-h-[200vh] overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      
      {/* Top Content Section */}
      <div className="relative z-10 container px-4 mx-auto pt-20 pb-8">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={transition}
          >
            <Text 
              variant="h1" 
              as="h1" 
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight"
            >
              Your ticket to stress-free{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                credit card benefits
              </span>
            </Text>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.1 }}
          >
            <Text variant="subtitle" className="mb-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The only app that tells you everything about your credit card perks. Get real-time updates, the smartest alerts, and benefit predictions so you never miss expiring credits again.
            </Text>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🍎</span>
              </div>
              <span className="text-sm font-medium text-gray-700">App Store Winner</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">⭐</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Featured App</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top Trigger - Phone starts being fixed when this scrolls out of view */}
      <div ref={topTriggerRef} className="h-1 w-full"></div>

      {/* Phone Mockup with Floating Notifications - Always Present */}
      {isPhoneFixed ? (
        // Fixed positioning when in lock zone
        <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
          {/* Floating Notifications positioned around phone */}
          <div className="absolute inset-0 flex items-center justify-center">
            {notificationMessages.map((notification) => (
              <FloatingNotification
                key={notification.id}
                notification={notification}
                isHighlighted={notification.screenIndex === currentScreenIndex}
                currentScreenIndex={currentScreenIndex}
              />
            ))}
          </div>

          {/* Central Phone Mockup */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <BlurImage
                src={phoneScreenshots[currentScreenIndex].src}
                alt={phoneScreenshots[currentScreenIndex].alt}
                width={320}
                height={640}
                className="rounded-[32px] shadow-2xl border-4 border-gray-800"
              />
              {/* Phone overlay for depth */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      ) : (
        // Normal positioning when not in lock zone
        <div className="relative flex items-center justify-center min-h-[100vh] py-20">
          {/* Floating Notifications positioned around phone */}
          <div className="absolute inset-0 flex items-center justify-center">
            {notificationMessages.map((notification) => (
              <FloatingNotification
                key={notification.id}
                notification={notification}
                isHighlighted={notification.screenIndex === currentScreenIndex}
                currentScreenIndex={currentScreenIndex}
              />
            ))}
          </div>

          {/* Central Phone Mockup */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <BlurImage
                src={phoneScreenshots[currentScreenIndex].src}
                alt={phoneScreenshots[currentScreenIndex].alt}
                width={320}
                height={640}
                className="rounded-[32px] shadow-2xl border-4 border-gray-800"
              />
              {/* Phone overlay for depth */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Spacer to allow scrolling - only when phone is fixed */}
      {isPhoneFixed && <div className="h-[150vh]"></div>}

      {/* Bottom Trigger - Phone stops being fixed when this comes into view */}
      <div ref={bottomTriggerRef} className="h-1 w-full"></div>

      {/* Bottom CTA Section - TEMPORARILY COMMENTED OUT */}
      {/* 
      <div className="relative z-20 bg-white container px-4 mx-auto pb-20 pt-10">
        <div className="max-w-[400px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.3 }}
            className="flex flex-col gap-4 justify-center"
          >
            <motion.a
              href="https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-8 py-4 bg-black text-white rounded-2xl hover:bg-black/90 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              <div className="text-center">
                <Text variant="body" as="div" className="font-bold text-lg">Download for iOS</Text>
                <Text variant="tiny" as="div" className="opacity-90">Start maximizing your benefits today</Text>
              </div>
            </motion.a>

            <motion.button
              onClick={handleOpenWaitlist}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200"
            >
              <Text variant="body" className="font-medium">Join Android Beta Waitlist</Text>
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
              </svg>
              <span>Always free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 1Z"/>
              </svg>
              <span>Bank-level security</span>
            </div>
          </motion.div>
        </div>
      </div>
      */}

      {/* Dialogs */}
      <SimpleWaitlistDialog
        isOpen={isWaitlistOpen}
        onClose={handleCloseWaitlist}
        title="Join the Android Beta!"
        description="Be among the first to get Credify on Android and start maximizing your card benefits."
      />
      
      <ROICalculatorDialog
        isOpen={isROICalculatorOpen}
        onClose={handleCloseROICalculator}
      />
    </section>
  );
}

export const Hero2 = memo(Hero2Component);