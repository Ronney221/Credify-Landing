import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";

const steps = [
  {
    icon: "🔗",
    title: "Securely Link Your Cards",
    description: "Connect your credit card accounts through our secure portal. We use bank-level encryption to protect your data.",
  },
  {
    icon: "🔔",
    title: "Get Smart Reminders",
    description: "Our AI analyzes your benefits and sends you timely notifications before perks or credits expire.",
  },
  {
    icon: "✅",
    title: "Redeem Your Perks",
    description: "Follow simple, one-tap links to activate offers and claim your rewards, ensuring you never miss out on value.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
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

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
              <div className="text-5xl mb-4">{step.icon}</div>
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