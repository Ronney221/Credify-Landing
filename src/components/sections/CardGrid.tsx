import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";
import { Card } from "./CardData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { CardChipSelector } from "./CardChipSelector";

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
  
  // Show only top 6 cards if not showing all
  const displayedCards = showAll ? sortedCards : sortedCards.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        <CardChipSelector
          cards={cards}
          selectedCardIndex={selectedCardIndex}
          onCardSelect={onCardSelect}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCardIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-4"
          >
            <Glass
              variant="light"
              className="rounded-3xl p-6 w-full"
            >
              <div className="aspect-[1.586/1] relative p-[8%]">
                <BlurImage
                  src={cards[selectedCardIndex].image}
                  alt={cards[selectedCardIndex].name}
                  width={800}
                  height={504}
                  priority={true}
                  className="w-full h-full object-contain"
                />
              </div>
            </Glass>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayedCards.map((card) => (
          <motion.button
            key={card.name}
            onClick={() => onCardSelect(card.originalIndex)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full"
          >
            <Glass
              variant="light"
              className={cn(
                "rounded-3xl p-8 w-full transition-all duration-300",
                selectedCardIndex === card.originalIndex
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <div className="aspect-[1.586/1] relative p-[8%]">
                <BlurImage
                  src={card.image}
                  alt={card.name}
                  width={800}
                  height={504}
                  priority={true}
                  className={cn(
                    "w-full h-full object-contain transition-all duration-300",
                    selectedCardIndex === card.originalIndex ? "" : "grayscale hover:grayscale-0"
                  )}
                />
              </div>
            </Glass>
          </motion.button>
        ))}
      </div>
      
      {/* View All Button (Desktop Only) */}
      {cards.length > 6 && (
        <div className="hidden md:flex justify-center mt-8">
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