import { BlurImage } from "../ui/BlurImage";
import { Glass } from "../ui/Gradient";
import { Card } from "./CardData";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardGridProps {
  cards: Card[];
  selectedCardIndex: number;
  onCardSelect: (index: number) => void;
}

export function CardGrid({ cards, selectedCardIndex, onCardSelect }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {cards.map((card, index) => (
        <motion.button
          key={card.name}
          onClick={() => onCardSelect(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative aspect-[1.586/1] w-full"
        >
          <Glass
            variant="light"
            className={cn(
              "rounded-2xl p-4 w-full h-full transition-all duration-300",
              selectedCardIndex === index
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <BlurImage
              src={card.image}
              alt={card.name}
              width={400}
              height={252}
              className="w-full h-full object-cover"
            />
          </Glass>
        </motion.button>
      ))}
    </div>
  );
} 