import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";
import { ScrollReveal } from "../ui/ScrollReveal";

const privacyFeatures = [
  {
    icon: "🔒",
    title: "No Bank Login Required",
    description: "Simply select your cards from a list. We will never ask for your bank credentials or connect to your financial accounts.",
  },
  {
    icon: "✍️",
    title: "You're in Control",
    description: "You manually track your redemptions. Your financial data remains yours and yours alone.",
  },
  {
    icon: "☁️",
    title: "Always Up-to-Date",
    description: "We provide the latest, most accurate perk information for all supported cards, so you always know what benefits are available.",
  },
];

export function PrivacyFirst() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Text variant="h2" as="h2" className="mb-4">
              Your Privacy-First Command Center
            </Text>
            <Text variant="subtitle" as="p">
              We believe in putting you in control. Credify is designed from the ground up to maximize your benefits without ever compromising your sensitive information.
            </Text>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                <div className="text-5xl mb-4">{feature.icon}</div>
              </motion.div>
              <Text variant="h4" as="h3" className="mb-3">
                {feature.title}
              </Text>
              <Text variant="body" as="p" className="text-gray-600">
                {feature.description}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 