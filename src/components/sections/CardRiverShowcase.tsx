import { motion } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useEffect, useRef, useState, useMemo } from "react";
import * as React from 'react';
import { Glass } from "../ui/Gradient";
import { cards, Card } from "@/components/sections/CardData";

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
            <div className="bg-gradient-to-br from-gray-100/80 to-white/50 backdrop-blur-sm rounded-2xl p-2 md:p-4 shadow-lg hover:shadow-xl transition-shadow">
              <BlurImage
                src={card.image}
                alt={card.name}
                width={300}
                height={189}
                className="w-[200px] md:w-[300px] h-auto object-contain aspect-[1.586/1] rounded-xl"
                priority={index < 4} // Load first few cards with priority
              />
            </div>
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
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 px-4 sm:px-6 lg:px-8">
        <InfiniteCardRiver cards={firstHalfCards} speed={25} direction="left" />
        <InfiniteCardRiver cards={secondHalfCards} speed={30} direction="right" />
      </div>
    </div>
  );
} 