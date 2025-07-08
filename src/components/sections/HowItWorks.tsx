import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";

const steps = [
  {
    icon: "💳",
    title: "Select Your Cards",
    description: "Simply choose the credit cards you own from our comprehensive list. No sensitive information required.",
  },
  {
    icon: "📊",
    title: "Unified Dashboard",
    description: "See all your credit card perks in one place. Monthly, quarterly, and annual benefits tracked automatically.",
  },
  {
    icon: "🔔",
    title: "AI-Powered Reminders",
    description: "Our AI tracks your card's built-in annual benefits and sends you intelligent, timely notifications so you never miss a perk.",
  },
  {
    icon: "🎁",
    title: "Redeem With a Tap",
    description: "Follow simple deep-links that take you directly to the partner app or website to easily redeem your benefits.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-[720px] mx-auto mb-16"
        >
          <Text variant="h2" as="h2" className="mb-6">
            Getting Started is Easy
          </Text>
          <Text variant="subtitle" as="p">
            In just a few simple steps, you can start unlocking the full potential of your credit card benefits.
          </Text>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1 + Math.random() * 2,
                }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
              </motion.div>
              <Text variant="h4" as="h3" className="mb-3">
                {step.title}
              </Text>
              <Text variant="body" className="text-gray-600">
                {step.description}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 