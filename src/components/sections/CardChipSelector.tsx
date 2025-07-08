import { Card } from "./CardData";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useRef } from "react";

interface CardChipSelectorProps {
  cards: Card[];
  selectedCardIndex: number;
  onCardSelect: (index: number) => void;
}

export function CardChipSelector({ cards, selectedCardIndex, onCardSelect }: CardChipSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sort cards by popularity
  const sortedCards = [...cards]
    .map((card, index) => ({ ...card, originalIndex: index }))
    .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

  // Helper function to get card issuer logo
  const getCardIssuer = (cardName: string) => {
    if (cardName.includes("American Express") || cardName.includes("AmEx")) {
      return "/public/assets/partners/amex.svg";
    } else if (cardName.includes("Chase")) {
      return "/public/assets/partners/chase.svg";
    } else if (cardName.includes("Capital One")) {
      return "/public/assets/partners/capital-one.svg";
    } else if (cardName.includes("Bank of America")) {
      return "/public/assets/partners/bank-of-america.svg";
    } else if (cardName.includes("Citi")) {
      return "/public/assets/partners/citi.svg";
    } else if (cardName.includes("U.S. Bank")) {
      return "/public/assets/partners/us-bank.svg";
    }
    return null;
  };

  // Helper function to get simplified card name
  const getSimplifiedName = (cardName: string) => {
    // Remove issuer names and common words
    return cardName
      .replace(/(American Express|AmEx|Chase|Capital One|Bank of America|Citi|U\.S\. Bank)/g, '')
      .replace(/(Card|Visa Infinite)/g, '')
      .trim();
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto pb-4 px-4 snap-x snap-mandatory hide-scrollbar"
      >
        {sortedCards.map((card) => {
          const issuerLogo = getCardIssuer(card.name);
          const simplifiedName = getSimplifiedName(card.name);
          
          return (
            <motion.button
              key={card.name}
              onClick={() => onCardSelect(card.originalIndex)}
              className={cn(
                "flex items-center gap-2 shrink-0 snap-center py-2 px-4 rounded-full transition-all duration-300",
                selectedCardIndex === card.originalIndex
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {issuerLogo && (
                <img
                  src={issuerLogo}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
              )}
              <span className="text-sm font-medium whitespace-nowrap">
                {simplifiedName}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Fade edges to indicate scrollable content */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
} 