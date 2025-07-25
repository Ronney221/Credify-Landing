import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { CardChipSelector } from "./CardChipSelector";
import { CheckCircle2 } from "lucide-react";
import { CardData } from "@/hooks/useCardData";

interface CardGridProps {
  cards: CardData[];
  selectedCardIndex: number;
  onCardSelect: (index: number) => void;
}

export function CardGrid({ cards, selectedCardIndex, onCardSelect }: CardGridProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Return early if no cards or invalid selectedCardIndex
  if (!cards || cards.length === 0) {
    return null;
  }
  
  // Ensure selectedCardIndex is valid
  const validSelectedIndex = selectedCardIndex >= 0 && selectedCardIndex < cards.length ? selectedCardIndex : 0;
  
  // Sort cards by popularity while preserving original indices
  const sortedCards = [...cards]
    .map((card, index) => ({ ...card, originalIndex: index }))
    .sort((a, b) => 999 - 999); // Remove popularity sorting since database doesn't have this field
  
  // Show only top 6 cards if not showing all
  const displayedCards = showAll ? sortedCards : sortedCards.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Mobile View - Unchanged */}
      <div className="md:hidden space-y-6">
        <CardChipSelector
          cards={cards}
          selectedCardIndex={validSelectedIndex}
          onCardSelect={onCardSelect}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={validSelectedIndex}
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
                  src={cards[validSelectedIndex].image}
                  alt={cards[validSelectedIndex].name}
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

      {/* Enhanced Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayedCards.map((card) => (
          <motion.button
            key={card.name}
            onClick={() => onCardSelect(card.originalIndex)}
            whileHover={{ 
              scale: validSelectedIndex === card.originalIndex ? 1.02 : 1.05,
              transition: { duration: 0.2 }
            }}
            animate={{ 
              scale: validSelectedIndex === card.originalIndex ? 1.05 : 1,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full"
          >
            <Glass
              variant="light"
              className={cn(
                "rounded-3xl p-8 w-full transition-all duration-300 relative",
                validSelectedIndex === card.originalIndex
                  ? "ring-3 ring-blue-500 ring-offset-4 shadow-[0_0_15px_5px_rgba(59,130,246,0.25)]"
                  : "opacity-60 hover:opacity-90"
              )}
            >
              {/* Selected Badge */}
              {validSelectedIndex === card.originalIndex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 z-10 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selected</span>
                </motion.div>
              )}
              
              <div className="aspect-[1.586/1] relative p-[8%]">
                <BlurImage
                  src={card.image}
                  alt={card.name}
                  width={800}
                  height={504}
                  priority={true}
                  className={cn(
                    "w-full h-full object-contain transition-all duration-300",
                    validSelectedIndex === card.originalIndex 
                      ? "" 
                      : "grayscale hover:grayscale-0 filter hover:brightness-100 brightness-90"
                  )}
                />
              </div>
            </Glass>
          </motion.button>
        ))}
      </div>
      
      {/* View All Button (Desktop Only) - Unchanged */}
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