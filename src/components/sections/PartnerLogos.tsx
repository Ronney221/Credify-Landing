import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { ScrollReveal } from "../ui/ScrollReveal";

interface PartnerLogo {
  name: string;
  svg: string;
  color?: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Uber", svg: "/assets/partner_svg/uber.svg", color: "#000000" },
  { name: "Uber Eats", svg: "/assets/partner_svg/ubereats.svg", color: "#06C167" },
  { name: "New York Times", svg: "/assets/partner_svg/newyorktimes.svg", color: "#000000" },
  { name: "Dunkin", svg: "/assets/partner_svg/dunkin.svg" },
  { name: "DoorDash", svg: "/assets/partner_svg/doordash.svg", color: "#FF3008" },
  { name: "Instacart", svg: "/assets/partner_svg/instacart.svg", color: "#43B02A" },
  { name: "Resy", svg: "/assets/partner_svg/resy.svg" },
  { name: "Walmart", svg: "/assets/partner_svg/walmart.svg", color: "#0071CE" },
  { name: "Lyft", svg: "/assets/partner_svg/lyft.svg", color: "#FF00BF" },
  { name: "Saks Fifth Avenue", svg: "/assets/partner_svg/saks-fifth-avenue.svg" },
  { name: "Equinox", svg: "/assets/partner_svg/equinox.svg" },
  { name: "Wall Street Journal", svg: "/assets/partner_svg/wall-street-journal.svg" },
  { name: "Chase", svg: "/assets/partner_svg/chase.svg" },
  { name: "American Express", svg: "/assets/partner_svg/americanexpress.svg", color: "#2E77BC" },
  { name: "Marriott", svg: "/assets/partner_svg/marriott.svg", color: "#A70023" },
  { name: "Hilton", svg: "/assets/partner_svg/hilton.svg", color: "#231F20" },
  { name: "Apple TV", svg: "/assets/partner_svg/appletv.svg", color: "#000000" },
  { name: "Apple Music", svg: "/assets/partner_svg/applemusic.svg", color: "#FA243C" },
  { name: "Peloton", svg: "/assets/partner_svg/peloton.svg", color: "#181A1D" },
  { name: "StubHub", svg: "/assets/partner_svg/stubhub.svg", color: "#003168" },
  { name: "Delta", svg: "/assets/partner_svg/delta.svg", color: "#003366" },
  { name: "Netflix", svg: "/assets/partner_svg/netflix.svg", color: "#E50914" },
  { name: "CLEAR", svg: "/assets/partner_svg/clear.svg" },
  { name: "Just Eat", svg: "/assets/partner_svg/justeat.svg" }
];

export function PartnerLogos() {
  return (
    <section className="py-12 lg:py-24 overflow-hidden bg-white">
      <div className="container mx-auto">
        <ScrollReveal>
          <Text variant="h2" as="h2" className="text-center mb-4 px-4">
            Track Perks From Your Favorite Services
          </Text>
          <Text variant="subtitle" className="text-center mb-12 max-w-2xl mx-auto px-4">
            From dining to travel, we've got you covered with seamless benefit tracking across all major brands.
          </Text>
        </ScrollReveal>

        {/* Desktop: Infinite Scroll */}
        <div className="hidden md:block relative">
          <div className="flex gap-8 animate-scroll" style={{ paddingLeft: "0" }}>
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
                    className="w-16 h-16 object-contain transition-all duration-300"
                    style={{
                      filter: "grayscale(1) brightness(0.7)",
                      WebkitFilter: "grayscale(1) brightness(0.7)",
                    }}
                  />
                  <img
                    src={logo.svg}
                    alt=""
                    className="w-16 h-16 object-contain transition-all duration-300 absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={logo.color ? { 
                      filter: "brightness(1)",
                      WebkitFilter: "brightness(1)"
                    } : {
                      filter: "brightness(0.2)",
                      WebkitFilter: "brightness(0.2)"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-white via-white to-transparent z-10" style={{ left: 0 }} />
          <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-white via-white to-transparent z-10" style={{ right: 0 }} />
        </div>

        {/* Mobile: Swipeable Rows */}
        <div className="md:hidden relative overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex flex-col gap-8 min-w-max px-4">
              {/* First Row */}
              <div className="flex gap-8">
                {PARTNER_LOGOS.slice(0, Math.ceil(PARTNER_LOGOS.length / 2)).map((logo) => (
                  <motion.div
                    key={logo.name}
                    className="flex-none w-20 h-20 relative group"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={logo.svg}
                        alt={logo.name}
                        className="w-12 h-12 object-contain transition-all duration-300"
                        style={{
                          filter: "grayscale(1) brightness(0.7)",
                          WebkitFilter: "grayscale(1) brightness(0.7)",
                        }}
                      />
                      <img
                        src={logo.svg}
                        alt=""
                        className="w-12 h-12 object-contain transition-all duration-300 absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100"
                        style={logo.color ? { 
                          filter: "brightness(1)",
                          WebkitFilter: "brightness(1)"
                        } : {
                          filter: "brightness(0.2)",
                          WebkitFilter: "brightness(0.2)"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Second Row */}
              <div className="flex gap-8">
                {PARTNER_LOGOS.slice(Math.ceil(PARTNER_LOGOS.length / 2)).map((logo) => (
                  <motion.div
                    key={logo.name}
                    className="flex-none w-20 h-20 relative group"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={logo.svg}
                        alt={logo.name}
                        className="w-12 h-12 object-contain transition-all duration-300"
                        style={{
                          filter: "grayscale(1) brightness(0.7)",
                          WebkitFilter: "grayscale(1) brightness(0.7)",
                        }}
                      />
                      <img
                        src={logo.svg}
                        alt=""
                        className="w-12 h-12 object-contain transition-all duration-300 absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100"
                        style={logo.color ? { 
                          filter: "brightness(1)",
                          WebkitFilter: "brightness(1)"
                        } : {
                          filter: "brightness(0.2)",
                          WebkitFilter: "brightness(0.2)"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-[60px] bg-gradient-to-r from-white via-white to-transparent z-10" style={{ left: 0 }} />
          <div className="absolute inset-y-0 right-0 w-[60px] bg-gradient-to-l from-white via-white to-transparent z-10" style={{ right: 0 }} />
        </div>
      </div>
    </section>
  );
} 