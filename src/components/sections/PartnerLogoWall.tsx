import { motion } from "framer-motion";
import { Text } from "../ui/Text";

const partners = [
  { name: "American Express", logo: "/assets/partners/amex.svg" },
  { name: "Bank of America", logo: "/assets/partners/bank-of-america.svg" },
  { name: "Capital One", logo: "/assets/partners/capital-one.svg" },
  { name: "Chase", logo: "/assets/partners/chase.svg" },
  { name: "Citi", logo: "/assets/partners/citi.svg" },
  { name: "U.S. Bank", logo: "/assets/partners/us-bank.svg" },
];

const duplicatedPartners = [...partners, ...partners];

export function PartnerLogoWall() {
  const scrollVariants = {
    animate: {
      x: "-100%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-12 bg-white/50">
      <div className="container mx-auto text-center">
        <Text variant="caption" as="p" className="mb-8 tracking-widest uppercase">
          Trusted by all major card issuers
        </Text>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            variants={scrollVariants}
            animate="animate"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                style={{ width: "160px" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/50 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
} 