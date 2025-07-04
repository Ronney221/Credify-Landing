import { motion, useScroll, useTransform } from "framer-motion";
import { CreditCard, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Unified Dashboard",
    description: "See all your credit card perks in one place. Monthly, quarterly, and annual benefits tracked automatically.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and reminders. Never miss a benefit with our intelligent tracking system.",
  },
  {
    icon: Zap,
    title: "Quick Redemption",
    description: "One-tap access to your benefits. Instantly redeem perks through our deep-linked merchant integrations.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function Features() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.8, 0.8, 1]);

  return (
    <div className="container px-4 mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        >
          Powerful yet simple
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Stop tracking benefits manually. Let Credify do the heavy lifting while you enjoy the perks.
        </motion.p>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ opacity, scale }}
        className="grid md:grid-cols-3 gap-12"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand/5 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>

              {/* Subtle hover effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
} 