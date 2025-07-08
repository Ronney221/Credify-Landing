import { motion, AnimatePresence } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useEffect, useState } from "react";
import { CreditCard as CardIcon, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from 'react';
import { Glass } from "../ui/Gradient";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";
import { CardRiverShowcase } from "./CardRiverShowcase";
import { cards, Card, Perk, CategoryIconType, categoryIcons } from "./CardData";

function PerkIcon({ category }: { category: CategoryIconType }) {
  const Icon = categoryIcons[category] || CardIcon;
  return <Icon className="w-5 h-5" />;
}

const benefitVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export function CardBenefits() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const formatValue = (value: number, period: string) => {
    switch (period) {
      case "monthly":
        return `$${value}/mo`;
      case "annual":
        return `$${value}/yr`;
      case "semi_annual":
        return `$${value} (2x/yr)`;
      default:
        return `$${value}`;
    }
  };

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

  const totalAnnualValue = cards[selectedCardIndex].benefits.reduce((acc, perk) => {
    return acc + calculateAnnualValue(perk.value, perk.period);
  }, 0);

  const handleNext = () => {
    setDirection("right");
    setSelectedCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setSelectedCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[selectedCardIndex];

  return (
    <section id="cards" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container px-0 md:px-4 mx-auto">
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

        <CardRiverShowcase />

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Card Carousel */}
            <div className="relative h-[250px] sm:h-[300px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedCardIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  custom={direction}
                  variants={{
                    enter: (direction) => ({
                      x: direction === 'right' ? 300 : -300,
                      opacity: 0,
                      scale: 0.8
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    },
                    exit: (direction) => ({
                      x: direction === 'right' ? -300 : 300,
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Glass variant="light" className="rounded-2xl p-4 w-full aspect-[1.586/1]">
                    <BlurImage
                      src={currentCard.image}
                      alt={currentCard.name}
                      width={400}
                      height={252}
                      className="w-full h-full object-cover"
                    />
                  </Glass>
                </motion.div>
              </AnimatePresence>
              <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right side: Benefits List */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCardIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                >
                  <Text variant="h3" as="h3" className="mb-2">{currentCard.name}</Text>
                  <Text variant="body" className="text-gray-600 mb-4">
                    Annual Fee: ${currentCard.annualFee} | Est. Annual Value: <span className="font-bold text-green-600">${totalAnnualValue}</span>
                  </Text>
                  <div className="space-y-4 max-h-[300px] min-h-[200px] overflow-y-auto pr-4">
                    {currentCard.benefits.length > 0 ? (
                      currentCard.benefits.map((perk, i) => (
                        <motion.div
                          key={perk.id}
                          custom={i}
                          variants={benefitVariants}
                          initial="hidden"
                          animate="visible"
                          className="p-4 bg-white rounded-lg shadow-sm border"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Text variant="body" className="font-semibold">{perk.name}</Text>
                              <Text variant="caption" className="text-gray-500">{perk.description}</Text>
                            </div>
                            <Text variant="body" className="font-bold text-gray-800 whitespace-nowrap ml-4">
                              {formatValue(perk.value, perk.period)}
                            </Text>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {perk.categories.map(cat => <PerkIcon key={cat} category={cat} />)}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <Text>Benefit details coming soon.</Text>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 