import { motion } from "framer-motion";
import { BlurImage } from "./ui/BlurImage";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlurImage
              src="/assets/logo/logo_text.png"
              alt="Credify"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#benefits" className="text-sm text-gray-600 hover:text-gray-900">Benefits</a>
            <a href="#cards" className="text-sm text-gray-600 hover:text-gray-900">Cards</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
          </nav>
        </div>
      </div>
    </header>
  );
} 