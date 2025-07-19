import { motion } from "framer-motion";
import { Text } from "../ui/Text";
import { fadeIn } from "../../lib/animations";

const portfolioTiers = [
  {
    title: "Single Premium Card",
    description: "Chase Sapphire Preferred, Amex Gold, etc.",
    annualFee: "$95-$250",
    maxBenefits: "$170-$400",
    examples: ["$50 hotel credit", "$120 dining credit", "Priority Pass access"]
  },
  {
    title: "Premium Portfolio",
    description: "Amex Platinum, Chase Sapphire Reserve, etc.",
    annualFee: "$400-$700",
    maxBenefits: "$600-$1,200",
    examples: ["$200 airline credit", "$300 travel credit", "$240 Uber Cash", "$100 Saks credit"]
  },
  {
    title: "Multi-Card Strategy",
    description: "3+ premium cards with strategic benefits",
    annualFee: "$1,000-$2,000+",
    maxBenefits: "$1,500-$3,000+",
    examples: ["Multiple airline credits", "Hotel status benefits", "Layered dining credits", "Travel insurance"]
  }
];

export function ValueByPortfolio() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Text variant="h2" as="h2" className="mb-6">
            Your Savings Potential Depends on Your Card Portfolio
          </Text>
          <Text variant="subtitle" className="text-gray-600">
            Credify helps you maximize the benefits you're already paying for, regardless of your card strategy.
          </Text>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-6">
                <Text variant="h4" className="mb-2 text-gray-900">
                  {tier.title}
                </Text>
                <Text variant="caption" className="text-gray-500">
                  {tier.description}
                </Text>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Annual Fees</span>
                  <span className="text-sm font-bold text-gray-900">{tier.annualFee}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Max Benefits</span>
                  <span className="text-sm font-bold text-green-600">{tier.maxBenefits}</span>
                </div>
              </div>

              <div>
                <Text variant="caption" className="text-gray-500 mb-3 block">
                  Common Benefits:
                </Text>
                <ul className="space-y-2">
                  {tier.examples.map((example, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
            <Text variant="body" className="text-blue-800 font-medium">
              💡 The key insight: Most cardholders only redeem 20-40% of their available benefits. 
              Credify helps you reach 90%+ utilization regardless of your portfolio size.
            </Text>
          </div>
        </motion.div>
      </div>
    </section>
  );
}