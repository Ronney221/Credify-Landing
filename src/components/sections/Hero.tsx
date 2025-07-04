import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <img 
            src="/assets/logo/icon.png" 
            alt="Credify" 
            className="h-32 w-32 md:h-48 md:w-48 mx-auto mb-8"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Stop leaving money on the table.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Credify is the ultimate app for tracking, managing, and maximizing your credit-card benefits, 
          ensuring you get every dollar of value from your annual fees.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
} 