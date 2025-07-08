import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";
import { cards } from "./CardData";
import { CardGrid } from "./CardGrid";
import { PerkList } from "./PerkList";

export function CardBenefits() {
  // Find the index of Amex Platinum or default to first card
  const defaultCardIndex = cards.findIndex(card => card.name === "American Express Platinum") || 0;
  const [selectedCardIndex, setSelectedCardIndex] = useState(defaultCardIndex);

  const calculateAnnualValue = (value: number, period: string) => {
    switch (period) {
      case "monthly":
        return value * 12;
      case "semi_annual":
        return value * 2;
      case "annual":
      default:
        return value;
    }
  };

  const currentCard = cards[selectedCardIndex];
  const totalAnnualValue = currentCard.benefits.reduce((acc, perk) => {
    return acc + calculateAnnualValue(perk.value, perk.period);
  }, 0);

  return (
    <section id="cards" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Text variant="h2" as="h2" className="mb-4">
            Maximize Your Card Benefits
          </Text>
          <Text variant="subtitle" className="max-w-3xl mx-auto">
            Track and optimize your credit card benefits with our smart reminders and insights. We turn complex perks into simple, actionable steps.
          </Text>
        </motion.div>

        <div className="mb-16">
          <CardGrid
            cards={cards}
            selectedCardIndex={selectedCardIndex}
            onCardSelect={setSelectedCardIndex}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="mb-8">
                <Text variant="h3" as="h3" className="mb-2">{currentCard.name}</Text>
                <Text variant="body" className="text-gray-600">
                  Annual Fee: ${currentCard.annualFee} | Est. Annual Value: <span className="font-bold text-green-600">${totalAnnualValue}</span>
                </Text>
              </div>

              <PerkList perks={currentCard.benefits} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 