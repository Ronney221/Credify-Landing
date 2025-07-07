import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { ScrollReveal, ScrollRevealList } from "../ui/ScrollReveal";
import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";

const CARD_LOGOS = [
    { src: "/assets/cards/amex_plat.avif", alt: "American Express Platinum Card" },
    { src: "/assets/cards/chase_sapphire_reserve.png", alt: "Chase Sapphire Reserve" },
    { src: "/assets/cards/venture_x.avif", alt: "Capital One Venture X" },
    { src: "/assets/cards/amex_gold.avif", alt: "American Express Gold Card" },
    { src: "/assets/cards/chase_sapphire_preferred.png", alt: "Chase Sapphire Preferred" },
    { src: "/assets/cards/boa_premium_rewards_elite.png", alt: "Bank of America Premium Rewards Elite" },
    { src: "/assets/cards/amex_green.avif", alt: "American Express Green Card" },
    { src: "/assets/cards/citi_prestige.jpeg", alt: "Citi Prestige Card" },
    { src: "/assets/cards/hilton_aspire.avif", alt: "Hilton Honors Aspire Card" },
    { src: "/assets/cards/marriott_bonvoy_brilliant.avif", alt: "Marriott Bonvoy Brilliant Card" },
    { src: "/assets/cards/delta_reserve.avif", alt: "Delta SkyMiles Reserve Card" },
    { src: "/assets/cards/blue_cash_preferred.avif", alt: "Blue Cash Preferred Card" },
    { src: "/assets/cards/boa_premium_rewards.png", alt: "Bank of America Premium Rewards" },
    { src: "/assets/cards/usb_altitude_reserve.png", alt: "US Bank Altitude Reserve" },
];

export function SocialProof() {
  return (
    <section className="py-12 lg:py-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <ScrollReveal>
          <Text variant="h2" as="h2" className="text-center mb-4">
            We Support All Major Premium Cards
          </Text>
          <Text variant="subtitle" className="text-center mb-12 max-w-2xl mx-auto">
            From travel rewards to cash back, we help you maximize the value of your premium credit cards.
          </Text>
        </ScrollReveal>

        <ScrollRevealList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {CARD_LOGOS.map((card, index) => (
            <motion.div
              key={card.alt}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[1.586/1] w-full"
            >
              <Glass variant="light" className="absolute inset-0 rounded-xl">
                <BlurImage
                  src={card.src}
                  alt={card.alt}
                  width={200}
                  height={126}
                  className="w-full h-full object-contain p-4"
                />
              </Glass>
            </motion.div>
          ))}
        </ScrollRevealList>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Text variant="caption" className="text-gray-500">
              And many more premium cards from American Express, Chase, Capital One, and other major issuers.
            </Text>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
} 