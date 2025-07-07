import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";

export function TheProblem() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center max-w-[720px]"
      >
        <Text variant="h2" as="h2" className="mb-6">
          You're Missing Out on Thousands
        </Text>
        <Text variant="subtitle" as="p">
          Premium cards come with amazing perks, but they're buried in fine print and complex terms. Most people leave hundreds, even thousands, on the table each year because they can't keep track of it all.
        </Text>
      </motion.div>
    </section>
  );
} 