import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BlurImage } from "../ui/BlurImage";
import { ArrowRight, Check } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for the phone
  const phoneY = useTransform(scrollY, [0, 500], [0, 50]);
  const phoneRotate = useTransform(scrollY, [0, 500], [0, -5]);
  
  // Floating elements animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-accent rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -left-1/4 bottom-1/4 w-1/2 h-1/2 bg-brand rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left relative z-10"
          >
            {/* Pre-headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 text-brand text-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
                <span>Now in private beta</span>
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Stop leaving money
              <span className="block text-brand">on the table</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Track, manage, and maximize your credit card benefits with AI-powered insights. Never miss a perk or reward again.
            </p>

            {/* Waitlist Form */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {!isSubmitted ? (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow text-lg py-6"
                  />
                  <Button 
                    size="lg" 
                    className="bg-brand hover:bg-brand/90 text-lg px-8"
                    onClick={() => setIsSubmitted(true)}
                  >
                    Join Waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              ) : (
                <div className="w-full p-4 bg-green-50 text-green-600 rounded-lg flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>You're on the list! We'll be in touch soon.</span>
                </div>
              )}
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="mt-12 grid grid-cols-3 gap-6 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-semibold text-2xl">1000+</span>
                <span>Early Users</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-semibold text-2xl">$2.4M+</span>
                <span>Benefits Tracked</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - App Preview */}
          <motion.div
            style={{ y: phoneY, rotate: phoneRotate }}
            className="relative lg:ml-12"
          >
            <div className="relative aspect-[9/19.5] max-w-xs mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BlurImage
                  src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png"
                  alt="Credify App Interface"
                  width={390}
                  height={844}
                  className="rounded-[3rem] shadow-2xl"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -right-12 top-1/4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]"
              >
                <div className="text-sm font-medium">Annual Savings</div>
                <div className="text-2xl font-bold text-green-500">$1,247</div>
              </motion.div>

              <motion.div
                animate={floatingAnimation}
                transition={{ delay: 0.5 }}
                className="absolute -left-12 bottom-1/4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="text-sm font-medium">Active Benefits</div>
                <div className="text-2xl font-bold text-brand">12</div>
              </motion.div>

              {/* Additional Floating Element */}
              <motion.div
                animate={floatingAnimation}
                transition={{ delay: 1 }}
                className="absolute -right-8 bottom-1/3 bg-white rounded-xl shadow-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Benefit Alert</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 