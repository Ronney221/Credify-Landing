import { motion, useScroll, useTransform } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useEffect, useRef, useState } from "react";
import { CreditCard, Gift, Plane, Shield, Utensils, Hotel, Wifi, CreditCard as CardIcon, Zap } from "lucide-react";

const cards = [
  {
    name: "American Express Platinum",
    image: "/assets/cards/amex_plat.avif",
    annualFee: "$695",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$200 Airline Fee Credit", redemption: "Select one qualifying airline annually. Credit automatically applied for incidental fees." },
      { icon: Hotel, text: "$200 Hotel Credit", redemption: "Book through Fine Hotels & Resorts or The Hotel Collection." },
      { icon: Gift, text: "$200 Uber Credit", redemption: "$15 monthly credit + $35 in December, automatically added to Uber account." },
      { icon: Wifi, text: "Global Lounge Access", redemption: "Access Centurion, Priority Pass, Delta Sky Club (when flying Delta), and other lounges." },
      { icon: CreditCard, text: "5x Points on Flights", redemption: "Book directly with airlines or through Amex Travel." },
    ],
  },
  {
    name: "American Express Gold",
    image: "/assets/cards/amex_gold.avif",
    annualFee: "$250",
    category: "Dining & Travel",
    keyBenefits: [
      { icon: Utensils, text: "$120 Dining Credit", redemption: "$10 monthly at Grubhub, The Cheesecake Factory, and select restaurants." },
      { icon: Gift, text: "$120 Uber Credit", redemption: "$10 monthly in Uber Cash for rides or Uber Eats." },
      { icon: CreditCard, text: "4x at Restaurants", redemption: "Automatic at restaurants worldwide, including takeout and delivery." },
      { icon: Plane, text: "3x on Flights", redemption: "Book directly with airlines or through Amex Travel." },
    ],
  },
  {
    name: "American Express Green",
    image: "/assets/cards/amex_green.avif",
    annualFee: "$150",
    category: "Lifestyle & Travel",
    keyBenefits: [
      { icon: Plane, text: "3x on Travel", redemption: "Including transit, hotels, tours, and flights." },
      { icon: Utensils, text: "3x at Restaurants", redemption: "Worldwide dining, including takeout and delivery." },
      { icon: Gift, text: "$100 CLEAR Credit", redemption: "Annual credit for CLEAR membership." },
      { icon: Wifi, text: "Lounge Access Credit", redemption: "$100 annual credit for LoungeBuddy bookings." },
    ],
  },
  {
    name: "Chase Sapphire Reserve",
    image: "/assets/cards/chase_sapphire_reserve.png",
    annualFee: "$550",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$300 Travel Credit", redemption: "Automatic credit for travel purchases, including flights, hotels, and transit." },
      { icon: Gift, text: "50% More Value", redemption: "Points worth 50% more when redeemed for travel through Chase Ultimate Rewards." },
      { icon: CreditCard, text: "10x on Hotels & Cars", redemption: "Book through Chase Ultimate Rewards after travel credit is used." },
      { icon: Wifi, text: "Priority Pass™ Select", redemption: "Complimentary airport lounge access with Priority Pass membership." },
    ],
  },
  {
    name: "Chase Sapphire Preferred",
    image: "/assets/cards/chase_sapphire_preferred.png",
    annualFee: "$95",
    category: "Travel Rewards",
    keyBenefits: [
      { icon: Gift, text: "$50 Hotel Credit", redemption: "Annual credit for hotels booked through Chase Ultimate Rewards." },
      { icon: CreditCard, text: "5x on Travel", redemption: "Book through Chase Ultimate Rewards." },
      { icon: Utensils, text: "3x on Dining", redemption: "Including eligible delivery services and takeout." },
      { icon: Zap, text: "25% More Value", redemption: "Points worth 25% more when redeemed for travel through Chase." },
    ],
  },
  {
    name: "Capital One Venture X",
    image: "/assets/cards/venture_x.avif",
    annualFee: "$395",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$300 Travel Credit", redemption: "Annual credit for bookings through Capital One Travel." },
      { icon: Gift, text: "10,000 Mile Bonus", redemption: "Anniversary bonus miles, automatically credited." },
      { icon: CreditCard, text: "10x on Hotels", redemption: "Book through Capital One Travel." },
      { icon: Wifi, text: "Priority Pass™ & Plaza Premium", redemption: "Complimentary lounge access for cardholder and guests." },
    ],
  },
  {
    name: "Citi Prestige",
    image: "/assets/cards/citi_prestige.jpeg",
    annualFee: "$495",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Hotel, text: "4th Night Free", redemption: "Book 4+ consecutive nights through ThankYou portal, get 4th night free." },
      { icon: Plane, text: "$250 Travel Credit", redemption: "Automatic credit for travel purchases." },
      { icon: CreditCard, text: "5x on Dining", redemption: "At restaurants worldwide and on air travel." },
      { icon: Wifi, text: "Priority Pass™ Select", redemption: "Complimentary lounge access for cardholder and guests." },
    ],
  },
  {
    name: "US Bank Altitude Reserve",
    image: "/assets/cards/usb_altitude_reserve.png",
    annualFee: "$400",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$325 Travel Credit", redemption: "Automatic credit for travel and dining purchases." },
      { icon: CreditCard, text: "3x on Mobile Pay", redemption: "Use mobile wallet for purchases." },
      { icon: Gift, text: "Priority Pass™ Select", redemption: "4 free visits per year for cardholder and guest." },
      { icon: Zap, text: "50% More Value", redemption: "Points worth 50% more when redeemed for travel." },
    ],
  },
  {
    name: "Bank of America Premium Rewards Elite",
    image: "/assets/cards/boa_premium_rewards_elite.png",
    annualFee: "$550",
    category: "Premium Travel",
    keyBenefits: [
      { icon: Plane, text: "$300 Travel Credit", redemption: "Automatic credit for travel purchases." },
      { icon: Gift, text: "$150 Lifestyle Credit", redemption: "For dining, ride-share, or streaming services." },
      { icon: CreditCard, text: "2x on Travel", redemption: "Automatic on travel and dining purchases." },
      { icon: Wifi, text: "Priority Pass™ Select", redemption: "Unlimited lounge visits for cardholder and guests." },
    ],
  },
  {
    name: "Hilton Honors Aspire",
    image: "/assets/cards/hilton_aspire.avif",
    annualFee: "$450",
    category: "Hotel Rewards",
    keyBenefits: [
      { icon: Hotel, text: "$250 Resort Credit", redemption: "Valid at participating Hilton resorts." },
      { icon: Plane, text: "$250 Airline Credit", redemption: "Select one qualifying airline annually for incidental fees." },
      { icon: Gift, text: "Free Night Award", redemption: "Annual free weekend night at any Hilton property." },
      { icon: Shield, text: "Diamond Status", redemption: "Automatic Hilton Diamond status." },
    ],
  },
  {
    name: "Marriott Bonvoy Brilliant",
    image: "/assets/cards/marriott_bonvoy_brilliant.avif",
    annualFee: "$650",
    category: "Hotel Rewards",
    keyBenefits: [
      { icon: Hotel, text: "$300 Dining Credit", redemption: "$25 monthly credit at restaurants worldwide." },
      { icon: Gift, text: "85,000 Free Night", redemption: "Annual free night award up to 85,000 points." },
      { icon: Shield, text: "Platinum Elite Status", redemption: "Automatic Marriott Platinum Elite status." },
      { icon: Plane, text: "$100 Global Entry", redemption: "Credit for Global Entry or TSA PreCheck." },
    ],
  },
  {
    name: "Delta Reserve",
    image: "/assets/cards/delta_reserve.avif",
    annualFee: "$550",
    category: "Airline Rewards",
    keyBenefits: [
      { icon: Plane, text: "Companion Certificate", redemption: "Annual companion certificate for domestic first class or main cabin." },
      { icon: Wifi, text: "Sky Club Access", redemption: "Complimentary Delta Sky Club access when flying Delta." },
      { icon: Gift, text: "First Bag Free", redemption: "First checked bag free for cardholder and up to 8 companions." },
      { icon: Shield, text: "Medallion Qualification", redemption: "MQM boost opportunities throughout the year." },
    ],
  },
  {
    name: "Blue Cash Preferred",
    image: "/assets/cards/blue_cash_preferred.avif",
    annualFee: "$95",
    category: "Cash Back",
    keyBenefits: [
      { icon: Utensils, text: "6% at Supermarkets", redemption: "Up to $6,000 per year, then 1%." },
      { icon: Gift, text: "6% on Streaming", redemption: "Select U.S. streaming subscriptions." },
      { icon: CreditCard, text: "3% on Transit", redemption: "Including gas stations, parking, and ride-share." },
      { icon: Zap, text: "3% at Gas Stations", redemption: "At U.S. gas stations." },
    ],
  },
];

