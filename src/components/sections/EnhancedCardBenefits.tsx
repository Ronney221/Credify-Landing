import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";
import { cards } from "./CardData";
import { CardGrid } from "./CardGrid";
import { PerkList } from "./PerkList";

const portfolioInsights = [
  {
    range: "$95-$250",
    description: "Single Premium Card",
    examples: ["Chase Sapphire Preferred", "Amex Gold"],
    typicalUtilization: "20-30%",
    credifyUtilization: "85-95%"
  },
  {
    range: "$400-$700", 
    description: "Premium Portfolio",
    examples: ["Amex Platinum", "Chase Sapphire Reserve"],
    typicalUtilization: "15-25%",
    credifyUtilization: "90-95%"
  },
  {
    range: "$1,000+",
    description: "Multi-Card Strategy",
    examples: ["3+ premium cards"],
    typicalUtilization: "10-20%",
    credifyUtilization: "95%+"
  }
];

export function EnhancedCardBenefits() {
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

  // Determine which portfolio tier this card fits into
  const getPortfolioTier = (annualFee: number) => {
    if (annualFee <= 250) return portfolioInsights[0];
    if (annualFee <= 700) return portfolioInsights[1];
    return portfolioInsights[2];
  };

  const currentTier = getPortfolioTier(currentCard.annualFee);
  const utilizationRate = 20; // Most people only use 20%
  const credifyRate = 90; // Credify helps achieve 90%
  const typicalValue = Math.round(totalAnnualValue * (utilizationRate / 100));
  const credifyValue = Math.round(totalAnnualValue * (credifyRate / 100));
  const missedValue = credifyValue - typicalValue;

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

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Card Header with Portfolio Context */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                  <div>
                    <Text variant="h3" as="h3" className="mb-2">{currentCard.name}</Text>
                    <Text variant="body" className="text-gray-600">
                      Annual Fee: ${currentCard.annualFee} | Est. Annual Value: <span className="font-bold text-green-600">${totalAnnualValue}</span>
                    </Text>
                  </div>
                  
                  {/* Portfolio Tier Badge */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:min-w-[280px]">
                    <Text variant="caption" className="text-blue-600 font-medium mb-1">
                      Portfolio Category: {currentTier.description}
                    </Text>
                    <Text variant="tiny" className="text-blue-500">
                      {currentTier.examples.join(", ")}
                    </Text>
                  </div>
                </div>

                {/* Utilization Comparison */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <Text variant="h4" className="text-red-600 mb-1">${currentCard.annualFee}</Text>
                    <Text variant="caption" className="text-red-700">You're Paying</Text>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <Text variant="h4" className="text-orange-600 mb-1">${typicalValue}</Text>
                    <Text variant="caption" className="text-orange-700">Typical Usage (20%)</Text>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <Text variant="h4" className="text-green-600 mb-1">${credifyValue}</Text>
                    <Text variant="caption" className="text-green-700">With Credify (90%)</Text>
                  </div>
                </div>

                {/* Value Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 text-center mb-8">
                  <Text variant="h3" className="text-green-700 mb-2">
                    You're Missing ${missedValue}/year
                  </Text>
                  <Text variant="body" className="text-gray-600">
                    Most {currentTier.description.toLowerCase()} holders only use {utilizationRate}% of available benefits. 
                    Credify helps you reach {credifyRate}% utilization.
                  </Text>
                </div>
              </div>

              {/* Detailed Perk List */}
              <PerkList perks={currentCard.benefits} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Portfolio Strategy Insights */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <Text variant="h3" className="mb-4">
              Your Savings Potential by Portfolio Size  
            </Text>
            <Text variant="body" className="text-gray-600">
              Credify scales with your credit card strategy
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioInsights.map((tier, index) => (
              <motion.div
                key={tier.range}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  tier === currentTier 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <Text variant="h4" className="mb-2">
                    {tier.range}
                  </Text>
                  <Text variant="body" className="font-medium mb-1">
                    {tier.description}
                  </Text>
                  <Text variant="caption" className="text-gray-500 mb-4">
                    {tier.examples.join(", ")}
                  </Text>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Typical Usage:</span>
                    <span className="text-sm font-medium text-orange-600">{tier.typicalUtilization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">With Credify:</span>
                    <span className="text-sm font-medium text-green-600">{tier.credifyUtilization}</span>
                  </div>
                </div>

                {tier === currentTier && (
                  <div className="mt-4 text-center">
                    <Text variant="tiny" className="text-green-700 font-medium">
                      ✓ Your Current Category
                    </Text>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}