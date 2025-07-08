import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { ScrollReveal } from "../ui/ScrollReveal";

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
  const firstHalf = PARTNER_LOGOS.slice(0, Math.ceil(PARTNER_LOGOS.length / 2));
  const secondHalf = PARTNER_LOGOS.slice(Math.ceil(PARTNER_LOGOS.length / 2));

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
        <div className="flex gap-8 animate-scroll">
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
                  className="w-16 h-16 object-contain transition-all duration-300 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Mobile: Independent Swipeable Rows */}
      <div className="md:hidden flex flex-col gap-8">
        {/* First Row */}
        <div className="relative w-full overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max px-4">
              {firstHalf.map((logo) => (
                <motion.div
                  key={logo.name}
                  className="flex-none w-20 h-20 relative group"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={logo.svg}
                      alt={logo.name}
                      className="w-12 h-12 object-contain transition-all duration-300 grayscale group-hover:grayscale-0 group-active:grayscale-0 opacity-60 group-hover:opacity-100 group-active:opacity-100"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Second Row */}
        <div className="relative w-full overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max px-4">
              {secondHalf.map((logo) => (
                <motion.div
                  key={logo.name}
                  className="flex-none w-20 h-20 relative group"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={logo.svg}
                      alt={logo.name}
                      className="w-12 h-12 object-contain transition-all duration-300 grayscale group-hover:grayscale-0 group-active:grayscale-0 opacity-60 group-hover:opacity-100 group-active:opacity-100"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
} 