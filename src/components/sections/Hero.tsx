import { motion } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";

export function Hero() {
  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            Stop leaving money on the table.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            Credify is the ultimate app for tracking, managing, and maximizing your credit card benefits, ensuring you get every dollar of value from your annual fees.
          </motion.p>

          {/* Waitlist Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900"
            />
            <button
              className="px-8 py-3 rounded-lg bg-brand text-gray-900 font-medium hover:bg-brand/90 transition-colors shadow-lg"
            >
              Join Beta Test
            </button>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
            {/* iOS App Store */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors shadow-lg"
            >
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </motion.a>

            {/* Android Play Store (Coming Soon) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-500 rounded-lg shadow-lg"
            >
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs">Coming soon to</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - App Preview */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative flex justify-center items-center gap-2"
          >
            {/* Left Screenshot with Description */}
            <div className="relative">
              <BlurImage
                src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png"
                alt="Credify ROI Tracking Interface"
                width={280}
                height={560}
                className="rounded-3xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-36 top-1/3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[240px]"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Smart ROI Tracking</h3>
                <p className="text-sm text-gray-600">
                  Track your credit card value redemption and ensure you're getting more value than your annual fees.
                </p>
              </motion.div>
            </div>

            {/* Right Screenshot with Description */}
            <div className="relative">
              <BlurImage
                src="/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 2.png"
                alt="Credify Card Selection Interface"
                width={280}
                height={560}
                className="rounded-3xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -right-36 top-2/3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[240px]"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Easy Setup</h3>
                <p className="text-sm text-gray-600">
                  Simply select your cards - no bank login required. We'll handle the rest.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 