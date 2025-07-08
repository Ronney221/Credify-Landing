import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";
import { Card } from "./CardData";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

interface CardGridProps {
  cards: Card[];
  selectedCardIndex: number;
  onCardSelect: (index: number) => void;
}

export function CardGrid({ cards, selectedCardIndex, onCardSelect }: CardGridProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Sort cards by popularity while preserving original indices
  const sortedCards = [...cards]
    .map((card, index) => ({ ...card, originalIndex: index }))
    .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));
  
  // Show only top 7 cards if not showing all
  const displayedCards = showAll ? sortedCards : sortedCards.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {displayedCards.map((card) => (
          <motion.button
            key={card.name}
            onClick={() => onCardSelect(card.originalIndex)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-[1.586/1] w-full"
          >
            <Glass
              variant="light"
              className={cn(
                "rounded-2xl p-4 w-full h-full transition-all duration-300",
                selectedCardIndex === card.originalIndex
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <BlurImage
                src={card.image}
                alt={card.name}
                width={400}
                height={252}
                className={cn(
                  "w-full h-full object-cover transition-all duration-300",
                  selectedCardIndex === card.originalIndex ? "" : "grayscale hover:grayscale-0"
                )}
              />
            </Glass>
          </motion.button>
        ))}
      </div>
      
      {cards.length > 7 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Popular Cards" : "+ View All Cards"}
          </Button>
        </div>
      )}
    </div>
  );
} 