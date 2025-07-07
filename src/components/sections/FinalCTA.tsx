import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { WaitlistCTA } from "../ui/WaitlistCTA";
import { fadeIn } from "../../lib/animations";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 text-center max-w-[720px]"
      >
        <Text variant="h2" as="h2" className="mb-6">
          Ready to Unlock Your Card's Full Potential?
        </Text>
        <Text variant="subtitle" as="p" className="mb-8">
          Stop leaving money on the table. Join the beta and start maximizing your credit card rewards today.
        </Text>
        <div className="max-w-md mx-auto">
          <WaitlistCTA variant="primary" />
        </div>
      </motion.div>
    </section>
  );
} 