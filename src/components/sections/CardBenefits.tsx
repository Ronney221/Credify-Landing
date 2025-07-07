import { motion, useScroll, useTransform, AnimatePresence, useAnimationControls } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { useEffect, useRef, useState } from "react";
import { CreditCard, Gift, Plane, Shield, Utensils, Hotel, Wifi, CreditCard as CardIcon, Zap, ChevronLeft, ChevronRight, Coffee, ShoppingBag, Dumbbell } from "lucide-react";
import * as React from 'react';
import { Glass } from "../ui/Gradient";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";

// Define perk categories and their icons
const categoryIcons = {
  "Travel": Plane,
  "Dining": Utensils,
  "Flights": Plane,
  "Lodging": Hotel,
  "Transportation": CardIcon,
  "Shopping": ShoppingBag,
  "Entertainment": Zap,
  "Fitness": Dumbbell,
  "Wellness": Shield,
  "Coffee": Coffee,
  "Grocery": ShoppingBag,
  "Bills & Utilities": Wifi,
  "Rewards": Gift,
  "Insurance": Shield,
  "Lifestyle": Zap
};

type CategoryIconType = keyof typeof categoryIcons;

interface Perk {
  id: string;
  name: string;
  description: string;
  value: number;
  period: string;
  categories: CategoryIconType[];
  redemptionInstructions?: string;
  appScheme?: string;
}

interface Card {
  name: string;
  image: string;
  annualFee: number;
  benefits: Perk[];
}

