import { motion } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useEffect, useRef, useState, useMemo } from "react";
import * as React from 'react';
import { Glass } from "../ui/Gradient";
import { cards, Card } from "./CardData"; // Assuming CardData.ts holds the cards array and types

interface InfiniteCardRiverProps {
  cards: Card[];
  speed?: number;
  direction?: 'left' | 'right';
}

const InfiniteCardRiver = React.memo(function InfiniteCardRiver({ cards, speed = 20, direction = 'left' }: InfiniteCardRiverProps) {
  const [duplicatedCards, setDuplicatedCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const duplicates = [...cards, ...cards, ...cards];
    setDuplicatedCards(duplicates);
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 3);
    }
  }, [cards]);

  const animate = {
    x: direction === 'left' ? [0, -containerWidth] : [-containerWidth, 0],
    transition: {
      x: {
        duration: isMobile ? containerWidth / (speed * 0.7) : containerWidth / speed,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <motion.div
        className="flex gap-4 md:gap-6"
        animate={animate}
      >
        {duplicatedCards.map((card, index) => (
          <motion.div
            key={`${card.name}-${index}`}
            className="relative shrink-0"
            whileHover={isMobile ? undefined : { scale: 1.05, zIndex: 10 }}
          >
            <Glass variant="light" className="rounded-2xl p-2 md:p-4">
              <BlurImage
                src={card.image}
                alt={card.name}
                width={300}
                height={189}
                className="w-[200px] md:w-[300px] h-auto object-contain aspect-[1.586/1]"
              />
            </Glass>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export function CardRiverShowcase() {
    const shuffledCards = useMemo(() => {
        return [...cards].sort(() => Math.random() - 0.5);
    }, []);

    const halfIndex = Math.ceil(shuffledCards.length / 2);
    const firstHalfCards = shuffledCards.slice(0, halfIndex);
    const secondHalfCards = shuffledCards.slice(halfIndex);

    return (
        <div className="space-y-4 md:space-y-6">
            <InfiniteCardRiver cards={firstHalfCards} speed={25} direction="left" />
            <InfiniteCardRiver cards={secondHalfCards} speed={30} direction="right" />
        </div>
    );
} 