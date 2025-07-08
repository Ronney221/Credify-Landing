import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";
import { FloatingStats } from "../ui/FloatingStats";

const stats = [
  { value: "$1,498", label: "Avg. Annual Value Lost" },
  { value: "78%", label: "Users Missing Benefits" },
  { value: "14+", label: "Perks Per Card" },
  { value: "6", label: "Months Until Expiry" }
];

export function TheProblem() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[720px] mx-auto mb-16"
        >
          <Text variant="h2" as="h2" className="mb-6">
            You're Missing Out on Thousands
          </Text>
          <Text variant="subtitle" as="p">
            Premium cards come with amazing perks, but they're buried in fine print and complex terms. Most people leave hundreds, even thousands, on the table each year because they can't keep track of it all.
          </Text>
        </motion.div>

        <div className="relative">
          <FloatingStats stats={stats} />
        </div>
      </div>
    </section>
  );
} 