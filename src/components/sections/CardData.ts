import { CreditCard, Gift, Plane, Shield, Utensils, Hotel, Wifi, CreditCard as CardIcon, Zap, Coffee, ShoppingBag, Dumbbell } from "lucide-react";

export const categoryIcons = {
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

export type CategoryIconType = keyof typeof categoryIcons;

export interface Perk {
  id: string;
  name: string;
  description: string;
  value: number;
  period: string;
  categories: CategoryIconType[];
  redemptionInstructions?: string;
  appScheme?: string;
}

export interface Card {
  name: string;
  image: string;
  annualFee: number;
  benefits: Perk[];
  popularity?: number; // Lower number = more popular
}

export const cards: Card[] = [
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
    ],
    popularity: 1
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
    ],
    popularity: 2
  },
  {
    name: "American Express Blue Cash Preferred",
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
    ],
    popularity: 3
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
        appScheme: "lyft",
        redemptionInstructions: "Add your Sapphire Reserve as the payment method in the Lyft app. Credit appears automatically and applies to your next ride(s).",
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
      },
      {
        id: "csr_trusted_traveler_credit",
        name: "Global Entry / TSA PreCheck / NEXUS Credit",
        value: 120,
        period: "quadrennial",
        description: "Receive a statement credit of up to $120 once every four years for the application fee for Global Entry, TSA PreCheck, or NEXUS.",
        redemptionInstructions: "Charge the application fee to your card to receive the statement credit automatically.",
        categories: ["Travel", "Flights"]
      }
    ],
    popularity: 4
  },
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
    ],
    popularity: 5
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
      },
      {
        id: "venturex_anniversary",
        name: "Anniversary Miles Bonus",
        value: 100,
        period: "annual",
        description: "Receive 10,000 bonus miles every year starting on your first account anniversary. These miles are worth a minimum of $100 when redeemed for travel.",
        redemptionInstructions: "This is an automatic benefit. The 10,000 bonus miles will be deposited into your Capital One miles account within the billing cycle of your card anniversary.",
        categories: ["Travel", "Rewards"]
      },
      {
        id: "venturex_lounge_access",
        name: "Airport Lounge Access",
        value: 0,
        period: "ongoing",
        description: "Get unlimited complimentary access to Capital One Lounges for you and two guests. Also includes a complimentary Priority Pass Select membership, giving you access to over 1,300+ lounges worldwide.",
        redemptionInstructions: "You must enroll in Priority Pass through your Capital One online account to receive your membership. For Capital One Lounges, simply present your Venture X card and a same-day boarding pass.",
        categories: ["Travel"]
      },
      {
        id: "venturex_global_entry",
        name: "Global Entry or TSA PreCheck Credit",
        value: 100,
        period: "quadrennial",
        description: "Receive up to a $100 statement credit for the application fee for either Global Entry or TSA PreCheck.",
        redemptionInstructions: "Pay the application fee for either Global Entry or TSA PreCheck with your Venture X card. The statement credit will automatically be applied to your account. This benefit is available once every four years. You can use this credit to cover the fee for another person.",
        categories: ["Travel"]
      },
      {
        id: "venturex_hertz_status",
        name: "Hertz President's Circle Status",
        value: 0,
        period: "ongoing",
        description: "Receive complimentary top-tier Hertz President's Circle status, which provides benefits like guaranteed car upgrades, a wider selection of vehicles, and a dedicated customer service line.",
        redemptionInstructions: "You must enroll for this benefit through your Capital One online account. You will be redirected to the Hertz website to link your accounts and activate your status.",
        categories: ["Travel"]
      },
      {
        id: "venturex_cell_phone_protection",
        name: "Cell Phone Protection",
        value: 800,
        period: "per_incident",
        description: "Get reimbursed for the repair or replacement of your stolen or damaged cell phone, up to $800 per claim.",
        redemptionInstructions: "You must pay your monthly cell phone bill with your Venture X card to be eligible for this coverage. There is a $50 deductible per claim, and you can make up to two claims per 12-month period. To file a claim, contact the benefits administrator within 60 days of the incident.",
        categories: ["Insurance", "Shopping"]
      }
    ],
    popularity: 6
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
      },
      {
        id: "boa_pr_global_entry",
        name: "Global Entry or TSA PreCheck Credit",
        value: 100,
        period: "quadrennial",
        description: "Receive a statement credit of up to $100 every four years to cover the application fee for either Global Entry or TSA PreCheck.",
        redemptionInstructions: "Simply pay the application fee for either Global Entry or TSA PreCheck with your Premium Rewards card. The statement credit will be automatically applied to your account. Since Global Entry includes TSA PreCheck benefits, it is generally the better value. You can also use this credit to pay for a friend or family member's application fee.",
        categories: ["Travel"]
      },
      {
        id: "boa_pr_preferred_rewards_bonus",
        name: "Preferred Rewards Bonus",
        value: 0,
        period: "ongoing",
        description: "Boost your rewards earnings by 25% to 75% on every purchase if you are a Bank of America Preferred Rewards member. This is the most significant way to maximize the value of this card.",
        redemptionInstructions: "To receive this benefit, you must be enrolled in the Bank of America Preferred Rewards program, which requires having a qualifying Bank of America checking account and maintaining a combined three-month average daily balance. Gold Tier ($20k+ balance) gets a 25% bonus, Platinum ($50k+) gets a 50% bonus, and Platinum Honors ($100k+) gets a 75% bonus. The bonus is applied automatically to the points you earn.",
        categories: ["Rewards"]
      }
    ],
    popularity: 7
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
      },
      {
        id: "boa_pre_priority_pass",
        name: "Priority Pass Select Membership",
        value: 0,
        period: "ongoing",
        description: "Receive up to four complimentary Priority Pass Select memberships, providing access to over 1,300 airport lounges and experiences worldwide for you and authorized members.",
        redemptionInstructions: "You must enroll yourself and up to three other individuals in Priority Pass Select through your Bank of America online account. This is a significant perk for families or small groups, as most premium cards offer only one membership. The membership includes access to participating airport restaurants for a dining credit in some locations.",
        categories: ["Travel"]
      },
      {
        id: "boa_pre_global_entry",
        name: "Global Entry or TSA PreCheck Credit",
        value: 100,
        period: "quadrennial",
        description: "Receive a statement credit of up to $100 every four years to cover the application fee for either Global Entry or TSA PreCheck.",
        redemptionInstructions: "Pay the application fee for either Global Entry or TSA PreCheck with your Premium Rewards Elite card. The statement credit will be automatically applied. Global Entry includes TSA PreCheck, making it the more valuable option. You can use this credit to pay for the application fee of another person.",
        categories: ["Travel"]
      },
      {
        id: "boa_pre_preferred_rewards_bonus",
        name: "Preferred Rewards Bonus",
        value: 0,
        period: "ongoing",
        description: "Dramatically increase your rewards earnings with a 25% to 75% bonus on all points earned if you are a Bank of America Preferred Rewards member. This is the single most effective way to maximize the value of this card.",
        redemptionInstructions: "Enrollment in the Preferred Rewards program is required. You must have a qualifying Bank of America checking account and maintain a combined three-month average daily balance of $20k+ for Gold (25% bonus), $50k+ for Platinum (50% bonus), or $100k+ for Platinum Honors (75% bonus). With Platinum Honors, your earning rates become 3.5x on travel/dining and 2.625x on everything else.",
        categories: ["Rewards"]
      },
      {
        id: "boa_pre_airfare_discount",
        name: "20% Airfare Discount",
        value: 20,
        period: "ongoing",
        description: "Receive a 20% discount on the price of airfare when you pay with points through the Bank of America Travel Center. This increases the value of your points to 1.25 cents each for these redemptions.",
        redemptionInstructions: "To receive the discount, you must book your flight through the Bank of America Travel Center and elect to pay with your points at checkout. The 20% savings will be automatically reflected in the number of points required for the booking.",
        categories: ["Travel", "Flights", "Rewards"]
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
      },
      {
        id: 'usb_ar_mobile_wallet_rewards',
        name: 'Mobile Wallet Rewards',
        value: 0,
        period: 'ongoing',
        description: 'Earn 3X points on eligible purchases made using a mobile wallet (like Apple Pay®, Google Pay™, or Samsung Pay). This is the signature feature of the card and a primary way to accumulate points on everyday spending.',
        redemptionInstructions: 'To maximize this benefit, add your Altitude Reserve card to your mobile wallet and use it for all tap-to-pay transactions. When points are redeemed for travel through the U.S. Bank Rewards Center, they are worth 1.5 cents each, making this an effective 4.5% return on mobile wallet spending. You can also redeem points via "Real-Time Rewards" for travel purchases made directly with merchants.',
        categories: ['Rewards', 'Shopping']
      },
      {
        id: 'usb_ar_priority_pass',
        name: 'Priority Pass Select Membership',
        value: 0,
        period: 'annual',
        description: 'Receive a complimentary Priority Pass Select membership, which grants access to over 1,300 airport lounges worldwide. This membership includes a limited number of free visits.',
        redemptionInstructions: 'You must enroll for this benefit on the U.S. Bank website. Your membership provides eight complimentary visits per year. These can be used as four visits for yourself and four for guests, or any combination up to eight total visits. After the free visits are used, a fee will be charged for each subsequent entry.',
        categories: ['Travel']
      },
      {
        id: 'usb_ar_global_entry',
        name: 'Global Entry or TSA PreCheck Credit',
        value: 100,
        period: 'quadrennial',
        description: 'Receive a statement credit of up to $100 for the application fee for either Global Entry or TSA PreCheck.',
        redemptionInstructions: 'Pay the application fee for either Global Entry or TSA PreCheck with your Altitude Reserve card. The statement credit will be automatically applied to your account. This benefit is available once every four years, and Global Entry is the recommended choice as it includes TSA PreCheck benefits.',
        categories: ['Travel']
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
    ],
    popularity: 10
  },
  {
    name: "Hilton Honors Aspire",
    image: "/assets/cards/hilton_aspire.avif",
    annualFee: 550,
    benefits: [
      {
        id: "aspire_flight_credit",
        name: "Airline Flight Credit",
        value: 50,
        period: "quarterly",
        description: "Up to $50 back in statement credits each quarter on eligible flight purchases (total $200 yr).",
        categories: ["Travel", "Flights"]
      },
      {
        id: "aspire_hilton_resort_credit",
        name: "Hilton Resort Credit",
        value: 200,
        period: "semi_annual",
        description: "Get up to $200 in statement credits semi-annually for eligible purchases made directly at participating Hilton Resorts. This provides a total of up to $400 in resort credits per calendar year. The credit periods are January-June and July-December.",
        categories: ["Travel"],
        appScheme: "hilton",
        redemptionInstructions: "To use this credit, charge eligible purchases, including room rates and incidental charges like dining and spa treatments, to your room at a participating Hilton Resort and pay with your Hilton Honors Aspire card at checkout. A list of participating resorts is available on the Hilton website. Advance purchase or non-refundable rates may not be eligible. Unused semi-annual credits do not roll over."
      },
      {
        id: "aspire_free_night_reward",
        name: "Annual Free Night Reward",
        value: 1000,
        period: "annual",
        description: "Receive one Free Night Reward certificate each year after your card renewal month, valid for a standard room on a weekend night at almost any Hilton property worldwide. You can earn a second Free Night Reward after you spend $30,000 in purchases on your card in a calendar year, and a third after spending a total of $60,000 in the same calendar year.",
        categories: ["Travel"],
        appScheme: "hilton",
        redemptionInstructions: "The Free Night Reward will be delivered to you via email. To redeem, you must call Hilton Honors at 1-800-446-6677 and mention the code provided. The certificate is valid for one year from the date of issuance. It's best to use this for high-value properties to maximize its value."
      },
      {
        id: "aspire_clear_plus_credit",
        name: "CLEAR Plus Credit Aspire",
        value: 189,
        period: "annual",
        description: "Receive up to $189 in statement credits per calendar year for a CLEAR Plus membership, which provides expedited security screening at select airports and stadiums.",
        categories: ["Travel"],
        appScheme: "clear",
        redemptionInstructions: "Pay for your CLEAR Plus membership using your Hilton Honors Aspire card, and the statement credit will be automatically applied. This benefit covers the full cost of an individual CLEAR Plus membership."
      },
      {
        id: "aspire_diamond_status",
        name: "Hilton Honors Diamond Status",
        value: 0,
        period: "ongoing",
        description: "Receive complimentary Hilton Honors Diamond status, the top tier of Hilton's loyalty program. Benefits include a 100% point bonus on stays, executive lounge access, room upgrades (up to a one-bedroom suite), and a daily food and beverage credit at select properties.",
        categories: ["Travel"],
        redemptionInstructions: "Your Hilton Honors account will be automatically upgraded to Diamond status upon card approval. Ensure your card is linked to your Hilton Honors account to receive these benefits."
      },
      {
        id: "aspire_waldorf_conrad_credit",
        name: "Waldorf Astoria & Conrad Property Credit",
        value: 100,
        period: "per_stay",
        description: "Receive a $100 property credit when you book a two-night minimum stay at participating Waldorf Astoria and Conrad properties.",
        categories: ["Travel"],
        redemptionInstructions: "To receive this credit, you must book your stay through HiltonHonors.com/aspirecard or by calling the number on the back of your card and booking the specific 'Aspire Card' rate. The credit can be used for on-property expenses such as dining and spa services."
      }
    ],
    popularity: 11
  },
  {
    name: "Marriott Bonvoy Brilliant",
    image: "/assets/cards/marriott_bonvoy_brilliant.avif",
    annualFee: 650,
    benefits: [
      {
        id: 'brilliant_dining',
        name: 'Dining Credit',
        value: 25,
        period: 'monthly',
        description: '$25 dining statement credit each month (up to $300 per year) at restaurants worldwide.',
        categories: ['Dining'],
      },
      {
        id: "brilliant_free_night_award",
        name: "Annual Free Night Award",
        value: 765,
        period: "annual",
        description: "Receive one Free Night Award each year after your card renewal month. The award can be used for a one-night stay at a participating Marriott Bonvoy hotel with a redemption level at or under 85,000 points. You can top off the award with up to 15,000 of your own points.",
        categories: [
          "Travel", "Lodging"
        ],
        redemptionInstructions: "The Free Night Award will be automatically deposited into your Marriott Bonvoy account 8-12 weeks after your card renewal month. To use it, log in to your Marriott Bonvoy account and select the award at the time of booking. The award expires one year from the date of issuance. Be aware that some properties may charge resort fees, which are not covered by the award."
      },
    ],
    popularity: 12
  },
  {
    name: "Delta SkyMiles Reserve",
    image: "/assets/cards/delta_reserve.avif",
    annualFee: 650,
    benefits: [
      {
        id: "delta_resy",
        name: "Resy Dining Credit",
        value: 20,
        period: "monthly",
        description: "Receive up to $20 in statement credits each month for eligible purchases at U.S. restaurants on Resy. This amounts to a total of up to $240 per calendar year.",
        categories: ["Dining"],
        appScheme: "resy",
        redemptionInstructions: "Enrollment is required through your American Express online account. After enrolling, use your Delta Reserve card to pay at eligible U.S. restaurants that offer reservations through Resy.com or the Resy app. The credit is applied automatically. Unused monthly credits do not roll over."
      },
      {
        id: "delta_rideshare",
        name: "Rideshare Credit",
        value: 10,
        period: "monthly",
        description: "Get up to $10 in statement credits each month on U.S. rideshare purchases with select providers, totaling up to $120 per year.",
        categories: ["Transportation"],
        redemptionInstructions: "Enrollment is required via your Amex account. Use your card to pay for eligible U.S. rideshare services like Uber, Lyft, Curb, Revel, and Alto. The credit is applied automatically. Unused monthly credits are forfeited."
      },
      {
        id: "delta_stays",
        name: "Delta Stays Credit",
        value: 200,
        period: "annual",
        description: "Receive up to a $200 statement credit each calendar year for prepaid hotels or vacation rentals booked through the Delta Stays platform.",
        categories: ["Travel"],
        appScheme: "delta",
        redemptionInstructions: "To redeem, book a prepaid hotel or vacation rental through delta.com/stays and pay with your Delta Reserve card. The credit is applied automatically to your statement. The credit resets each calendar year."
      },
      {
        id: "delta_companion_certificate",
        name: "Annual Companion Certificate",
        value: 0,
        period: "annual",
        description: "Receive a Companion Certificate each year after your card renewal. This certificate is valid for one round-trip Main Cabin, Delta Comfort+, or First Class ticket for a companion traveling with you on the same itinerary.",
        redemptionInstructions: "The certificate is deposited into your Delta SkyMiles account after your card anniversary. To use it, you must book through delta.com. The certificate is valid for travel within the 48 contiguous United States, and to select destinations in Alaska, Hawaii, Mexico, the Caribbean, and Central America. You are responsible for government-imposed taxes and fees on the companion ticket. Availability is subject to certain fare classes, so booking in advance provides the best chance of successful redemption.",
        categories: ["Travel"]
      },
      {
        id: "delta_sky_club_access",
        name: "Delta Sky Club Access",
        value: 0,
        period: "ongoing",
        description: "Receive 15 complimentary visits to the Delta Sky Club each year. You can unlock unlimited visits for the remainder of the year after spending $75,000 on the card in a calendar year. Also includes four one-time guest passes annually.",
        categories: ["Travel"],
        redemptionInstructions: "Access the Sky Club by presenting your valid Delta Reserve card and a same-day boarding pass for a Delta or partner airline flight. You also get complimentary access to The Centurion Lounge when you book your Delta flight with your Reserve Card."
      },
      {
        id: "delta_global_entry",
        name: "Global Entry or TSA PreCheck Credit",
        value: 120,
        period: "quadrennial",
        description: "Receive a statement credit for the application fee for either Global Entry (up to $120 every 4 years) or TSA PreCheck (up to $85 every 4.5 years).",
        categories: ["Travel"],
        redemptionInstructions: "Pay the application fee for either program with your Delta Reserve card to receive the statement credit automatically. You do not need to be the one applying to use the credit."
      }
    ],
    popularity: 13
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
      },
      {
        id: 'green_travel_rewards',
        name: '3X Points on Travel, Transit & Dining',
        value: 0,
        period: 'ongoing',
        description: 'Earn 3X Membership Rewards points on a broad range of categories. This includes travel (flights, hotels, car rentals, cruises, tours, third-party travel websites), transit (rideshares, subways, parking, tolls), and at restaurants worldwide.',
        redemptionInstructions: 'Points are earned automatically when you use your card for purchases in these categories. This is a primary benefit of the card, and maximizing its value depends on using it for all eligible travel and dining expenses. Unlike some cards, the travel category is very broad and not limited to a specific travel portal.',
        categories: ['Travel', 'Dining', 'Transportation', 'Rewards']
      }
    ],
    popularity: 14
  }
]; 