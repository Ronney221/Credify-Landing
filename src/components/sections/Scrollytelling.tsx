import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Text } from "../ui/Text";
import { BlurImage } from "../ui/BlurImage";
import { cn } from "@/lib/utils";

const scrollytellingData = [
  {
    title: "Maximize Your Value",
    description: "Credify's dashboard gives you a real-time view of your total rewards and return on investment, so you always know where you stand.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 5.png",
  },
  {
    title: "Claim Every Perk",
    description: "Get smart reminders for monthly, quarterly, and annual credits for things like dining, travel, and entertainment before they expire.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 6.png",
  },
  {
    title: "Smart, Actionable Advice",
    description: "Receive personalized recommendations on which card to use for your purchases to maximize your points and cash back.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 8.png",
  },
];

const FeatureItem = ({
  title,
  description,
  image,
  isReversed,
}: (typeof scrollytellingData)[0] & { isReversed: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="container mx-auto px-4 py-16 md:py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className={cn("text-center md:text-left", isReversed && "md:order-last")}>
          <Text variant="h2" as="h2" className="mb-6">{title}</Text>
          <Text variant="subtitle">{description}</Text>
        </div>
        <div className="flex justify-center">
          <div className="relative w-[250px] h-[500px] md:w-[300px] md:h-[600px] rounded-[32px] overflow-hidden">
            <motion.div style={{ y }}>
              <BlurImage
                src={image}
                alt={title}
                width={300}
                height={600}
                className="shadow-2xl w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Scrollytelling() {
  return (
    <section className="bg-white">
      {scrollytellingData.map((item, index) => (
        <FeatureItem key={item.title} {...item} isReversed={index % 2 !== 0} />
      ))}
    </section>
  );
} 