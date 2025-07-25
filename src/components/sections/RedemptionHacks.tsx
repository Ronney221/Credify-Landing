import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Lightbulb, Target, TrendingUp, Zap } from "lucide-react";

const hacksData = [
  // Amex Platinum
  {
    title: "Saks Fifth Avenue Gift Card Banking (Amex Platinum)",
    description: "Receive up to $50 in statement credits twice per year for purchases at Saks Fifth Avenue.",
    hack: "Although terms exclude them, purchasing a physical $50 gift card in-store has consistently triggered the credit. This allows you to bank the semi-annual credits for a larger future purchase. Online gift card purchases will not work.",
    value: "$100/year",
    difficulty: "Easy",
    icon: <TrendingUp className="w-5 h-5" />, 
    color: "bg-green-500"
  },
  {
    title: "Uber Cash Stacking (Amex Platinum/Gold)",
    description: "Receive $15 in Uber Cash monthly (Platinum) and $10 (Gold) for U.S. rides or Uber Eats orders.",
    hack: "Credits from Platinum and Gold cards stack in one Uber Wallet. Maximize value by using the combined balance for Uber Eats pickup orders to avoid delivery fees. An Amex card must be selected as the final payment method.",
    value: "$200/year (Platinum)",
    difficulty: "Easy",
    icon: <Zap className="w-5 h-5" />, 
    color: "bg-pink-500"
  },
  {
    title: "Airline Fee/Incidental Credit (Amex Platinum)",
    description: "Up to $200 in statement credits per calendar year for incidental fees with one selected qualifying airline.",
    hack: "For United, buy TravelBank cash in $50-$100 increments. For Southwest, buy and cancel sub-$100 'Wanna Get Away' fares for flight credit. For Delta, pay for a ticket mostly with a gift card, charging the remainder to the Platinum.",
    value: "$200/year",
    difficulty: "Medium",
    icon: <Target className="w-5 h-5" />, 
    color: "bg-blue-500"
  },
  {
    title: "Prepaid Hotel Credit (Amex Platinum)",
    description: "Receive up to $200 back in statement credits each calendar year on prepaid bookings with Fine Hotels + Resorts® or The Hotel Collection.",
    hack: "The credit is tied to the charge date, not the stay date. To use an expiring credit, make a prepaid Fine Hotels + Resorts or The Hotel Collection booking for a future date (even in the next calendar year) before December 31st.",
    value: "$200/year",
    difficulty: "Medium",
    icon: <Zap className="w-5 h-5" />, 
    color: "bg-purple-500"
  },
  {
    title: "Digital Entertainment Credit (Amex Platinum)",
    description: "Up to $20 per month in statement credits for eligible digital subscriptions.",
    hack: "Use one month's $20 credit to pay for a discounted annual subscription, like Peacock during a Black Friday sale. This can cover the entire year and frees up the credit for the remaining 11 months for other eligible services.",
    value: "$240/year",
    difficulty: "Easy",
    icon: <Lightbulb className="w-5 h-5" />, 
    color: "bg-orange-500"
  },
  // Amex Gold
  {
    title: "Dining Credit (Amex Gold)",
    description: "Receive up to $10 in statement credits each month for purchases at Grubhub, Five Guys, The Cheesecake Factory, Goldbelly, Wine.com, and Milk Bar.",
    hack: "Use for pickup orders to avoid delivery fees. To maximize value, use Grubhub's 'Lowest Price Guarantee' by submitting proof of lower in-store prices; you'll get the difference refunded plus a $5 bonus credit for a future order.",
    value: "$120/year",
    difficulty: "Easy",
    icon: <TrendingUp className="w-5 h-5" />, 
    color: "bg-yellow-500"
  },
  {
    title: "Resy Dining Credit (Amex Gold)",
    description: "Book and dine at U.S. Resy partner restaurants to receive up to $50 in statement credits twice per year.",
    hack: "You don't need a reservation. The credit triggers on any charge from a listed Resy restaurant. Use the Resy app as a directory, then place a takeout order or pay in person. Or, purchase a digital gift card from a Resy partner restaurant that uses the Toast payment platform (toasttab.com).",
    value: "$100/year",
    difficulty: "Medium",
    icon: <Zap className="w-5 h-5" />, 
    color: "bg-red-500"
  },
  // Chase Sapphire Preferred/Reserve
  {
    title: "Hotel Credit (Chase Sapphire Preferred)",
    description: "Book a hotel through Chase Travel using your Sapphire Preferred; the first $50 of hotel charges will be automatically refunded.",
    hack: "To convert this into a pure $50 statement credit, book a 'Fully Refundable' hotel stay costing over $50 through the portal. Wait for the $50 credit to post to your account (typically 2-7 days), then cancel the refundable reservation. The hotel charge will be refunded, but the $50 credit will remain.",
    value: "$50/year",
    difficulty: "Easy",
    icon: <Target className="w-5 h-5" />, 
    color: "bg-indigo-500"
  },
  {
    title: "DoorDash Restaurant Credit (Chase Sapphire Reserve)",
    description: "Receive a $5 monthly promo credit for an eligible DoorDash restaurant order. Requires complimentary DashPass enrollment.",
    hack: "To maximize value, place a pickup order. This avoids all delivery fees, service fees, and driver tips, ensuring your $5 credit is applied directly to the cost of your food and not service charges.",
    value: "$60/year",
    difficulty: "Easy",
    icon: <Lightbulb className="w-5 h-5" />, 
    color: "bg-cyan-500"
  },
  {
    title: "The Edit by Chase Travel Credit (Chase Sapphire Reserve)",
    description: "Receive a $250 statement credit for prepaid hotel bookings of at least two nights made through 'The Edit by Chase Travel' portal. Available twice per year.",
    hack: "The credit is triggered by the charge date, not the stay date. You can book a trip far in advance to use a credit before it expires. For example, in June, you can book a stay for October to utilize the Jan-Jun credit.",
    value: "$500/year",
    difficulty: "Medium",
    icon: <Zap className="w-5 h-5" />, 
    color: "bg-lime-500"
  }
];

function getRandomHacks<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export function RedemptionHacks() {
  const hacksToShow = getRandomHacks(hacksData, 4);
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              🚀 NEW: Power User Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Redemption Tips & Hacks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the full potential of your perks with insider strategies that power users employ to maximize their redemptions. Every perk comes with proven hacks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {hacksToShow.map((hack, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${hack.color} rounded-full p-2 text-white`}>
                        {hack.icon}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {hack.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-bold text-green-600">
                          {hack.value}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{hack.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {hack.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 font-medium mb-1">Example:</p>
                      <p className="text-sm text-gray-600">{hack.hack}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                200+ Researched Hacks Available
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team has researched and verified clever strategies for every perk. Turn restricted credits into flexible value, avoid common pitfalls, and maximize your annual benefits.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>• Gift Card Conversions</span>
                <span>• Portal Arbitrage</span>
                <span>• Fee Avoidance</span>
                <span>• Credit Stacking</span>
                <span>• Timing Optimization</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}