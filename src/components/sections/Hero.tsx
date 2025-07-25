import { motion } from "framer-motion";
import { useState } from "react";
import { BlurImage } from "../ui/BlurImage";
import { Text } from "../ui/Text";
import { fadeIn, fadeInUp, scaleIn, transition } from "../../lib/animations";
import { SimpleWaitlistDialog } from "../ui/SimpleWaitlistDialog";
import { ROICalculatorDialog } from "../ui/ROICalculatorDialog";
import { FeedbackForm } from "../forms/FeedbackForm";

// Partner logos for the animated background with pre-calculated positions
const partnerLogos = [
  { src: "/assets/partner_svg/uber.svg", x: 25, y: 30 },
  { src: "/assets/partner_svg/doordash.svg", x: 70, y: 20 },
  { src: "/assets/partner_svg/netflix.svg", x: 60, y: 70 },
  { src: "/assets/partner_svg/peloton.svg", x: 15, y: 65 },
];

export function Hero() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isROICalculatorOpen, setIsROICalculatorOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* Subtle Partner Logos Background - Desktop only */}
      <div className="absolute inset-0 z-0 opacity-2 hidden lg:block">
        <div className="relative w-full h-full">
          {partnerLogos.map((logo, index) => (
            <motion.img
              key={logo.src}
              src={logo.src}
              alt=""
              className="absolute w-12 h-12 opacity-30"
              initial={{ 
                x: `${logo.x}%`, 
                y: `${logo.y}%` 
              }}
              animate={{ 
                x: `${logo.x + (index % 2 === 0 ? 10 : -10)}%`,
                y: `${logo.y + (index % 2 === 0 ? -10 : 10)}%`,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 5
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Screenshots for Desktop */}
      <div className="absolute inset-0 z-0 hidden lg:flex items-center justify-center">
        <div className="flex gap-8 max-w-5xl mx-auto items-center opacity-80">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.4 }}
            className="relative"
            whileHover={{ scale: 1.02, rotate: "-2deg" }}
          >
            <BlurImage
              src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png"
              alt="Credify ROI Tracking Interface"
              width={280}
              height={498}
              className="rounded-[24px] shadow-2xl border border-gray-200"
            />
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.5 }}
            className="relative"
            whileHover={{ scale: 1.02, rotate: "2deg" }}
          >
            <BlurImage
              src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 2.png"
              alt="Credify Card Selection Interface"
              width={280}
              height={498}
              className="rounded-[24px] shadow-2xl border border-gray-200"
            />
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.6 }}
            className="relative hidden xl:block"
            whileHover={{ scale: 1.02, rotate: "-1deg" }}
          >
            <BlurImage
              src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 3.png"
              alt="Credify AI Assistant Interface"
              width={280}
              height={498}
              className="rounded-[24px] shadow-2xl border border-gray-200"
            />
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container min-h-[100dvh] px-4 mx-auto flex flex-col justify-center py-20 md:py-32">
        <div className="max-w-[720px] mx-auto text-center">
          {/* Text Content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={transition}
          >
            <Text variant="h1" as="h1" className="mb-6 text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Turn Your $695 Annual Fee Into <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">$1,200+ in Guaranteed Benefits</span>
            </Text>
            {/* Exclusivity Badge */}
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6">
              <span className="text-green-800 font-medium text-sm">
                🚀 Now accepting founding members - Limited early access
              </span>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.1 }}
          >
            <Text variant="subtitle" className="mb-6 text-lg sm:text-xl text-gray-600">
              Credify tracks your premium card perks and sends smart reminders so you never miss expiring benefits. From Uber credits to airline fees, we help you maximize every dollar of your annual fee.
            </Text>
            {/* App Store Launch Success Message */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.2 }}
              className="mb-8 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg inline-block"
            >
              <Text variant="body" className="text-blue-700 font-medium">
                🎉 Now available on the App Store! Download Credify and start maximizing your card benefits today.
              </Text>
            </motion.div>
          </motion.div>

          {/* Enhanced Mobile Screenshots */}
          <div className="lg:hidden flex flex-row gap-4 mb-8 justify-center items-center max-w-md mx-auto md:max-w-lg">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.4 }}
              className="relative"
              whileHover={{ scale: 1.02, rotate: "-1deg" }}
            >
              <BlurImage
                src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png"
                alt="Credify ROI Tracking Interface"
                width={160}
                height={284}
                className="rounded-[18px] shadow-xl border border-gray-200 w-full h-auto max-w-[160px] md:max-w-[200px]"
              />
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.5 }}
              className="relative"
              whileHover={{ scale: 1.02, rotate: "1deg" }}
            >
              <BlurImage
                src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 2.png"
                alt="Credify Card Selection Interface"
                width={160}
                height={284}
                className="rounded-[18px] shadow-xl border border-gray-200 w-full h-auto max-w-[160px] md:max-w-[200px]"
              />
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.6 }}
              className="relative hidden md:block"
              whileHover={{ scale: 1.02, rotate: "-0.5deg" }}
            >
              <BlurImage
                src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 3.png"
                alt="Credify AI Assistant Interface"
                width={160}
                height={284}
                className="rounded-[18px] shadow-xl border border-gray-200 w-full h-auto max-w-[200px]"
              />
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.3 }}
            className="flex flex-col gap-4 justify-center max-w-[400px] mx-auto"
          >
            {/* Primary CTA - App Store */}
            <motion.a
              href="https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div className="text-left">
                <Text variant="body" as="div" className="font-bold text-lg">Start Recovering My Benefits Now</Text>
                <Text variant="tiny" as="div" className="opacity-90">Available on iOS – Start saving today</Text>
              </div>
            </motion.a>
            {/* Secondary CTA - Android Waitlist */}
            <motion.button
              onClick={() => setIsWaitlistOpen(true)}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
              <Text variant="body" className="font-medium">Join the Beta - Android Coming Soon</Text>
            </motion.button>
            
            {/* Lead Magnet CTA - ROI Calculator */}
            <motion.button
              onClick={() => setIsROICalculatorOpen(true)}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
              <Text variant="body" className="font-medium">🧮 Get My Free ROI Calculator</Text>
            </motion.button>
            
            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.4 }}
              className="flex items-center justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Always free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M8 21H16C17.1046 21 18 20.1046 18 19V13C18 11.8954 17.1046 11 16 11H8C6.89543 11 6 11.8954 6 13V19C6 20.1046 6.89543 21 8 21ZM10 11V7C10 5.34315 11.3431 4 13 4C14.6569 4 16 5.34315 16 7V11H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Bank-level security</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simplified Waitlist Dialog */}
      <SimpleWaitlistDialog
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        title="Join the Beta - Android Coming Soon!"
        description="Be among the first to get Credify on Android and start maximizing your card benefits."
      />
      
      {/* ROI Calculator Dialog */}
      <ROICalculatorDialog
        isOpen={isROICalculatorOpen}
        onClose={() => setIsROICalculatorOpen(false)}
      />
    </section>
  );
} 