export function CardShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  useEffect(() => {
    if (!autoScrollEnabled || !containerRef.current) return;

    const scrollContainer = containerRef.current.querySelector('.cards-container');
    if (!scrollContainer) return;

    let animationFrameId: number;
    const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollDuration = 60000; // 60 seconds for one complete scroll
    
    const animate = () => {
      const newPosition = (scrollPosition + 1) % totalWidth;
      setScrollPosition(newPosition);
      scrollContainer.scrollLeft = newPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleScroll = () => {
      if (scrollContainer) {
        setScrollPosition(scrollContainer.scrollLeft);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [autoScrollEnabled, scrollPosition]);

  return (
    <div className="container px-4 mx-auto" ref={containerRef}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        >
          Track Your Elite Cards
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Never miss a benefit with our intelligent tracking system. We support all major premium credit cards.
        </motion.p>
      </div>

      {/* Cards Display */}
      <motion.div
        style={{ opacity, scale }}
        className="relative"
      >
        <div
          className="cards-container overflow-x-auto hide-scrollbar pb-12"
          onMouseEnter={() => setAutoScrollEnabled(false)}
          onMouseLeave={() => setAutoScrollEnabled(true)}
        >
          <div className="flex gap-8 min-w-max px-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.1,
                    },
                  },
                }}
                className="relative group w-[340px]"
                onMouseEnter={() => setSelectedCard(index)}
                onMouseLeave={() => setSelectedCard(null)}
              >
                {/* Card Image */}
                <div className="relative aspect-[1.586/1] mb-6 transform group-hover:scale-105 transition-transform duration-300">
                  <BlurImage
                    src={card.image}
                    alt={card.name}
                    width={340}
                    height={214}
                    className="rounded-xl shadow-lg"
                  />
                </div>

                {/* Card Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <span>{card.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{card.annualFee}/year</span>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    {card.keyBenefits.map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={i}
                          className="group/benefit"
                        >
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{benefit.text}</span>
                          </div>
                          {/* Redemption Instructions */}
                          <div className="mt-1 ml-11 text-xs text-gray-500 group-hover/benefit:text-gray-700 transition-colors">
                            {benefit.redemption}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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

        {/* Scroll Indicators */}
        <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                selectedCard === index ? 'bg-brand' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
} 