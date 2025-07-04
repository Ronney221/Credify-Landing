import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const cards = [
  {
    name: "American Express Platinum",
    image: "/assets/cards/amex_plat.avif",
    category: "Premium Travel"
  },
  {
    name: "American Express Gold",
    image: "/assets/cards/amex_gold.avif",
    category: "Dining & Travel"
  },
  {
    name: "Chase Sapphire Reserve",
    image: "/assets/cards/chase_sapphire_reserve.png",
    category: "Premium Travel"
  },
  {
    name: "Capital One Venture X",
    image: "/assets/cards/venture_x.avif",
    category: "Premium Travel"
  },
  {
    name: "Hilton Honors Aspire",
    image: "/assets/cards/hilton_aspire.avif",
    category: "Hotel"
  },
  {
    name: "Marriott Bonvoy Brilliant",
    image: "/assets/cards/marriott_bonvoy_brilliant.avif",
    category: "Hotel"
  },
  {
    name: "Delta Reserve",
    image: "/assets/cards/delta_reserve.avif",
    category: "Airline"
  },
  {
    name: "Blue Cash Preferred",
    image: "/assets/cards/blue_cash_preferred.avif",
    category: "Cash Back"
  }
];

export function CardShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Supported Cards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track benefits and maximize rewards across all major credit cards.
              New cards added regularly based on user demand.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur border shadow-lg ${
              !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity duration-200`}
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur border shadow-lg ${
              !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity duration-200`}
            aria-label="Scroll right"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[300px] snap-center"
              >
                <div className="group relative aspect-[1.586/1] rounded-xl overflow-hidden bg-muted">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-xs text-white/80 mb-1">{card.category}</div>
                      <div className="text-lg font-semibold text-white">{card.name}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 