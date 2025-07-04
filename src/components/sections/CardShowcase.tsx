import { motion, useScroll, useTransform } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard, Gift, Plane, Shield } from "lucide-react";

const cards = [
  {
    name: "American Express Platinum",
    image: "/assets/cards/amex_plat.avif",
    annualFee: "$695",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$200 Airline Fee Credit" },
      { icon: Gift, text: "$200 Hotel Credit" },
      { icon: CreditCard, text: "5x Points on Flights" },
      { icon: Shield, text: "Premium Protection" },
    ],
    color: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    name: "Chase Sapphire Reserve",
    image: "/assets/cards/chase_sapphire_reserve.png",
    annualFee: "$550",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$300 Travel Credit" },
      { icon: Gift, text: "50% More Value" },
      { icon: CreditCard, text: "3x on Travel & Dining" },
      { icon: Shield, text: "Priority Pass™ Access" },
    ],
    color: "bg-gradient-to-br from-blue-700 to-blue-900",
  },
  {
    name: "Capital One Venture X",
    image: "/assets/cards/venture_x.avif",
    annualFee: "$395",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$300 Travel Credit" },
      { icon: Gift, text: "10k Bonus Miles" },
      { icon: CreditCard, text: "10x on Hotels" },
      { icon: Shield, text: "Priority Pass™ Access" },
    ],
    color: "bg-gradient-to-br from-indigo-700 to-indigo-900",
  },
  {
    name: "Amex Gold Card",
    image: "/assets/cards/amex_gold.avif",
    annualFee: "$250",
    category: "Dining & Travel",
    keyBenefits: [
      { icon: Gift, text: "$120 Dining Credit" },
      { icon: CreditCard, text: "4x at Restaurants" },
      { icon: Plane, text: "3x on Flights" },
      { icon: Shield, text: "No Foreign Fees" },
    ],
    color: "bg-gradient-to-br from-yellow-600 to-yellow-800",
  },
];

export function CardShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--brand)_12%,transparent_12.5%,transparent_87%,var(--brand)_87.5%,var(--brand))] opacity-[0.015]" style={{ backgroundSize: '15px 15px' }} />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container px-4 mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand/5 text-brand text-sm font-medium">
              Premium Cards
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Track Your Elite Cards
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Maximize the value of your premium credit cards with our intelligent tracking system.
          </motion.p>
        </div>

        {/* Cards Carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 pb-8 px-4 min-w-max">
              {cards.map((card, index) => (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setSelectedCard(index)}
                  onMouseLeave={() => setSelectedCard(null)}
                >
                  <div className={`w-[300px] rounded-2xl p-6 ${card.color} relative overflow-hidden`}>
                    {/* Card Image */}
                    <div className="relative aspect-[1.586/1] mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <BlurImage
                        src={card.image}
                        alt={card.name}
                        width={300}
                        height={189}
                        className="rounded-xl shadow-lg"
                      />
                    </div>

                    {/* Card Details */}
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-1">{card.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm opacity-80">{card.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="text-sm opacity-80">{card.annualFee}/year</span>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        {card.keyBenefits.map((benefit, i) => {
                          const Icon = benefit.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Icon className="w-4 h-4 opacity-75" />
                              <span>{benefit.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Selection Indicator */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 w-12 h-1 bg-brand rounded-full -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: selectedCard === index ? 1 : 0,
                      scale: selectedCard === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 