const cards: Card[] = [
  {
    name: "American Express Platinum",
    image: "/assets/cards/amex_plat.avif",
    annualFee: 695,
    benefits: [
      {
        id: "platinum_uber_cash",
        name: "Uber Cash",
        value: 15,
        period: "monthly",
        description: "Receive $15 in Uber Cash for U.S. rides or Uber Eats orders each month, plus a $20 bonus in December, for a total of $200 annually.",
        redemptionInstructions: "To activate, add your Platinum Card as a payment method in your Uber account. The Uber Cash is automatically added to your account on the first day of each month and expires at the end of that month. Unused amounts do not roll over.",
        appScheme: "uber",
        categories: ["Transportation", "Dining"]
      },
      {
        id: "platinum_digital_ent",
        name: "Digital Entertainment Credit",
        value: 20,
        period: "monthly",
        description: "Up to $20 per month (totaling $240 per year) in statement credits for eligible digital subscriptions. Covered services include Audible, Disney+, The Disney Bundle, ESPN+, Hulu, Peacock, The New York Times, and The Wall Street Journal.",
        redemptionInstructions: "You must enroll in this benefit first via your Amex account. Then, simply use your Platinum Card to pay for the eligible subscriptions. The credit is automatically applied as a statement credit.",
        categories: ["Bills & Utilities", "Entertainment"]
      },
      {
        id: "platinum_walmart_plus",
        name: "Walmart+ Membership Credit",
        value: 12.95,
        period: "monthly",
        description: "Receive a statement credit that covers the full cost of a Walmart+ monthly membership ($12.95 plus applicable sales tax).",
        redemptionInstructions: "Use your Platinum Card to pay for a Walmart+ monthly membership. This benefit does not cover the annual membership. A key value of this perk is that a Walmart+ membership also includes a complimentary Paramount+ subscription.",
        appScheme: "walmart",
        categories: ["Shopping", "Grocery", "Entertainment"]
      },
      {
        id: "platinum_equinox",
        name: "Equinox Credit",
        value: 300,
        period: "annual",
        description: "Receive up to $300 in statement credits annually for eligible Equinox memberships.",
        redemptionInstructions: "Enrollment is required. Use your Platinum Card to pay for an Equinox All Access, Destination, E by Equinox, or Equinox+ membership. The credit is applied monthly based on your charges, up to the annual maximum of $300.",
        appScheme: "equinox",
        categories: ["Fitness", "Wellness"]
      },
      {
        id: "platinum_saks",
        name: "Saks Fifth Avenue Credit",
        value: 50,
        period: "semi_annual",
        description: "Receive up to $50 in statement credits twice per year for purchases at Saks Fifth Avenue. This provides up to $100 in total value annually.",
        redemptionInstructions: "Enrollment is required. The credit is split into two periods: January through June, and July through December. Use your Platinum Card at Saks in-store or online. A popular strategy is to purchase a $50 gift card in-store to use later if you don't have an immediate purchase to make. The credit does not apply to purchases at Saks OFF 5TH.",
        appScheme: "saks",
        categories: ["Shopping"]
      },
      {
        id: "platinum_clear",
        name: "CLEAR Plus Credit",
        value: 189,
        period: "annual",
        description: "Receive up to $189 in statement credits per calendar year for a CLEAR Plus membership, which provides expedited security screening at select airports and stadiums.",
        redemptionInstructions: "Enroll in CLEAR Plus and pay with your Platinum Card. The credit covers one annual CLEAR membership.",
        appScheme: "clear",
        categories: ["Travel", "Flights"]
      },
      {
        id: "platinum_airline_fee",
        name: "Airline Fee Credit",
        value: 200,
        period: "annual",
        description: "Up to $200 in statement credits per calendar year for incidental fees with one selected qualifying airline.",
        redemptionInstructions: "You must enroll and select one airline from the Amex website each year. This credit applies to incidental fees like checked bags, seat selection, and in-flight refreshments, but not directly to ticket purchases. Some users have found that certain charges under $100 or purchases for airline travel banks (e.g., United TravelBank) may trigger the credit, but these methods are not guaranteed. Plan to use it for standard fees to ensure reimbursement.",
        appScheme: "amex",
        categories: ["Travel", "Flights"]
      },
      {
        id: "platinum_hotel_credit",
        name: "Prepaid Hotel Credit",
        value: 200,
        period: "annual",
        description: "Receive up to $200 back in statement credits each calendar year on prepaid bookings with Fine Hotels + Resorts® or The Hotel Collection made through American Express Travel.",
        redemptionInstructions: "Book a prepaid stay through amextravel.com. For The Hotel Collection, a minimum two-night stay is required. The credit is automatically applied. This is in addition to the valuable on-site benefits (like room upgrades and property credits) that come with FHR and THC bookings.",
        appScheme: "amex",
        categories: ["Travel", "Lodging"]
      }
    ]
  },
  {
    name: "American Express Gold",
    image: "/assets/cards/amex_gold.avif",
    annualFee: 325,
    benefits: [
      {
        id: "amex_gold_uber",
        name: "Uber Cash",
        value: 10,
        period: "monthly",
        description: "Receive up to $10 in Uber Cash each month, totaling $120 per year. This can be used for both U.S. Uber rides and U.S. Uber Eats orders.",
        redemptionInstructions: "To receive the benefit, add your Gold Card as a payment method in your Uber account. The $10 in Uber Cash will be automatically deposited into your account on the first of each month. Credits do not roll over and expire at the end of the month.",
        appScheme: "uber",
        categories: ["Transportation", "Dining"]
      },
      {
        id: "amex_gold_grubhub",
        name: "Grubhub Credit",
        value: 10,
        period: "monthly",
        description: "Receive up to $10 in statement credits each month for purchases at Grubhub, Five Guys, The Cheesecake Factory, Goldbelly, Wine.com, and Milk Bar.",
        redemptionInstructions: "You must first enroll in the benefit through your American Express online account. Then, simply use your Gold Card to pay at any of the eligible partners. The statement credit is applied automatically. Unused amounts do not roll over.",
        appScheme: "grubhub",
        categories: ["Dining"]
      },
      {
        id: "amex_gold_resy",
        name: "Resy Dining Credit",
        value: 50,
        period: "semi_annual",
        description: "Up to $50 in statement credits twice per year (Jan-Jun and Jul-Dec) for dining purchases at Resy-booked restaurants in the U.S.",
        redemptionInstructions: "Book and dine at Resy partner restaurants. No special code needed; credit posts automatically after dining.",
        appScheme: "resy",
        categories: ["Dining"]
      },
      {
        id: "amex_gold_dunkin",
        name: "Dunkin' Credit",
        value: 7,
        period: "monthly",
        description: "Up to $7 in statement credits each month for Dunkin' Donuts purchases in the U.S. when you spend $7 or more.",
        redemptionInstructions: "Enroll your card and use it at Dunkin' Donuts. Credit appears on statement after qualifying purchase.",
        appScheme: "dunkin",
        categories: ["Dining", "Coffee"]
      }
    ]
  },
  {
    name: "American Express Green",
    image: "/assets/cards/amex_green.avif",
    annualFee: 150,
    benefits: [
      {
        id: "amex_green_clear",
        name: "CLEAR Plus Credit",
        value: 189,
        period: "annual",
        description: "Receive up to $189 in statement credits per calendar year for a CLEAR Plus membership, which provides expedited security screening at select airports and stadiums.",
        redemptionInstructions: "Enroll in CLEAR Plus and pay with your Green Card. The credit covers one annual CLEAR membership.",
        appScheme: "clear",
        categories: ["Travel", "Flights"]
      }
    ]
  },
  {
    name: "Chase Sapphire Reserve",
    image: "/assets/cards/chase_sapphire_reserve.png",
    annualFee: 795,
    benefits: [
      {
        id: "csr_the_edit_credit_h1",
        name: "The Edit by Chase Travel Credit",
        value: 250,
        period: "semi_annual",
        description: "$250 statement credit for prepaid hotel bookings of at least two nights made through \"The Edit by Chase Travel\" portal. Valid from January 1 to June 30.",
        redemptionInstructions: "Credit is automatically applied to eligible bookings. Purchases reimbursed with this credit do not earn points.",
        appScheme: "chase",
        categories: ["Travel", "Lodging"]
      },
      {
        id: "csr_dining_credit_h1",
        name: "Exclusive Tables Dining Credit",
        value: 150,
        period: "semi_annual",
        description: "$150 statement credit for dining experiences booked through the \"Sapphire Reserve Exclusive Tables\" platform on OpenTable. Valid from January 1 to June 30.",
        redemptionInstructions: "Credit is automatically applied for dining experiences booked via the \"Sapphire Reserve Exclusive Tables\" program.",
        appScheme: "opentable",
        categories: ["Dining"]
      },
      {
        id: "csr_stubhub_credit_h1",
        name: "StubHub / viagogo Credit",
        value: 150,
        period: "semi_annual",
        description: "$150 statement credit for concert and event tickets purchased through StubHub or viagogo. Valid from January 1 to June 30.",
        redemptionInstructions: "Benefit requires activation before use.",
        appScheme: "stubhub",
        categories: ["Entertainment"]
      },
      {
        id: "csr_doordash_restaurant",
        name: "DoorDash Restaurant Credit",
        value: 5,
        period: "monthly",
        description: "$5 monthly promo credit for an eligible DoorDash restaurant order. Part of the up to $300 annual DoorDash credit benefit. Requires complimentary DashPass enrollment (valid through Dec 31, 2027).",
        redemptionInstructions: "Enroll in complimentary DashPass. The $5 promo credit is available in your DoorDash account each month and must be applied at checkout.",
        appScheme: "doordash",
        categories: ["Dining"]
      },
      {
        id: "csr_doordash_non_restaurant_1",
        name: "DoorDash Non-Restaurant Credit #1",
        value: 10,
        period: "monthly",
        description: "$10 monthly promo credit for an eligible non-restaurant order (e.g., grocery, retail). Part of the up to $300 annual DoorDash credit benefit. Requires DashPass enrollment (valid through Dec 31, 2027).",
        redemptionInstructions: "Use your Reserve card with active DashPass membership. The $10 promo credit appears in your DoorDash account and must be applied at checkout.",
        appScheme: "doordash",
        categories: ["Grocery"]
      },
      {
        id: "csr_doordash_non_restaurant_2",
        name: "DoorDash Non-Restaurant Credit #2",
        value: 10,
        period: "monthly",
        description: "Second $10 monthly promo credit for an eligible non-restaurant order. Part of the up to $300 annual DoorDash credit benefit. Requires DashPass enrollment (valid through Dec 31, 2027).",
        redemptionInstructions: "Use your Reserve card with active DashPass membership. The second $10 promo credit appears in your DoorDash account after the first is used.",
        appScheme: "doordash",
        categories: ["Grocery"]
      },
      {
        id: "csr_peloton_credit",
        name: "Peloton Membership Credit",
        value: 10,
        period: "monthly",
        description: "Up to $10 in monthly statement credits toward a Peloton All-Access, App+, or App One membership. Valid through December 31, 2027.",
        redemptionInstructions: "Credits are automatically applied to your statement for eligible Peloton membership charges.",
        appScheme: "peloton",
        categories: ["Lifestyle", "Fitness", "Wellness"]
      },
      {
        id: "csr_lyft",
        name: "Lyft Credit",
        value: 10,
        period: "monthly",
        description: "$10 in-app Lyft ride credit each month. Plus earn 5x points on Lyft rides through September 30, 2027.",
        redemptionInstructions: "Add your Sapphire Reserve as the payment method in the Lyft app. Credit appears automatically and applies to your next ride(s).",
        appScheme: "lyft",
        categories: ["Transportation"]
      },
      {
        id: "csr_apple_subscriptions",
        name: "Apple Services Credit",
        value: 250,
        period: "annual",
        description: "Complimentary subscriptions to Apple TV+ and Apple Music, positioned as a $250 annual value.",
        redemptionInstructions: "Requires a one-time activation for each service through chase.com or the Chase Mobile app.",
        categories: ["Lifestyle", "Entertainment"]
      }
    ]
  },
  {
    name: "Chase Sapphire Preferred",
    image: "/assets/cards/chase_sapphire_preferred.png",
    annualFee: 95,
    benefits: [
      {
        id: "csp_hotel",
        name: "Hotel Credit",
        value: 50,
        period: "annual",
        description: "Up to $50 statement credit each account anniversary year for hotel stays booked via the Chase Ultimate Rewards travel portal.",
        redemptionInstructions: "Book a hotel through Chase Travel using your Sapphire Preferred; the first $50 of hotel charges will be automatically refunded. Credit resets every account anniversary.",
        appScheme: "chase",
        categories: ["Travel", "Lodging"]
      },
      {
        id: "csp_doordash_grocery",
        name: "DoorDash Grocery Credit",
        value: 10,
        period: "monthly",
        description: "$10 monthly DoorDash credit for non-restaurant purchases (grocery stores, convenience stores, DashMart, etc.) through 2027.",
        redemptionInstructions: "Use your Preferred card with DashPass activated. You'll see a $10 off promo automatically for eligible non-restaurant orders each month. Credit does not roll over.",
        appScheme: "doordash",
        categories: ["Grocery"]
      }
    ]
  },
  {
    name: "Capital One Venture X",
    image: "/assets/cards/venture_x.avif",
    annualFee: 395,
    benefits: [
      {
        id: "venturex_travel_credit",
        name: "Capital One Travel Credit",
        value: 300,
        period: "annual",
        description: "Receive a $300 statement credit annually for travel bookings made through the Capital One Travel portal. This credit is flexible and can be applied to flights, hotels, and rental cars.",
        redemptionInstructions: "Simply use your Venture X card to pay for a booking on the Capital One Travel portal. The credit is automatically applied as a statement credit to your account. The credit can be used in one go or across multiple bookings. Unused credit does not roll over past your card anniversary date. To maximize value, compare prices, as the portal offers price matching within 24 hours of booking.",
        appScheme: "capitalOne",
        categories: ["Travel"]
      }
    ]
  },
  {
    name: "Blue Cash Preferred (AmEx)",
    image: "/assets/cards/blue_cash_preferred.avif",
    annualFee: 95,
    benefits: [
      {
        id: "bcp_disney_bundle",
        name: "Disney Bundle Credit",
        value: 7,
        period: "monthly",
        description: "Get a $7 statement credit each month after you spend $9.99 or more on an eligible subscription to The Disney Bundle. This can reduce the cost of subscriptions that include Disney+, Hulu, and ESPN+.",
        redemptionInstructions: "You must first enroll in the benefit through your American Express online account. Then, use your Blue Cash Preferred card to pay for your monthly Disney Bundle subscription of $9.99 or more. The statement credit will be applied automatically. Unused credits do not roll over.",
        categories: ["Bills & Utilities", "Entertainment"]
      }
    ]
  },
  {
    name: "Delta SkyMiles Reserve (AmEx)",
    image: "/assets/cards/delta_reserve.avif",
    annualFee: 650,
    benefits: [
      {
        id: "delta_resy",
        name: "Resy Dining Credit",
        value: 20,
        period: "monthly",
        description: "Receive up to $20 in statement credits each month for eligible purchases at U.S. restaurants on Resy. This amounts to a total of up to $240 per calendar year.",
        redemptionInstructions: "Enrollment is required through your American Express online account. After enrolling, use your Delta Reserve card to pay at eligible U.S. restaurants that offer reservations through Resy.com or the Resy app. The credit is applied automatically. Unused monthly credits do not roll over.",
        appScheme: "resy",
        categories: ["Dining"]
      },
      {
        id: "delta_rideshare",
        name: "Rideshare Credit",
        value: 10,
        period: "monthly",
        description: "Get up to $10 in statement credits each month on U.S. rideshare purchases with select providers, totaling up to $120 per year.",
        redemptionInstructions: "Enrollment is required via your Amex account. Use your card to pay for eligible U.S. rideshare services like Uber, Lyft, Curb, Revel, and Alto. The credit is applied automatically. Unused monthly credits are forfeited.",
        categories: ["Transportation"]
      },
      {
        id: "delta_stays",
        name: "Delta Stays Credit",
        value: 200,
        period: "annual",
        description: "Receive up to a $200 statement credit each calendar year for prepaid hotels or vacation rentals booked through the Delta Stays platform.",
        redemptionInstructions: "To redeem, book a prepaid hotel or vacation rental through delta.com/stays and pay with your Delta Reserve card. The credit is applied automatically to your statement. The credit resets each calendar year.",
        appScheme: "delta",
        categories: ["Travel"]
      }
    ]
  },
  {
    name: "American Express Green",
    image: "/assets/cards/amex_green.avif",
    annualFee: 150,
    benefits: [
      {
        id: "green_clear",
        name: "CLEAR Plus Credit Green",
        value: 189,
        period: "annual",
        description: "Receive up to $189 in statement credits per calendar year, enough to cover the full cost of a CLEAR Plus membership for expedited airport security.",
        redemptionInstructions: "Simply use your American Express Green card to pay for your CLEAR Plus membership. The statement credit will be applied automatically to your account, typically within 6-8 weeks. To maximize this benefit, ensure CLEAR is available at airports you frequently use.",
        appScheme: "clear",
        categories: ["Travel", "Flights"]
      }
    ]
  },
  {
    name: "Bank of America Premium Rewards",
    image: "/assets/cards/boa_premium_rewards.png",
    annualFee: 95,
    benefits: [
      {
        id: "boa_pr_airline_incidental",
        name: "Airline Incidental Credit",
        value: 100,
        period: "annual",
        description: "Receive up to $100 in statement credits annually for qualifying airline incidental fees. This helps to significantly offset the annual fee.",
        redemptionInstructions: "The credit is automatically applied to your statement when you use your card for qualifying fees. Qualifying charges include seat upgrades, checked baggage fees, in-flight food and entertainment, and airline lounge access fees. It does not cover tickets, award fees, mileage purchases, or gift cards. It is also important to note that charges from some airlines, like Spirit and Allegiant, may not qualify. The credit resets every calendar year.",
        categories: ["Travel", "Flights"]
      }
    ]
  },
  {
    name: "Bank of America Premium Rewards Elite",
    image: "/assets/cards/boa_premium_rewards_elite.png",
    annualFee: 550,
    benefits: [
      {
        id: "boa_pre_airline_incidental",
        name: "Airline Incidental Credits",
        value: 300,
        period: "annual",
        description: "Up to $300 annually in statement credits for qualifying airline incidental fees. This credit helps substantially offset the annual fee.",
        redemptionInstructions: "The credit is automatically applied to your statement for qualifying charges. Qualifying fees include seat upgrades, checked baggage, in-flight food and entertainment, and airline lounge day passes. It does not cover the cost of airfare, mileage purchases, or gift cards. The credit resets each calendar year.",
        categories: ["Travel", "Flights"]
      },
      {
        id: "boa_pre_lifestyle",
        name: "Lifestyle Convenience Credits",
        value: 150,
        period: "annual",
        description: "Up to $150 annually in statement credits for lifestyle purchases. This flexible credit applies to a wide range of everyday services.",
        redemptionInstructions: "Credits post automatically when you use your card for eligible purchases. Confirmed eligible services include food delivery (DoorDash, Grubhub), ride-hailing (Uber, Lyft), streaming (Netflix, Hulu, Disney+), and fitness subscriptions. Some services like YouTube TV and Audible have been reported by users as not qualifying. The credit resets each calendar year.",
        categories: ["Shopping", "Dining", "Transportation", "Fitness"]
      }
    ]
  },
  {
    name: "U.S. Bank Altitude Reserve Visa Infinite",
    image: "/assets/cards/usb_altitude_reserve.png",
    annualFee: 400,
    benefits: [
      {
        id: "usb_ar_travel_dining",
        name: "Travel & Dining Credit",
        value: 325,
        period: "annual",
        description: "Receive up to $325 in automatic statement credits for purchases made directly from airlines, hotels, car rental companies, taxis, limousines, passenger trains, cruise lines, restaurants, takeout, and food delivery services.",
        redemptionInstructions: "This is one of the easiest credits to use. Simply use your Altitude Reserve card for any eligible travel or dining purchase and the credits will be applied automatically until you reach the $325 maximum for your cardmember year. This benefit effectively reduces the annual fee to $75 if fully utilized.",
        categories: ["Travel", "Dining"]
      }
    ]
  },
  {
    name: "Citi Prestige Card",
    image: "/assets/cards/citi_prestige.jpeg",
    annualFee: 495,
    benefits: [
      {
        id: "citi_prestige_travel",
        name: "Annual Travel Credit",
        value: 250,
        period: "annual",
        description: "Up to $250 in statement credits for travel purchases each year. This is a highly flexible credit that applies to a wide range of purchases coding as travel. IMPORTANT: The Citi Prestige card is no longer available to new applicants; this benefit is for existing cardholders.",
        redemptionInstructions: "No activation is needed. Simply use your card for travel purchases, including airfare, hotels, car rentals, cruise lines, travel agencies, taxis, ride-hailing services, tolls, and parking. The credit is automatically applied to your statement until you have received the full $250. The benefit resets on January 1st each year.",
        categories: ["Travel"]
      }
    ]
  },
  {
    name: "Hilton Honors Aspire",
    image: "/assets/cards/hilton_aspire.avif",
    annualFee: 450,
    benefits: []
  },
  {
    name: "Marriott Bonvoy Brilliant",
    image: "/assets/cards/marriott_bonvoy_brilliant.avif",
    annualFee: 650,
    benefits: []
  }
];

