import { motion, useAnimation } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useEffect, useState } from "react";

const PARTNER_LOGOS = [
  {
    src: "/assets/partners/amex.svg",
    alt: "American Express",
    width: 120,
    height: 40,
  },
  {
    src: "/assets/partners/chase.svg",
    alt: "Chase",
    width: 100,
    height: 40,
  },
  {
    src: "/assets/partners/capital-one.svg",
    alt: "Capital One",
    width: 140,
    height: 40,
  },
  {
    src: "/assets/partners/citi.svg",
    alt: "Citi",
    width: 80,
    height: 40,
  },
  {
    src: "/assets/partners/bank-of-america.svg",
    alt: "Bank of America",
    width: 160,
    height: 40,
  },
  {
    src: "/assets/partners/us-bank.svg",
    alt: "U.S. Bank",
    width: 120,
    height: 40,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export function PartnerLogoWall() {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-8 lg:py-24">
      <div className="container px-4 mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4">
            Trusted by Leading Card Issuers
          </h2>
          <p className="text-sm md:text-base text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            We work with all major credit card companies to ensure you get the most value from your cards.
          </p>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 items-center"
        >
          {PARTNER_LOGOS.map((logo) => (
            <motion.div
              key={logo.alt}
              variants={item}
              whileHover={isMobile ? undefined : { scale: 1.05 }}
              className="relative aspect-[3/1]"
            >
              <Glass variant="light" className="absolute inset-0 rounded-lg md:rounded-xl">
                <div className="flex items-center justify-center w-full h-full p-3 md:p-4 lg:p-6">
                  <BlurImage
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </Glass>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 