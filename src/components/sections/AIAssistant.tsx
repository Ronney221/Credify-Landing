import { motion } from "framer-motion";
import { Bot, Brain, History, TrendingUp } from "lucide-react";
import { ScreenshotCarousel } from "./ScreenshotCarousel";

const features = [
  {
    icon: Bot,
    title: "Conversational AI Chat",
    description: "Ask complex questions about your benefits, get personalized advice on which card to use, and receive spending insights.",
  },
  {
    icon: Brain,
    title: "Smart Perk Matching",
    description: "AI helps you understand and categorize your perks, making it easier to find and use the benefits that matter most.",
  },
  {
    icon: History,
    title: "6-Month History Analysis",
    description: "Track your redemption patterns with detailed analytics and visualize your usage over time.",
  },
  {
    icon: TrendingUp,
    title: "ROI Optimization",
    description: "Get AI-powered suggestions to maximize your return on investment for each card's annual fees.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.5,
    },
  },
};

export function AIAssistant() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">AI-Powered Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leverage the power of artificial intelligence to maximize your credit card benefits and make informed decisions.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 items-start p-4 rounded-lg bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="relative">
            <ScreenshotCarousel />
            
            {/* Decorative gradient circles */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
} 