function PerkIcon({ category }: { category: CategoryIconType }) {
  const Icon = categoryIcons[category] || CardIcon;
  return <Icon className="w-5 h-5" />;
}

const benefitVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

interface InfiniteCardRiverProps {
  cards: Card[];
  speed?: number;
  direction?: 'left' | 'right';
}

function InfiniteCardRiver({ cards, speed = 20, direction = 'left' }: InfiniteCardRiverProps) {
  const [duplicatedCards, setDuplicatedCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Duplicate cards to ensure smooth infinite scroll
    const duplicates = [...cards, ...cards, ...cards];
    setDuplicatedCards(duplicates);

    // Get container width for animation
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 3);
    }
  }, [cards]);

  const animate = {
    x: direction === 'left' ? [0, -containerWidth] : [-containerWidth, 0],
    transition: {
      x: {
        duration: isMobile ? containerWidth / (speed * 0.7) : containerWidth / speed, // Slower on mobile
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
                className="w-[200px] md:w-[300px] h-[126px] md:h-[189px] object-contain"
              />
            </Glass>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function CardBenefits() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const controls = useAnimationControls();

  const halfIndex = Math.ceil(cards.length / 2);
  const firstHalfCards = cards.slice(0, halfIndex);
  const secondHalfCards = cards.slice(halfIndex);

  const formatValue = (value: number, period: string) => {
    switch (period) {
      case "monthly":
        return `$${value}/mo`;
      case "annual":
        return `$${value}/yr`;
      case "semi_annual":
        return `$${value} (2x/yr)`;
      default:
        return `$${value}`;
    }
  };

  const calculateAnnualValue = (value: number, period: string) => {
    switch (period) {
      case "monthly":
        return value * 12;
      case "semi_annual":
        return value * 2;
      case "annual":
      default:
        return value;
    }
  };

  const totalAnnualValue = cards[selectedCardIndex].benefits.reduce((acc, perk) => {
    return acc + calculateAnnualValue(perk.value, perk.period);
  }, 0);

  const handleNext = () => {
    setDirection("right");
    setSelectedCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setSelectedCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    controls.start("visible");
  }, [selectedCardIndex, controls]);

  return (
    <section id="cards" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Text variant="h2" as="h2" className="mb-4">
            Maximize Your Card Benefits
          </Text>
          <Text variant="subtitle" className="max-w-3xl mx-auto">
            Track and optimize your credit card benefits with our smart reminders and insights. We turn complex perks into simple, actionable steps.
          </Text>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          <InfiniteCardRiver cards={firstHalfCards} speed={25} direction="left" />
          <InfiniteCardRiver cards={secondHalfCards} speed={30} direction="right" />
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Card Carousel */}
            <div className="relative h-[250px] sm:h-[300px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedCardIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  custom={direction}
                  variants={{
                    enter: (direction) => ({
                      x: direction === 'right' ? 300 : -300,
                      opacity: 0,
                      scale: 0.8
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    },
                    exit: (direction) => ({
                      x: direction === 'right' ? -300 : 300,
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Glass variant="light" className="rounded-2xl p-4">
                    <BlurImage
                      src={cards[selectedCardIndex].image}
                      alt={cards[selectedCardIndex].name}
                      width={400}
                      height={252}
                      className="w-full h-full object-contain"
                    />
                  </Glass>
                </motion.div>
              </AnimatePresence>
              <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right side: Benefits List */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCardIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Text variant="h3" as="h3" className="mb-2">{cards[selectedCardIndex].name}</Text>
                  <Text variant="body" className="text-gray-600 mb-4">
                    Annual Fee: ${cards[selectedCardIndex].annualFee} | Est. Annual Value: <span className="font-bold text-green-600">${totalAnnualValue}</span>
                  </Text>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4">
                    {cards[selectedCardIndex].benefits.map((perk, i) => (
                      <motion.div
                        key={perk.id}
                        custom={i}
                        variants={benefitVariants}
                        initial="hidden"
                        animate={controls}
                        className="p-4 bg-white rounded-lg shadow-sm border"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <Text variant="body" className="font-semibold">{perk.name}</Text>
                            <Text variant="caption" className="text-gray-500">{perk.description}</Text>
                          </div>
                          <Text variant="body" className="font-bold text-gray-800 whitespace-nowrap ml-4">
                            {formatValue(perk.value, perk.period)}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {perk.categories.map(cat => <PerkIcon key={cat} category={cat} />)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 