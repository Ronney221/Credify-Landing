import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Text } from "../ui/Text";
import { ScrollReveal } from "../ui/ScrollReveal";
import { cn } from "../../lib/utils";

interface PartnerLogo {
  name: string;
  svg: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Uber", svg: "/assets/partner_svg/uber.svg" },
  { name: "Uber Eats", svg: "/assets/partner_svg/ubereats.svg" },
  { name: "New York Times", svg: "/assets/partner_svg/newyorktimes.svg" },
  { name: "Dunkin", svg: "/assets/partner_svg/dunkin.svg" },
  { name: "DoorDash", svg: "/assets/partner_svg/doordash.svg" },
  { name: "Instacart", svg: "/assets/partner_svg/instacart.svg" },
  { name: "Resy", svg: "/assets/partner_svg/resy.svg" },
  { name: "Walmart", svg: "/assets/partner_svg/walmart.svg" },
  { name: "Lyft", svg: "/assets/partner_svg/lyft.svg" },
  { name: "Saks Fifth Avenue", svg: "/assets/partner_svg/saks-fifth-avenue.svg" },
  { name: "Equinox", svg: "/assets/partner_svg/equinox-fitness-clubs-seeklogo.svg" },
  { name: "Wall Street Journal", svg: "/assets/partner_svg/wall-street-journal.svg" },
  { name: "Chase", svg: "/assets/partner_svg/chase.svg" },
  { name: "American Express", svg: "/assets/partner_svg/americanexpress.svg" },
  { name: "Marriott", svg: "/assets/partner_svg/marriott.svg" },
  { name: "Hilton", svg: "/assets/partner_svg/hilton.svg" },
  { name: "Apple TV", svg: "/assets/partner_svg/appletv.svg" },
  { name: "Apple Music", svg: "/assets/partner_svg/applemusic.svg" },
  { name: "Peloton", svg: "/assets/partner_svg/peloton.svg" },
  { name: "StubHub", svg: "/assets/partner_svg/stubhub.svg" },
  { name: "Delta", svg: "/assets/partner_svg/delta.svg" },
  { name: "Netflix", svg: "/assets/partner_svg/netflix.svg" },
  { name: "CLEAR", svg: "/assets/partner_svg/clear.svg" },
  { name: "Capital One", svg: "/assets/partner_svg/capital_one.svg" },
  { name: "Grubhub", svg: "/assets/partner_svg/grubhub.svg" },
  { name: "OpenTable", svg: "/assets/partner_svg/opentable.svg" }
];

export function PartnerLogos() {
  const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const totalLogos = PARTNER_LOGOS.length;
    // Ensure at least 1 in 4 logos are highlighted
    const numToHighlight = Math.ceil(totalLogos / 4);

    // Create an array of all indices [0, 1, ..., n-1]
    const allIndices = Array.from(Array(totalLogos).keys());

    // Shuffle the indices using Fisher-Yates algorithm for robust randomization
    for (let i = allIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
    }

    // Take the first `numToHighlight` indices from the shuffled array
    const highlighted = new Set(allIndices.slice(0, numToHighlight));

    setHighlightedIndices(highlighted);
  }, []);

  return (
    <section className="py-12 lg:py-24 bg-white">
      <div className="container mx-auto">
        <ScrollReveal>
          <Text variant="h2" as="h2" className="text-center mb-4 px-4">
            Track Perks From Your Favorite Services
          </Text>
          <Text variant="subtitle" className="text-center mb-12 max-w-2xl mx-auto px-4">
            From dining to travel, we've got you covered with seamless benefit tracking across all major brands.
          </Text>
        </ScrollReveal>
      </div>

      {/* Desktop: Infinite Scroll */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div className="flex gap-12 animate-scroll">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              className="flex-none w-24 h-24 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logo.svg}
                  alt={logo.name}
                  className={cn(
                    "w-16 h-16 object-contain transition-all duration-300 opacity-60 group-hover:opacity-100 group-active:opacity-100 group-hover:grayscale-0 group-active:grayscale-0",
                    highlightedIndices.has(index % PARTNER_LOGOS.length)
                      ? "grayscale-0"
                      : "grayscale"
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Mobile: A Single, Correctly Clipped Scrollable Row */}
      <div className="md:hidden">
        <div
          className="relative w-full overflow-x-auto hide-scrollbar"
          style={{
            // The mask property is a more direct way to apply gradients as a mask
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex min-w-max items-center">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-none w-24 h-24 relative group mr-6" // Increased size & spacing
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={logo.svg}
                    alt={logo.name}
                    className={cn(
                      "w-16 h-16 object-contain transition-all duration-300 opacity-60 group-hover:opacity-100 group-active:opacity-100 group-hover:grayscale-0 group-active:grayscale-0",
                      highlightedIndices.has(index % PARTNER_LOGOS.length)
                        ? "grayscale-0"
                        : "grayscale"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 